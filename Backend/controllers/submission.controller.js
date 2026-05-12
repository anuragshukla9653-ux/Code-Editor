// Submission controller
import Submission from '../models/submission.model.js';
import Problem from '../models/problem.model.js';
import User from '../models/user.model.js';
import vm from 'node:vm';

// Helper function to execute JavaScript code safely
const executeJS = (code, input, expectedOutput) => {
  try {
    // Create a new context for execution
    const context = {
      console: {
        log: (...args) => {
          context.stdout += args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ') + '\n';
        }
      },
      stdout: ''
    };
    
    vm.createContext(context);
    
    // Extract function name (robust regex)
    // 1. Traditional function: function funcName(...)
    // 2. Const/Let function: const funcName = (...) => or function(...)
    const funcMatch = code.match(/function\s+([a-zA-Z0-9_]+)/) || 
                      code.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=/);
    
    let funcName = funcMatch ? funcMatch[1] : null;
    
    // If we can't find a function definition, we can't execute the code
    if (!funcName) {
      return { passed: false, error: 'No function definition found. Please ensure your solution is inside a function.', stdout: context.stdout };
    }
    
    const fullCode = `${code}\n${funcName}(${input})`;
    
    const script = new vm.Script(fullCode);
    const result = script.runInContext(context, { timeout: 2000 });
    
    const actualOutput = JSON.stringify(result) || 'undefined';
    // Flexible comparison: remove whitespace
    const expectedOutputClean = (expectedOutput || '').replace(/\s+/g, '');
    const actualOutputClean = (actualOutput || '').replace(/\s+/g, '');
    
    return {
      passed: actualOutputClean === expectedOutputClean,
      actual: actualOutput,
      stdout: context.stdout
    };
  } catch (error) {
    return { passed: false, error: error.message, stdout: '' };
  }
};

export const runCode = async (req, res) => {
  try {
    const { problem: problemId, language, code } = req.body;
    
    // Find the problem (handle both ID and slug)
    const problem = await (problemId.match(/^[0-9a-fA-F]{24}$/) 
      ? Problem.findById(problemId) 
      : Problem.findOne({ slug: problemId }));
      
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    if (language !== 'javascript') {
      return res.json({ 
        status: 'Accepted', 
        message: `${language} execution is mocked. Only JavaScript is fully supported.`,
        testCasesPassed: problem.visibleTestCases.length,
        totalTestCases: problem.visibleTestCases.length
      });
    }

    const testResults = [];
    let passedCount = 0;
    let allStdout = '';

    // Run against visible test cases
    for (const testCase of problem.visibleTestCases) {
      const result = executeJS(code, testCase.input, testCase.output);
      testResults.push({
        input: testCase.input,
        expected: testCase.output,
        actual: result.actual || (result.error ? `Error: ${result.error}` : 'undefined'),
        passed: result.passed
      });
      if (result.passed) passedCount++;
      if (result.stdout) allStdout += result.stdout;
    }

    const status = passedCount === problem.visibleTestCases.length ? 'Accepted' : 'Wrong Answer';

    res.json({
      message: 'Code executed successfully',
      status,
      testCasesPassed: passedCount,
      totalTestCases: problem.visibleTestCases.length,
      results: testResults,
      stdout: allStdout
    });
  } catch (error) {
    console.error('Run code error:', error);
    res.status(500).json({ message: 'Error running code', error: error.message });
  }
};

export const submitCode = async (req, res) => {
  try {
    const { problem: problemId, language, code } = req.body;
    const user = req.user._id;

    // Find the problem (handle both ID and slug)
    const problem = await (problemId.match(/^[0-9a-fA-F]{24}$/) 
      ? Problem.findById(problemId) 
      : Problem.findOne({ slug: problemId }));
      
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    
    // Use the actual DB ID for the submission record if it's an internal problem
    const actualProblemId = problem._id || problemId;

    let status = 'Accepted';
    let testCasesPassed = 0;
    let totalTestCases = 0;

    if (language === 'javascript') {
      const allTestCases = [...problem.visibleTestCases, ...problem.hiddenTestCases];
      totalTestCases = allTestCases.length;
      
      for (const testCase of allTestCases) {
        const result = executeJS(code, testCase.input, testCase.output);
        if (result.passed) testCasesPassed++;
      }
      
      status = testCasesPassed === totalTestCases ? 'Accepted' : 'Wrong Answer';
    } else {
      // Mock for other languages
      testCasesPassed = 2;
      totalTestCases = 2;
    }

    // Create submission
    const submission = new Submission({
      user,
      problem: actualProblemId,
      language,
      code,
      status,
      testCasesPassed,
      totalTestCases
    });

    await submission.save();

    // Update problem stats
    await Problem.findByIdAndUpdate(problem._id || problemId, {
      $inc: { submissionsCount: 1, acceptedCount: status === 'Accepted' ? 1 : 0 }
    });

    // Update user stats
    await updateUserStats(user, problem._id || problemId, status);

    res.json({
      success: true,
      message: status === 'Accepted' ? 'Solution accepted!' : 'Solution failed some test cases.',
      status: submission.status,
      submission
    });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error submitting code', 
      error: error.message 
    });
  }
};

// Helper function to update user statistics
const updateUserStats = async (userId, problemId, status) => {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    let problem = await (problemId.toString().match(/^[0-9a-fA-F]{24}$/) 
      ? Problem.findById(problemId) 
      : Problem.findOne({ slug: problemId }));
    if (!problem) return;
    
    const actualProblemId = problem._id || problemId;

    // Update submission counts
    user.totalSubmissions = (user.totalSubmissions || 0) + 1;

    if (status === 'Accepted') {
      user.acceptedSubmissions = (user.acceptedSubmissions || 0) + 1;

      // Check if problem is already solved
      const alreadySolved = user.solvedProblems && user.solvedProblems.includes(problemId);

      if (!alreadySolved) {
        if (!user.solvedProblems) user.solvedProblems = [];
        user.solvedProblems.push(problemId);
        user.totalSolved = (user.totalSolved || 0) + 1;

        switch (problem.difficulty.toLowerCase()) {
          case 'easy': user.easySolved = (user.easySolved || 0) + 1; break;
          case 'medium': user.mediumSolved = (user.mediumSolved || 0) + 1; break;
          case 'hard': user.hardSolved = (user.hardSolved || 0) + 1; break;
        }

        const today = new Date();
        const lastSubmission = user.lastSubmissionDate;

        if (!lastSubmission) {
          user.streak = 1;
        } else {
          const daysDiff = Math.floor((today - lastSubmission) / (1000 * 60 * 60 * 24));
          if (daysDiff === 1) {
            user.streak = (user.streak || 0) + 1;
          } else if (daysDiff > 1) {
            user.streak = 1;
          }
        }

        if (user.streak > (user.maxStreak || 0)) {
          user.maxStreak = user.streak;
        }
      }
    }

    user.lastSubmissionDate = new Date();
    await user.save();
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
};

export const getSubmissionHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const submissions = await Submission.find({ user: userId })
      .populate('problem', 'title slug difficulty')
      .sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission history', error: error.message });
  }
};

export const getSubmissionsByProblem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { problemId } = req.params;
    // If problemId is a slug, we need to find the problem ID or use the slug itself
    // Since submissions might be stored with either, we search for both if it's a slug
    let query = { user: userId };
    if (problemId.match(/^[0-9a-fA-F]{24}$/)) {
      query.problem = problemId;
    } else {
      // Find problem by slug to get ID
      const problem = await Problem.findOne({ slug: problemId });
      if (problem) {
        query.problem = { $in: [problem._id, problemId] };
      } else {
        query.problem = problemId;
      }
    }

    const submissions = await Submission.find(query)
      .populate('problem', 'title slug difficulty')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Submissions fetched successfully',
      submissions,
      hasSubmissions: submissions.length > 0,
      lastAccepted: submissions.find(s => s.status === 'Accepted') || null
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
};

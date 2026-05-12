// Problem controller
import Problem from '../models/problem.model.js';

export const getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.find().select('-hiddenTestCases -referenceSolution');
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching problems', error: error.message });
  }
};

export const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const problem = await Problem.findOne({ slug }).select('-hiddenTestCases -referenceSolution');

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching problem', error: error.message });
  }
};

export const createProblem = async (req, res) => {
  try {
    const problemData = req.body;

    // Create new problem
    const problem = new Problem(problemData);
    await problem.save();

    res.status(201).json({
      message: 'Problem created successfully',
      problem
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: 'Problem with this title or slug already exists' });
    } else {
      res.status(500).json({ message: 'Error creating problem', error: error.message });
    }
  }
};
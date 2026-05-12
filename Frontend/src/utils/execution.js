import { submissionsApi } from '../api/api.js'

const languageLabels = {
  javascript: 'JavaScript',
  python: 'Python',
  cpp: 'C++',
}

export const supportedLanguages = Object.entries(languageLabels).map(([value, label]) => ({
  value,
  label,
}))

export async function runCode({ code, language, problem }) {
  if (!code.trim()) {
    return {
      status: 'Runtime Error',
      message: 'Editor is empty.',
      passed: 0,
      total: problem?.visibleTestCases?.length || 0,
      cases: [],
      stdout: '',
    }
  }

  try {
    const problemId = problem._id || problem.slug
    const response = await submissionsApi.run({
      problem: problemId,
      language,
      code
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return {
      status: response.status,
      message: response.status === 'Accepted' 
        ? `${languageLabels[language]} solution passed all visible tests.` 
        : `Tests failed. ${response.testCasesPassed}/${response.totalTestCases} passed.`,
      passed: response.testCasesPassed,
      total: response.totalTestCases,
      stdout: response.stdout || '',
      cases: response.results || []
    }
  } catch (error) {
    console.error('Run error:', error)
    return {
      status: 'Runtime Error',
      message: error.message || 'Failed to run code. Please try again.',
      passed: 0,
      total: problem?.visibleTestCases?.length || 0,
      cases: [],
      stdout: '',
    }
  }
}

export async function submitCode({ code, language, problem }) {
  await delay(900)

  try {
    if (!problem) {
      throw new Error('Problem not found')
    }

    // Get problem ID: use _id for internal problems, slug for external
    const problemId = problem._id || problem.slug
    
    if (!problemId) {
      throw new Error('Problem ID is missing')
    }

    // Submit to backend API
    const submissionData = {
      problem: problemId,
      language,
      code
    }

    const response = await submissionsApi.submit(submissionData)
    console.log('Backend response:', response)

    if (!response) {
      throw new Error('No response from server')
    }

    if (!response.success) {
      throw new Error(response.error || response.message || 'Submission failed')
    }

    // Return the API response with additional frontend data
    const hiddenTotal = Array.isArray(problem.hiddenTestCases)
      ? problem.hiddenTestCases.length
      : typeof problem.hiddenTestCases === 'number'
      ? problem.hiddenTestCases
      : 0

    return {
      ...response,
      hiddenTotal,
      hiddenPassed: response.status === 'Accepted' ? hiddenTotal : 0,
      success: true
    }
  } catch (error) {
    console.error('Submission error:', error)
    return {
      success: false,
      status: 'Runtime Error',
      message: error.message || 'Failed to submit to server. Please try again.',
      error: error.message
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

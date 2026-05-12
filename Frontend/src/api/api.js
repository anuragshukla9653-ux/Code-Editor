import api from './axios.js'

export const problemsApi = {
  // Get all problems
  getAll: async () => {
    const response = await api.get('/problems')
    return response.data
  },

  // Get external LeetCode problems with optional difficulty filter
  getExternalProblems: async (difficulty = null) => {
    let url = 'https://alfa-leetcode-api.onrender.com/problems'
    if (difficulty) {
      url += `?difficulty=${difficulty.toUpperCase()}`
    }
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch external problems')
    }
    const data = await response.json()
    return (data.problemsetQuestionList || []).map(problem => ({
      id: `leetcode-${problem.questionFrontendId}`,
      slug: problem.titleSlug,
      title: problem.title,
      difficulty: problem.difficulty,
      acceptance: Math.round(problem.acRate),
      tags: problem.topicTags.map(tag => tag.name),
      // Note: External problems don't have full details like description, constraints, etc.
      isExternal: true
    }))
  },

  // Get combined problems (internal + external) with optional difficulty filter
  getAllCombined: async (difficulty = null) => {
    try {
      const [internalProblems, externalProblems] = await Promise.all([
        problemsApi.getAll(),
        problemsApi.getExternalProblems(difficulty).catch(error => {
          console.error('Error fetching external problems:', error)
          return []
        })
      ])
      
      // Use a Map to ensure uniqueness by slug
      const problemMap = new Map()
      
      // Add internal problems first (they take priority)
      internalProblems.forEach(p => {
        problemMap.set(p.slug.toLowerCase(), p)
      })
      
      // Add external problems only if they don't already exist
      externalProblems.forEach(p => {
        if (!problemMap.has(p.slug.toLowerCase())) {
          problemMap.set(p.slug.toLowerCase(), p)
        }
      })
      
      return Array.from(problemMap.values())
    } catch (error) {
      console.error('Error fetching combined problems:', error)
      return []
    }
  },

  // Get external LeetCode problem details by slug
  getExternalProblemBySlug: async (slug) => {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/select?titleSlug=${slug}`)
    if (!response.ok) {
      throw new Error('Failed to fetch external problem details')
    }
    const data = await response.json()

    const questionHtml = data.question || ''

    // Extract examples from the HTML content
    const examples = []
    const exampleRegex = /<p><strong class="example">Example \d+:<\/strong><\/p>\s*<pre>\s*(.*?)<\/pre>/gs
    let match
    while ((match = exampleRegex.exec(questionHtml)) !== null) {
      examples.push({
        input: match[1].split('\n<strong>Output:</strong>')[0].replace('<strong>Input:</strong> ', ''),
        output: match[1].split('\n<strong>Output:</strong>')[1]?.split('\n')[0] || ''
      })
    }

    // Extract constraints
    const constraintsMatch = questionHtml.match(/<p><strong>Constraints:<\/strong><\/p>\s*<ul>(.*?)<\/ul>/s)
    const constraints = constraintsMatch ?
      constraintsMatch[1].match(/<li>(.*?)<\/li>/g)?.map(li =>
        li.replace(/<\/?li>/g, '').trim()
      ) || [] : []

    // Clean up the description by removing examples and constraints
    let description = questionHtml
      .replace(/<p><strong class="example">Example \d+:<\/strong><\/p>[\s\S]*?(?=<\/pre>)/g, '')
      .replace(/<p><strong>Constraints:<\/strong><\/p>[\s\S]*?<\/ul>/g, '')
      .replace(/<p><strong>Follow-up.*?<\/p>/g, '')
      .trim()

    return {
      id: `leetcode-${data.questionFrontendId}`,
      slug: data.titleSlug,
      title: data.questionTitle,
      difficulty: data.difficulty,
      acceptance: 0, // Not available in detail endpoint
      tags: data.topicTags.map(tag => tag.name),
      description,
      constraints,
      examples,
      hints: data.hints || [],
      starterCode: {
        javascript: `function ${data.titleSlug.replace(/-/g, '_')}(/* parameters */) {
  // Write your solution here
}`,
        python: `def ${data.titleSlug.replace(/-/g, '_')}(${data.exampleTestcases ? 'nums, target' : ''}):
    # Write your solution here
    pass`,
        cpp: `#include <bits/stdc++.h>
using namespace std;

${data.exampleTestcases ? 'vector<int>' : 'void'} ${data.titleSlug.replace(/-/g, '_')}(${data.exampleTestcases ? 'vector<int>& nums, int target' : ''}) {
    // Write your solution here
    ${data.exampleTestcases ? 'return {};' : ''}
}`
      },
      visibleTestCases: data.exampleTestcases ? data.exampleTestcases.split('\n').map(test => ({ input: test })) : [],
      isExternal: true,
      leetcodeLink: data.link
    }
  },

  // Create new problem (admin only)
  create: async (problemData) => {
    const response = await api.post('/problems', problemData)
    return response.data
  }
}

export const submissionsApi = {
  // Run code
  run: async (submissionData) => {
    const response = await api.post('/submissions/run', submissionData)
    return response.data
  },

  // Submit code
  submit: async (submissionData) => {
    const response = await api.post('/submissions/submit', submissionData)
    return response.data
  },

  // Get submission history
  getHistory: async () => {
    const response = await api.get('/submissions/history')
    return response.data
  },

  // Get submissions for a specific problem
  getByProblem: async (problemId) => {
    const response = await api.get(`/submissions/problem/${encodeURIComponent(problemId)}`)
    return response.data
  }
}

export const authApi = {
  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout')
    return response.data
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  }
}

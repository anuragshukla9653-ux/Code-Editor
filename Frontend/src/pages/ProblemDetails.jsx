import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CodeEditor from '../components/CodeEditor.jsx'
import Console from '../components/Console.jsx'
import SplitLayout from '../components/SplitLayout.jsx'
import SubmissionsModal from '../components/SubmissionsModal.jsx'
import { problemsApi } from '../api/api.js'
import { useAppStore } from '../hooks/useAppStore.js'
import { runCode, submitCode, supportedLanguages } from '../utils/execution.js'

function ProblemDetails() {
  const { slug } = useParams()
  const { addSubmission, user } = useAppStore()
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState('javascript')
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [showSubmissionsModal, setShowSubmissionsModal] = useState(false)
  const [submissionsRefreshKey, setSubmissionsRefreshKey] = useState(0)

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true)
        setError(null)

        // First try to get from internal API
        try {
          const data = await problemsApi.getBySlug(slug)
          setProblem(data)
          setCode(data.starterCode?.javascript || '')
          setLoading(false)
          return
        } catch {
          // If internal API fails, check if this might be an external problem
          console.log('Internal problem not found, checking external API...')
        }

        // Try to get external problem details
        try {
          const externalData = await problemsApi.getExternalProblemBySlug(slug)
          setProblem(externalData)
          setCode(externalData.starterCode?.javascript || '')
          setLoading(false)
          return
        } catch (externalErr) {
          console.error('Error fetching external problem:', externalErr)
          setError('Failed to load problem. Please try again.')
        }
      } catch (err) {
        setError('Failed to load problem. Please try again.')
        console.error('Error fetching problem:', err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProblem()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="page-section">
        <div className="section-heading">
          <p>Loading problem...</p>
        </div>
      </div>
    )
  }

  if (error || !problem) {
    return (
      <div className="page-section">
        <div className="section-heading">
          <p className="error-message">{error || 'Problem not found'}</p>
          <Link to="/problems">Back to problems</Link>
        </div>
      </div>
    )
  }

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value
    setLanguage(nextLanguage)
    setCode(problem.starterCode[nextLanguage] || '')
    setResult(null)
  }

  const handleRun = async () => {
    setIsRunning(true)
    const nextResult = await runCode({ code, language, problem })
    setResult(nextResult)
    setIsRunning(false)
  }

  const handleSubmit = async () => {
    if (!user) {
      alert('Please login to submit your solution.')
      return
    }

    try {
      setIsRunning(true)
      
      // First run the code to check if it's correct
      const runResult = await runCode({ code, language, problem })
      setResult(runResult)
      
      // Check if the code passed all test cases
      if (runResult.status !== 'Accepted') {
        alert('Your code did not pass all test cases. Please fix it before submitting.')
        setIsRunning(false)
        return
      }

      // If correct, submit to backend
      const submitResult = await submitCode({ code, language, problem })
      console.log('Submission result:', submitResult)
      
      if (!submitResult.success) {
        alert('Error: ' + submitResult.message)
        setIsRunning(false)
        return
      }
      
      const nextResult = {
        ...runResult,
        ...submitResult,
        message: submitResult.message || runResult.message,
      }

      setResult(nextResult)
      addSubmission({
        id: submitResult.submission?._id || crypto.randomUUID(),
        problemId: problem._id || problem.slug,
        problemTitle: problem.title,
        language,
        status: submitResult.status || 'Accepted',
        createdAt: submitResult.submission?.createdAt || new Date().toISOString(),
      })
      
      alert('Solution submitted and saved successfully!')
      setSubmissionsRefreshKey((current) => current + 1)
      setShowSubmissionsModal(true)
    } catch (error) {
      console.error('Submit error:', error)
      alert('Error: ' + error.message)
    } finally {
      setIsRunning(false)
    }
  }

  const problemPane = (
    <article className="problem-pane">
      <Link className="back-link" to="/problems">
        Back to problems
      </Link>
      <div className="problem-title-row">
        <div>
          <span className="eyebrow">Problem</span>
          <h1>{problem.title}</h1>
        </div>
        <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
        {problem.isExternal && problem.leetcodeLink && (
          <a href={problem.leetcodeLink} target="_blank" rel="noopener noreferrer" className="external-link">
            View on LeetCode
          </a>
        )}
      </div>
      {problem.isExternal ? (
        <div dangerouslySetInnerHTML={{ __html: problem.description }} />
      ) : (
        <p>{problem.description}</p>
      )}

      <section>
        <h2>Examples</h2>
        {problem.examples.map((example, index) => (
          <div className="example-block" key={`${example.input}-${index}`}>
            <strong>Example {index + 1}</strong>
            <code>Input: {example.input}</code>
            <code>Output: {example.output}</code>
            {example.explanation && <span>{example.explanation}</span>}
          </div>
        ))}
      </section>

      <section>
        <h2>Constraints</h2>
        <ul className="constraint-list">
          {problem.constraints.map((constraint) => (
            <li key={constraint}>{constraint}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Test cases</h2>
        <div className="testcase-grid">
          {problem.visibleTestCases.map((testCase) => (
            <div key={testCase.input}>
              <span>{testCase.input}</span>
              <strong>{testCase.output}</strong>
            </div>
          ))}
        </div>
      </section>
    </article>
  )

  const editorPane = (
    <section className="workspace-pane">
      <div className="editor-toolbar">
        <label>
          <span>Language</span>
          <select value={language} onChange={handleLanguageChange}>
            {supportedLanguages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <div className="run-actions">
          <button 
            type="button" 
            className="ghost-button" 
            disabled={isRunning} 
            onClick={() => setShowSubmissionsModal(true)}
          >
            My Submissions
          </button>
          <button type="button" className="ghost-button" disabled={isRunning} onClick={handleRun}>
            Run
          </button>
          <button type="button" className="primary-button" disabled={isRunning} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <CodeEditor code={code} language={language} onCodeChange={setCode} />
      <Console result={result} isRunning={isRunning} />
      <SubmissionsModal 
        isOpen={showSubmissionsModal}
        onClose={() => setShowSubmissionsModal(false)}
        problemId={problem?._id || problem?.slug}
        problemTitle={problem?.title}
        refreshKey={submissionsRefreshKey}
      />
    </section>
  )

  return <SplitLayout left={problemPane} right={editorPane} />
}

export default ProblemDetails

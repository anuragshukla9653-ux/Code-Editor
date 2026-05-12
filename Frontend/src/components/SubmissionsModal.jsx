import { useState, useEffect, useCallback } from 'react'
import { submissionsApi } from '../api/api.js'
import '../styles/SubmissionsModal.css'

function SubmissionsModal({ isOpen, onClose, problemId, problemTitle, refreshKey = 0 }) {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await submissionsApi.getByProblem(problemId)
      const nextSubmissions = data.submissions || []
      setSubmissions(nextSubmissions)
      setSelectedSubmission(null)
      if (nextSubmissions.length === 0) {
        setError('You haven\'t submitted any solution yet')
      }
    } catch (err) {
      setError('Failed to load submissions')
      console.error('Error fetching submissions:', err)
    } finally {
      setLoading(false)
    }
  }, [problemId])

  useEffect(() => {
    if (isOpen && problemId) {
      const timeoutId = window.setTimeout(fetchSubmissions, 0)
      return () => window.clearTimeout(timeoutId)
    }
  }, [isOpen, problemId, refreshKey, fetchSubmissions])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusClass = (status) => {
    return `status-${status.toLowerCase().replace(/\s+/g, '-')}`
  }

  if (!isOpen) return null

  return (
    <div className="submissions-modal-overlay" onClick={onClose}>
      <div className="submissions-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Submissions for {problemTitle}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {loading && <div className="loading">Loading submissions...</div>}

          {error && !loading && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {!loading && submissions.length > 0 && !selectedSubmission && (
            <div className="submissions-list">
              <div className="submissions-header">
                <span className="col-status">Status</span>
                <span className="col-language">Language</span>
                <span className="col-date">Submitted</span>
                <span className="col-action">View</span>
              </div>
              {submissions.map((submission) => (
                <div key={submission._id} className="submission-row">
                  <span className={`status-badge ${getStatusClass(submission.status)}`}>
                    {submission.status}
                  </span>
                  <span className="language-badge">{submission.language}</span>
                  <span className="submission-date">{formatDate(submission.createdAt)}</span>
                  <button
                    className="view-button"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && selectedSubmission && (
            <div className="submission-detail">
              <button
                className="back-button"
                onClick={() => setSelectedSubmission(null)}
              >
                ← Back
              </button>
              
              <div className="detail-header">
                <h3>Submission Details</h3>
                <span className={`status-badge ${getStatusClass(selectedSubmission.status)}`}>
                  {selectedSubmission.status}
                </span>
              </div>

              <div className="detail-info">
                <div className="info-row">
                  <span className="label">Language:</span>
                  <span className="value">{selectedSubmission.language}</span>
                </div>
                <div className="info-row">
                  <span className="label">Submitted:</span>
                  <span className="value">{formatDate(selectedSubmission.createdAt)}</span>
                </div>
                {selectedSubmission.testCasesPassed > 0 && (
                  <div className="info-row">
                    <span className="label">Test Cases:</span>
                    <span className="value">
                      {selectedSubmission.testCasesPassed}/{selectedSubmission.totalTestCases}
                    </span>
                  </div>
                )}
              </div>

              <div className="code-section">
                <h4>Code:</h4>
                <pre className="code-block">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubmissionsModal

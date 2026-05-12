import { useMemo, useState, useEffect } from 'react'
import ProblemCard from '../components/ProblemCard.jsx'
import { problemsApi } from '../api/api.js'

const difficulties = ['All', 'Easy', 'Medium', 'Hard']
const pageSize = 5

function Problems() {
  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [page, setPage] = useState(1)
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true)
        setError(null)
        // Pass difficulty to API if not 'All'
        const apiDifficulty = difficulty === 'All' ? null : difficulty
        const data = await problemsApi.getAllCombined(apiDifficulty)
        setProblems(data)
        // Reset to first page when difficulty changes
        setPage(1)
      } catch (err) {
        setError('Failed to load problems. Please try again.')
        console.error('Error fetching problems:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [difficulty])

  const filteredProblems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return problems.filter((problem) => {
      const matchesQuery =
        !normalizedQuery ||
        problem.title.toLowerCase().includes(normalizedQuery) ||
        problem.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))

      return matchesQuery
    })
  }, [query, problems])

  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleProblems = filteredProblems.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  if (loading) {
    return (
      <section className="page-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Problem set</span>
            <h1>Choose a challenge</h1>
          </div>
          <p>Loading problems...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Problem set</span>
            <h1>Choose a challenge</h1>
          </div>
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </section>
    )
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Problem set</span>
          <h1>Choose a challenge</h1>
        </div>
        <p>Search by title or tag, filter by difficulty, and open the split editor.</p>
      </div>

      <div className="problem-toolbar">
        <label>
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Two Sum, stack, array"
          />
        </label>

        <div className="segmented-control" aria-label="Difficulty filter">
          {difficulties.map((nextDifficulty) => (
            <button
              className={difficulty === nextDifficulty ? 'active' : ''}
              key={nextDifficulty}
              type="button"
              onClick={() => {
                setDifficulty(nextDifficulty)
                setPage(1)
              }}
            >
              {nextDifficulty}
            </button>
          ))}
        </div>
      </div>

      <div className="problem-table">
        <div className="problem-head">
          <span>Title</span>
          <span>Difficulty</span>
          <span>Acceptance</span>
        </div>
        {visibleProblems.map((problem) => (
          <ProblemCard key={problem._id || problem.slug} problem={problem} />
        ))}
        {visibleProblems.length === 0 && <p className="empty-state">No problems match that filter.</p>}
      </div>

      <div className="pagination">
        <button type="button" disabled={currentPage === 1} onClick={() => setPage((value) => value - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setPage((value) => value + 1)}
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default Problems

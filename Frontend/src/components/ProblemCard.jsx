import { Link } from 'react-router-dom'

function ProblemCard({ problem }) {
  // Handle both acceptance (mock data) and acceptanceRate (API data)
  const acceptance = problem.acceptance || problem.acceptanceRate || 0

  return (
    <Link className="problem-row" to={`/problems/${problem.slug}`}>
      <span>
        <strong>{problem.title}</strong>
        <small>{problem.tags.join(', ')}</small>
      </span>
      <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>
        {problem.difficulty}
      </span>
      <span>{acceptance}%</span>
    </Link>
  )
}

export default ProblemCard

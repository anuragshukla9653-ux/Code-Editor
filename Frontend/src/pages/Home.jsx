import { Link } from 'react-router-dom'
import { problems } from '../data/mockProblems.js'

function Home() {
  const easyCount = problems.filter((problem) => problem.difficulty === 'Easy').length

  return (
    <section className="home-grid">
      <div className="home-copy">
        <span className="eyebrow">Coding platform MVP</span>
        <h1>Practice, run, and validate coding problems in one focused workspace.</h1>
        <p>
          A React-based foundation for a LeetCode-style app with problem browsing,
          Monaco editing, visible test runs, submissions, auth screens, and backend-ready
          API boundaries.
        </p>
        <div className="hero-actions">
          <Link className="primary-button large" to="/problems">
            Start solving
          </Link>
          <Link className="ghost-button large" to="/register">
            Create account
          </Link>
        </div>
      </div>

      <div className="metrics-board" aria-label="MVP metrics">
        <div>
          <strong>{problems.length}</strong>
          <span>Problems loaded</span>
        </div>
        <div>
          <strong>{easyCount}</strong>
          <span>Beginner friendly</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Languages ready</span>
        </div>
        <div>
          <strong>JWT</strong>
          <span>Auth planned</span>
        </div>
      </div>

      <div className="roadmap-strip">
        <span>Authentication</span>
        <span>Code editor</span>
        <span>Test validation</span>
        <span>Judge0 backend</span>
        <span>Admin CRUD</span>
      </div>
    </section>
  )
}

export default Home

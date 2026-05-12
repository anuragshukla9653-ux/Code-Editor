import { NavLink } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore.js'

function Navbar() {
  const { user, logout } = useAppStore()

  return (
    <header className="navbar">
      <NavLink className="brand" to="/">
        CodeBench
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/problems">Problems</NavLink>
        <a href="#admin">Admin</a>
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button type="button" className="ghost-button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="ghost-button" to="/login">
              Login
            </NavLink>
            <NavLink className="primary-button" to="/register">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar

import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore.js'
import { authApi } from '../api/api.js'

function Login() {
  const navigate = useNavigate()
  const { login } = useAppStore()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const response = await authApi.login({
        email: formData.get('email'),
        password: formData.get('password')
      })

      // Store token and user data
      localStorage.setItem('token', response.token)
      login(response.user)

      navigate('/problems')
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please check your credentials.')
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <span className="eyebrow">Welcome back</span>
        <h1>Log in to continue solving.</h1>
        <p>
          This screen is wired for the UX flow now. Connect it to the JWT + cookie
          backend when the Express API is ready.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" placeholder="Your password" required />
        </label>
        <button className="primary-button large" type="submit">
          Login
        </button>
        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  )
}

export default Login

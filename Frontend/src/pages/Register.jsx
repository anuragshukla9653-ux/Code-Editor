import { Link, useNavigate } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore.js'
import { authApi } from '../api/api.js'

function Register() {
  const navigate = useNavigate()
  const { login } = useAppStore()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      const response = await authApi.register({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      })

      console.log('Registration successful:', response)

      // Store token and user data
      localStorage.setItem('token', response.token)
      console.log('Token stored:', response.token)
      login(response.user)
      console.log('User logged in:', response.user)

      navigate('/problems')
    } catch (error) {
      console.error('Registration error:', error)
      console.error('Error response:', error.response?.data)
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
      alert(errorMessage)
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-copy">
        <span className="eyebrow">Create account</span>
        <h1>Start tracking submissions from day one.</h1>
        <p>
          The form mirrors the future backend contract: name, email, password,
          cookie-backed session, and protected routes.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input name="name" type="text" placeholder="Arpit" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="you@example.com" required />
        </label>
        <label>
          <span>Password</span>
          <input name="password" type="password" placeholder="Minimum 8 characters" minLength="8" required />
        </label>
        <button className="primary-button large" type="submit">
          Sign up
        </button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register

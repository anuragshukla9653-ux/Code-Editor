import { useMemo, useState } from 'react'
import { StoreContext } from './storeContext.js'

export function StoreProvider({ children }) {
  // Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        return JSON.parse(storedUser)
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
        return null
      }
    }
    return null
  })
  const [submissions, setSubmissions] = useState([])

  const value = useMemo(
    () => ({
      user,
      submissions,
      login: (nextUser) => {
        setUser(nextUser)
        localStorage.setItem('user', JSON.stringify(nextUser))
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      },
      addSubmission: (submission) =>
        setSubmissions((current) => [submission, ...current].slice(0, 20)),
    }),
    [user, submissions],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

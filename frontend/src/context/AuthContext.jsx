import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // restore user from localStorage so login persists on refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  async function login(email, password) {
    try {
      setAuthLoading(true)
      setAuthError('')
      const data = await loginUser(email, password)
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        return true
      }
      setAuthError(data.message || 'Login failed')
      return false
    } catch {
      setAuthError('Something went wrong')
      return false
    } finally {
      setAuthLoading(false)
    }
  }

  async function register(name, email, password) {
    try {
      setAuthLoading(true)
      setAuthError('')
      const data = await registerUser(name, email, password)
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        return true
      }
      setAuthError(data.message || 'Registration failed')
      return false
    } catch {
      setAuthError('Something went wrong')
      return false
    } finally {
      setAuthLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authError, authLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

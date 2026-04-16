import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser } from '../api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // get user from localStorage so login persists on refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Login
  async function login(email, password) {
    try {
      setAuthLoading(true)
      setAuthError('')
      const data = await loginUser(email, password)

      if (data.token) {
        // save user and token to localStorage
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
        return true
      } else {
        setAuthError(data.message || 'Login failed')
        return false
      }
    } catch (err) {
      setAuthError('Something went wrong')
      return false
    } finally {
      setAuthLoading(false)
    }
  }

  // Register
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
      } else {
        setAuthError(data.message || 'Registration failed')
        return false
      }
    } catch (err) {
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
  // force page reload so NotesContext resets cleanly
  window.location.href = '/'
}
  return (
    <AuthContext.Provider value={{
      user, login, register, logout, authError, authLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
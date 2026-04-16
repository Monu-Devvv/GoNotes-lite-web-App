import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthPage.css'

function AuthPage() {
  const { login, register, authError, authLoading } = useAuth()

  // toggle between login and signup
  const [isLogin, setIsLogin] = useState(true)

  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit() {
    if (isLogin) {
      await login(email, password)
    } else {
      await register(name, email, password)
    }
  }

  return (
    <div className="authpage">
      {/* Background blobs */}
      <div className="authpage__blob1" />
      <div className="authpage__blob2" />

      <div className="authpage__card">
        {/* Logo */}
        <div className="authpage__logo">📝</div>
        <h1 className="authpage__title">GoNotes</h1>
        <p className="authpage__subtitle">
          {isLogin ? 'Welcome back!' : 'Create your account'}
        </p>

        {/* Form */}
        <div className="authpage__form">
          {!isLogin && (
            <div className="authpage__field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div className="authpage__field">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="authpage__field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Error message */}
          {authError && (
            <p className="authpage__error">⚠️ {authError}</p>
          )}

          {/* Submit button */}
          <button
            className="authpage__btn"
            onClick={handleSubmit}
            disabled={authLoading}
          >
            {authLoading
              ? 'Please wait...'
              : isLogin ? 'Login' : 'Create Account'
            }
          </button>
        </div>

        {/* Toggle login/signup */}
        <p className="authpage__toggle">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={() => { setIsLogin(!isLogin); setName('') }}>
            {isLogin ? ' Sign Up' : ' Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
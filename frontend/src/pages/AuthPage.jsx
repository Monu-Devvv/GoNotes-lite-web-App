import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const { login, register, authError, authLoading } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (isLogin) {
      await login(email, password)
    } else {
      await register(name, email, password)
    }
  }

  function switchMode() {
    setIsLogin(v => !v)
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="min-h-screen w-screen bg-mesh flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full -top-24 -left-24 blur-3xl bg-purple-400/20 animate-blob" />
        <div className="absolute w-80 h-80 rounded-full -bottom-20 -right-20 blur-3xl bg-indigo-400/20 animate-blob" style={{ animationDelay: '-6s' }} />
        <div className="absolute w-64 h-64 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl bg-pink-400/10 animate-blob" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Card */}
      <div className="glass-strong rounded-3xl p-8 sm:p-10 w-full max-w-md relative z-10 animate-slide-up">

        {/* Logo & title */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📝</div>
          <h1 className="font-display text-3xl font-bold gradient-text">GoNotes</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {isLogin ? 'Welcome back! Sign in to continue.' : 'Create your free account.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name — only on signup */}
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100
                  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 text-sm font-medium text-slate-800 dark:text-slate-100
                placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 pr-12 text-sm font-medium text-slate-800 dark:text-slate-100
                  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {authError && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-3 text-sm text-red-500 font-medium text-center">
              ⚠️ {authError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={authLoading}
            className="w-full gradient-btn text-white font-bold text-sm py-3.5 rounded-xl
              transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
              disabled:transform-none mt-2"
          >
            {authLoading
              ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Please wait...
                </span>
              )
              : isLogin ? 'Sign In' : 'Create Account'
            }
          </button>
        </form>

        {/* Switch mode */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={switchMode}
            className="font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}

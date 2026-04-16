import { useNotes } from '../context/NotesContext'
import { useAuth } from '../context/AuthContext'

const categoryIcons = {
  All: '◈', Personal: '✦', Work: '⬡', Ideas: '✺', Others: '◉'
}

const categoryAccents = {
  All: 'hover:bg-slate-100 dark:hover:bg-white/10',
  Personal: 'hover:bg-violet-50 dark:hover:bg-violet-900/20',
  Work: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
  Ideas: 'hover:bg-amber-50 dark:hover:bg-amber-900/20',
  Others: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/20',
}

export default function Sidebar({ isOpen, onClose }) {
  const { categories, activeCategory, setActiveCategory, addNote, notes, isDark, toggleTheme } = useNotes()
  const { user, logout } = useAuth()

  function handleCategory(cat) {
    setActiveCategory(cat)
    onClose()
  }

  function handleNewNote() {
    addNote()
    onClose()
  }

  return (
    <>
      {/* Backdrop on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 glass-strong flex flex-col p-5 gap-4
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto md:h-screen md:flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Header */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-2xl">📝</span>
          <h1 className="font-display font-bold text-xl gradient-text">GoNotes</h1>
        </div>

        {/* User pill */}
        <div className="glass rounded-2xl px-3 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-btn flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        {/* New Note button */}
        <button
          onClick={handleNewNote}
          className="gradient-btn text-white font-bold text-sm py-3 rounded-2xl
            flex items-center justify-center gap-2 transition-all duration-200"
        >
          <span className="text-lg font-light leading-none">+</span>
          New Note
        </button>

        {/* Categories */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-1">
            Categories
          </p>
          {categories.map(cat => {
            const count = cat === 'All' ? notes.length : notes.filter(n => n.category === cat).length
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 w-full text-left
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200/40 dark:shadow-indigo-900/40'
                    : `text-slate-600 dark:text-slate-300 ${categoryAccents[cat]}`
                  }`}
              >
                <span className="text-base w-5 text-center">{categoryIcons[cat]}</span>
                <span className="flex-1">{cat}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                  ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom actions */}
        <div className="space-y-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              glass hover:border-indigo-300/40 transition-all text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <div className={`relative w-10 h-5 rounded-full transition-colors duration-300 flex-shrink-0
              ${isDark ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-slate-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
                ${isDark ? 'translate-x-5' : 'translate-x-0.5'}`}>
                <span className="flex items-center justify-center h-full text-[9px]">
                  {isDark ? '🌙' : '☀️'}
                </span>
              </div>
            </div>
            <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all border border-transparent
              hover:border-red-200/50 dark:hover:border-red-800/50"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>

          <p className="text-[10px] text-slate-400 text-center font-medium pt-1">
            {notes.length} notes saved
          </p>
        </div>
      </aside>
    </>
  )
}

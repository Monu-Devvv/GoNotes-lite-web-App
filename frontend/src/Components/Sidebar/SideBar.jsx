import { useNotes } from '../../context/NotesContext'
import { useAuth } from '../../context/AuthContext'     // ← add
import './Sidebar.css'

function Sidebar({ isOpen, onClose }) {
  const {
    categories, activeCategory, setActiveCategory,
    addNote, notes, isDark, toggleTheme
  } = useNotes()

  const { user, logout } = useAuth()                   // ← add

  const categoryIcons = {
    All: '◈', Personal: '✦', Work: '⬡', Ideas: '✺', Others: '◉'
  }

  function handleCategory(category) {
    setActiveCategory(category)
    onClose()
  }

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <span className="sidebar__logo">📝</span>
          <h1 className="sidebar__title">GoNotes</h1>
        </div>
      </div>

      {/* Show logged in user name */}
      <div className="sidebar__user">
        <span className="sidebar__user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </span>
        <span className="sidebar__user-name">{user?.name}</span>
      </div>

      <button className="sidebar__new-btn" onClick={() => { addNote(); onClose() }}>
        <span>+</span> New Note
      </button>

      <nav className="sidebar__nav">
        <p className="sidebar__nav-label">Categories</p>
        {categories.map(category => {
          const count = category === 'All'
            ? notes.length
            : notes.filter(n => n.category === category).length

          return (
            <button
              key={category}
              className={`sidebar__nav-item ${activeCategory === category ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => handleCategory(category)}
            >
              <span className="sidebar__nav-icon">{categoryIcons[category]}</span>
              <span className="sidebar__nav-text">{category}</span>
              <span className="sidebar__nav-count">{count}</span>
            </button>
          )
        })}
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__theme-toggle" onClick={toggleTheme}>
          <div className={`toggle__track ${isDark ? 'toggle__track--on' : ''}`}>
            <div className="toggle__thumb">{isDark ? '🌙' : '☀️'}</div>
          </div>
          <span className="toggle__label">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        {/* Logout button */}
        <button className="sidebar__logout" onClick={logout}>
          🚪 Logout
        </button>

        <p className="sidebar__footer-text">{notes.length} notes saved</p>
      </div>
    </aside>
  )
}

export default Sidebar
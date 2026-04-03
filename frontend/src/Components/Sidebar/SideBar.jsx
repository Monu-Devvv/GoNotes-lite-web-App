import { useNotes } from '../../context/NotesContext'
import './SideBar.css'

function Sidebar({ isOpen, onClose }) {
  const {
    categories, activeCategory, setActiveCategory,
    addNote, notes, isDark, toggleTheme             // ← add isDark, toggleTheme
  } = useNotes()

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
          <h1 className="sidebar__title">Gojo &#10084; Notes</h1>
        </div>
      </div>

      <button className="sidebar__new-btn" onClick={() => { addNote(); onClose() }}>

        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
            <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1">
              <path d="M10 4.5H5.5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V11" />
              <path d="M17.5 3.467a1.46 1.46 0 0 1-.017 2.05L10.5 12.5l-3 1l1-3l6.987-7.046a1.41 1.41 0 0 1 1.885-.104zm-2 2.033l.953 1" />
            </g>
          </svg>
        </span>

        New Note
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
        {/* ── Theme Toggle ── */}
        <button className="sidebar__theme-toggle" onClick={toggleTheme}>
          <div className={`toggle__track ${isDark ? 'toggle__track--on' : ''}`}>
            <div className="toggle__thumb">

              {isDark ?
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.058 20q-3.333 0-5.667-2.334T4.058 12q0-2.47 1.413-4.535q1.414-2.067 4.01-2.973q.306-.107.536-.056t.381.199t.192.38q.04.233-.063.489q-.194.477-.282.971T10.158 7.5q0 2.673 1.863 4.537q1.864 1.863 4.537 1.863q.698 0 1.277-.148q.58-.148.988-.24q.218-.04.399.01t.292.176q.115.125.156.308t-.047.417q-.715 2.45-2.803 4.013T12.058 20" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M8.463 15.538Q7 14.075 7 12t1.463-3.537T12 7t3.538 1.463T17 12t-1.463 3.538T12 17t-3.537-1.463M2 13q-.425 0-.712-.288T1 12t.288-.712T2 11h2q.425 0 .713.288T5 12t-.288.713T4 13zm18 0q-.425 0-.712-.288T19 12t.288-.712T20 11h2q.425 0 .713.288T23 12t-.288.713T22 13zm-8.712-8.287Q11 4.425 11 4V2q0-.425.288-.712T12 1t.713.288T13 2v2q0 .425-.288.713T12 5t-.712-.288m0 18Q11 22.426 11 22v-2q0-.425.288-.712T12 19t.713.288T13 20v2q0 .425-.288.713T12 23t-.712-.288M5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7t-.687.288t-.713-.288M18 19.425l-1.05-1.075q-.275-.3-.275-.712t.275-.688q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3M16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275M4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288" />
                </svg>
              }

            </div>

          </div>
          <span className="toggle__label">
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
        <p className="sidebar__footer-text">{notes.length} notes saved</p>
      </div>
    </aside>
  )
}

export default Sidebar
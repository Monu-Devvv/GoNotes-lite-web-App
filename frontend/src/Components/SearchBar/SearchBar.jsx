import { useNotes } from '../../context/NotesContext'
import './SearchBar.css'

function SearchBar() {
  const { searchQuery, setSearchQuery } = useNotes()

  return (
    <div className="searchbar">
      <span className="searchbar__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
        </svg>
      </span>
      <input
        type="text"
        className="searchbar__input"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="searchbar__clear" onClick={() => setSearchQuery('')}>
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
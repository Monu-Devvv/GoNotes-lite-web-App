import { useNotes } from '../../context/NotesContext'
import NoteCard from '../NoteCard/NoteCard'
import SearchBar from '../SearchBar/SearchBar'
import './NoteList.css'

function NoteList() {
  const { filteredNotes, activeCategory, addNote, selectedNoteId, loading } = useNotes()

  const isMobile = window.innerWidth <= 768
  const isHidden = isMobile && selectedNoteId !== null

  return (
    <div className={`notelist ${isHidden ? 'notelist--hidden' : ''}`}>
      <div className="notelist__header">
        <h2 className="notelist__title">{activeCategory}</h2>
        <span className="notelist__count">{filteredNotes.length} notes</span>
      </div>

      <div className="notelist__search">
        <SearchBar />
      </div>

      <div className="notelist__items">

        {/* Show spinner while loading from backend */}
        {loading ? (
          <div className="notelist__loading">
            <div className="notelist__spinner" />
            <p>Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="notelist__empty">
            <span className="notelist__empty-icon">🗒️</span>
            <p className="notelist__empty-text">No notes found</p>
            <button className="notelist__empty-btn" onClick={addNote}>
              create one
            </button>
          </div>
        ) : (
          filteredNotes.map(note => (
            // MongoDB uses _id instead of id
            <NoteCard key={note._id} note={note} />
          ))
        )}

      </div>
    </div>
  )
}

export default NoteList
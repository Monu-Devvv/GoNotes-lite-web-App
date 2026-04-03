import { useNotes } from '../../context/NotesContext'
import { formatDate, truncateText } from '../../utils/helpers'
import './NoteCard.css'

function NoteCard({ note }) {
  const { selectedNoteId, setSelectedNoteId, deleteNote } = useNotes()

  // MongoDB uses _id
  const isActive = selectedNoteId === note._id

  function handleDelete(e) {
    e.stopPropagation()
    deleteNote(note._id)
  }

  return (
    <div
      className={`notecard ${isActive ? 'notecard--active' : ''}`}
      onClick={() => setSelectedNoteId(note._id)}
    >
      <div className="notecard__header">
        <h3 className="notecard__title">
          {note.title || 'Untitled Note'}
        </h3>
        <button className="notecard__delete" onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
          </svg>
        </button>
      </div>

      <p className="notecard__preview">
        {truncateText(note.content) || 'No content yet...'}
      </p>

      <div className="notecard__footer">
        <span className="notecard__category">{note.category}</span>
        {/* MongoDB timestamps use updatedAt */}
        <span className="notecard__date">{formatDate(note.updatedAt)}</span>
      </div>
    </div>
  )
}

export default NoteCard
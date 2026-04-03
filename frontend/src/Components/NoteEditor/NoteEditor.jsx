import { useState, useEffect } from 'react'
import { useNotes } from '../../context/NotesContext'
import { formatDate } from '../../utils/helpers'
import './NoteEditor.css'

function NoteEditor() {
  const { selectedNote, updateNote, deleteNote, categories, setSelectedNoteId } = useNotes()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Personal')

  const isMobile = window.innerWidth <= 768

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
      setCategory(selectedNote.category)
    }
  }, [selectedNote?._id])

  useEffect(() => {
    if (!selectedNote) return
    const timeout = setTimeout(() => {
      updateNote(selectedNote._id, { title, content, category })
    }, 500)
    return () => clearTimeout(timeout)
  }, [title, content, category])

  return (
    <div className={`editor ${selectedNote ? 'editor--visible' : ''}`}>
      {!selectedNote ? (
        <div className="editor--empty">
          <div className="editor__placeholder">
            <span className="editor__placeholder-icon">📝</span>
            <h2 className="editor__placeholder-title">No Note Selected</h2>
            <p className="editor__placeholder-text">
              Pick a note from the list or tap + to create one
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="editor__topbar">
            <div className="editor__meta">
              {/* Back button — mobile only */}
              {isMobile && (
                <button
                  className="editor__back"
                  onClick={() => setSelectedNoteId(null)}
                >
                  ← Back
                </button>
              )}
              <select
                className="editor__category"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="editor__date">
                {formatDate(selectedNote.updatedAt)}
              </span>
            </div>
            <button
              className="editor__delete"
              onClick={() => deleteNote(selectedNote._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z" />
              </svg>
              {/* 🗑️ */}
              Delete
            </button>
          </div>

          <input
            className="editor__title"
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="editor__divider" />

          <textarea
            className="editor__content"
            placeholder="Start writing..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <div className="editor__bottombar">
            <span className="editor__wordcount">
              {content.trim() === '' ? 0 : content.trim().split(/\s+/).length} words
            </span>
            <span className="editor__charcount">{content.length} chars</span>
          </div>
        </>
      )}
    </div>
  )
}

export default NoteEditor
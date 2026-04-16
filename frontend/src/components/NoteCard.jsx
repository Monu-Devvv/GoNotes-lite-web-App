import { useNotes } from '../context/NotesContext'
import { formatDate, truncateText } from '../utils/helpers'

const categoryColors = {
  Personal: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300',
  Work: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  Ideas: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
  Others: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
}

export default function NoteCard({ note }) {
  const { selectedNoteId, setSelectedNoteId, deleteNote } = useNotes()
  const isActive = selectedNoteId === note._id

  function handleDelete(e) {
    e.stopPropagation()
    deleteNote(note._id)
  }

  return (
    <div
      onClick={() => setSelectedNoteId(note._id)}
      className={`group relative glass rounded-2xl p-4 cursor-pointer transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-300/50
        ${isActive
          ? 'border-indigo-400/60 bg-indigo-50/60 dark:bg-indigo-900/20 shadow-md shadow-indigo-200/30 dark:shadow-indigo-900/30'
          : ''
        }`}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full" />
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate flex-1 leading-snug">
          {note.title || 'Untitled Note'}
        </h3>
        {/* Delete button — shows on hover */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400
            transition-all text-xs p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex-shrink-0"
        >
          🗑️
        </button>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
        {truncateText(note.content) || 'No content yet...'}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${categoryColors[note.category] || categoryColors.Others}`}>
          {note.category}
        </span>
        <span className="text-[10px] font-medium text-slate-400">
          {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  )
}

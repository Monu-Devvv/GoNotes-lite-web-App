import { useState, useEffect } from 'react'
import { useNotes } from '../context/NotesContext'
import { formatDate } from '../utils/helpers'

const categoryColors = {
  Personal: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300',
  Work: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300',
  Ideas: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300',
  Others: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300',
}

export default function NoteEditor({ onBack }) {
  const { selectedNote, updateNote, deleteNote, categories } = useNotes()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Personal')

  // sync local state when selected note changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title)
      setContent(selectedNote.content)
      setCategory(selectedNote.category)
    }
  }, [selectedNote?._id])

  // auto-save with 500ms debounce
  useEffect(() => {
    if (!selectedNote) return
    const t = setTimeout(() => {
      updateNote(selectedNote._id, { title, content, category })
    }, 500)
    return () => clearTimeout(t)
  }, [title, content, category])

  const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length

  // Empty state
  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white/20 dark:bg-black/10">
        <div className="text-center space-y-3 opacity-40 px-8">
          <div className="text-6xl">📝</div>
          <h2 className="font-display font-bold text-xl text-slate-700 dark:text-slate-300">
            No Note Selected
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Pick a note from the list or create a new one
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white/25 dark:bg-black/10 backdrop-blur-sm">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/40 dark:border-white/10 gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">

          {/* Back button — mobile only */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden glass text-indigo-500 font-bold text-sm px-3 py-1.5 rounded-xl
                flex items-center gap-1.5 transition-all hover:border-indigo-300/50"
            >
              ← Back
            </button>
          )}

          {/* Category selector */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-indigo-400/30 transition-all
              ${categoryColors[category] || categoryColors.Others}`}
          >
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <span className="text-xs text-slate-400 font-medium hidden sm:block">
            {formatDate(selectedNote.updatedAt)}
          </span>
        </div>

        {/* Delete */}
        <button
          onClick={() => deleteNote(selectedNote._id)}
          className="text-xs font-bold text-red-400 bg-red-50 dark:bg-red-900/20
            border border-red-200/50 dark:border-red-800/50 px-3 py-1.5 rounded-xl
            hover:bg-red-100 dark:hover:bg-red-900/40 transition-all flex items-center gap-1.5"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full bg-transparent px-6 pt-6 pb-3 font-display font-bold
          text-2xl sm:text-3xl text-slate-800 dark:text-slate-100
          placeholder-slate-300 dark:placeholder-slate-600
          focus:outline-none tracking-tight"
      />

      {/* Divider */}
      <div className="mx-6 h-px bg-gradient-to-r from-indigo-200/60 via-purple-200/60 to-transparent dark:from-indigo-800/40 dark:via-purple-800/40" />

      {/* Content */}
      <textarea
        placeholder="Start writing your thoughts..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="flex-1 w-full bg-transparent px-6 py-4 text-sm text-slate-600 dark:text-slate-300
          placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none
          resize-none leading-relaxed font-medium"
      />

      {/* Bottom bar */}
      <div className="flex items-center gap-4 px-6 py-3 border-t border-white/40 dark:border-white/10">
        <span className="text-xs font-medium text-slate-400">{wordCount} words</span>
        <span className="text-xs font-medium text-slate-400">{content.length} chars</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Auto-saved</span>
        </div>
      </div>
    </div>
  )
}

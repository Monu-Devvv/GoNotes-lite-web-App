import { useNotes } from '../context/NotesContext'
import NoteCard from './NoteCard'
import SearchBar from './SearchBar'

export default function NoteList({ hidden }) {
  const { filteredNotes, activeCategory, addNote, loading } = useNotes()

  return (
    <div className={`
      flex flex-col h-full glass border-r border-white/50 dark:border-white/10
      w-full md:w-72 md:flex-shrink-0 md:h-screen
      ${hidden ? 'hidden md:flex' : 'flex'}
    `}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-800 dark:text-slate-100">
            {activeCategory}
          </h2>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
        <button
          onClick={addNote}
          className="w-8 h-8 gradient-btn text-white rounded-xl text-lg font-light
            flex items-center justify-center transition-all duration-200 md:hidden"
        >
          +
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <SearchBar />
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-16">
            <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-16">
            <span className="text-4xl opacity-30">🗒️</span>
            <p className="text-sm font-bold text-slate-400">No notes found</p>
            <button
              onClick={addNote}
              className="gradient-btn text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
            >
              Create one
            </button>
          </div>
        ) : (
          filteredNotes.map(note => <NoteCard key={note._id} note={note} />)
        )}
      </div>
    </div>
  )
}

import { useNotes } from '../context/NotesContext'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useNotes()

  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-slate-400 text-sm pointer-events-none">🔍</span>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full glass rounded-xl pl-9 pr-9 py-2.5 text-sm font-medium
          text-slate-700 dark:text-slate-200 placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-all"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 text-slate-400 hover:text-red-400 text-xs font-bold transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  )
}

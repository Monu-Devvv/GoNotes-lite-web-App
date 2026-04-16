import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { NotesProvider, useNotes } from './context/NotesContext'
import Sidebar from './components/Sidebar'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import AuthPage from './pages/AuthPage'

function AppLayout() {
  const { user } = useAuth()
  const { selectedNoteId, setSelectedNoteId, addNote } = useNotes()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // not logged in → show auth page
  if (!user) return <AuthPage />

  const noteOpen = selectedNoteId !== null

  return (
    <div className="h-screen w-screen bg-mesh overflow-hidden flex flex-col">

      {/* Mobile top bar */}
      <header className="md:hidden flex items-center justify-between px-4 h-14
        glass-strong border-b border-white/50 dark:border-white/10 flex-shrink-0 z-10">

        {/* Left: hamburger or back */}
        {noteOpen ? (
          <button
            onClick={() => setSelectedNoteId(null)}
            className="glass text-indigo-500 font-bold text-sm px-3 py-1.5 rounded-xl flex items-center gap-1"
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="glass w-9 h-9 rounded-xl flex flex-col items-center justify-center gap-1.5"
          >
            <span className="block w-4 h-0.5 bg-slate-600 dark:bg-slate-300 rounded" />
            <span className="block w-4 h-0.5 bg-slate-600 dark:bg-slate-300 rounded" />
            <span className="block w-4 h-0.5 bg-slate-600 dark:bg-slate-300 rounded" />
          </button>
        )}

        {/* Center title */}
        <span className="font-display font-bold text-lg gradient-text">
          {noteOpen ? 'Edit Note' : '📝 GoNotes'}
        </span>

        {/* Right: new note */}
        <button
          onClick={addNote}
          className="gradient-btn text-white font-bold w-9 h-9 rounded-xl flex items-center justify-center text-xl"
        >
          +
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Note list — hidden on mobile when a note is open */}
        <NoteList hidden={noteOpen} />

        {/* Note editor */}
        <div className={`
          flex-1 min-w-0 flex flex-col
          ${noteOpen ? 'flex' : 'hidden md:flex'}
        `}>
          <NoteEditor
            onBack={() => setSelectedNoteId(null)}
          />
        </div>

      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppLayout />
      </NotesProvider>
    </AuthProvider>
  )
}

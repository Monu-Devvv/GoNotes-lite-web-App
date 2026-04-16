import { useState } from 'react'
import { NotesProvider, useNotes } from './context/NotesContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Sidebar from './Components/Sidebar/SideBar'
import NoteList from './Components/NoteList/NoteList'
import NoteEditor from './Components/NoteEditor/NoteEditor'
import AuthPage from './pages/AuthPage'
import './App.css'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { addNote } = useNotes()
  const { user } = useAuth()

  // if not logged in show auth page
  if (!user) return <AuthPage />

  return (
    <div className="app">
      <div className="app__mobilebar">
        <button className="app__hamburger" onClick={() => setSidebarOpen(true)}>
          <span /><span /><span />
        </button>
        <span className="app__mobilebar-title">📝 My Notes</span>
        <button className="app__new-btn-mobile" onClick={addNote}>+</button>
      </div>

      <div
        className={`app__overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <NoteList />
      <NoteEditor />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppLayout />
      </NotesProvider>
    </AuthProvider>
  )
}

export default App
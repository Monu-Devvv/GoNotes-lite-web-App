import { createContext, useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  fetchNotes,
  createNote,
  updateNote as apiUpdateNote,
  deleteNote as apiDeleteNote,
} from '../api/notes'
import { useAuth } from './AuthContext'

const NotesContext = createContext()

export function NotesProvider({ children }) {
  const { user } = useAuth()

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // theme saved in localStorage so it persists
  const [isDark, setIsDark] = useLocalStorage('theme-dark', false)

  const categories = ['All', 'Personal', 'Work', 'Ideas', 'Others']

  // apply dark/light class to <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  function toggleTheme() { setIsDark(prev => !prev) }

  // load notes when user logs in, clear when logs out
  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true)
        const data = await fetchNotes()
        // always make sure we set an array (backend might return error object)
        setNotes(Array.isArray(data) ? data : [])
      } catch {
        setNotes([])
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadNotes()
    } else {
      setNotes([])
      setSelectedNoteId(null)
      setLoading(false)
    }
  }, [user])

  async function addNote() {
    try {
      const newNote = await createNote({
        title: 'Untitled Note',
        content: '',
        category: 'Personal',
      })
      if (newNote._id) {
        setNotes(prev => [newNote, ...prev])
        setSelectedNoteId(newNote._id)
      }
    } catch (err) {
      console.error('Failed to create note:', err)
    }
  }

  async function updateNote(id, changes) {
    try {
      const updated = await apiUpdateNote(id, changes)
      if (updated._id) {
        setNotes(prev => prev.map(n => n._id === id ? updated : n))
      }
    } catch (err) {
      console.error('Failed to update note:', err)
    }
  }

  async function deleteNote(id) {
    try {
      await apiDeleteNote(id)
      setNotes(prev => prev.filter(n => n._id !== id))
      if (selectedNoteId === id) setSelectedNoteId(null)
    } catch (err) {
      console.error('Failed to delete note:', err)
    }
  }

  const filteredNotes = notes.filter(note => {
    const matchSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchCategory =
      activeCategory === 'All' || note.category === activeCategory
    return matchSearch && matchCategory
  })

  const selectedNote = notes.find(n => n._id === selectedNoteId) || null

  return (
    <NotesContext.Provider value={{
      notes, filteredNotes, selectedNote, selectedNoteId, setSelectedNoteId,
      searchQuery, setSearchQuery, activeCategory, setActiveCategory,
      categories, addNote, updateNote, deleteNote,
      isDark, toggleTheme, loading,
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  return useContext(NotesContext)
}

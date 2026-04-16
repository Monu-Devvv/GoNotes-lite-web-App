import { createContext, useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  fetchNotes,
  createNote,
  updateNote as apiUpdateNote,
  deleteNote as apiDeleteNote
} from '../api/notes'
import { useAuth } from './AuthContext'

const NotesContext = createContext()

export function NotesProvider({ children }) {

  // get logged in user from AuthContext
  const { user } = useAuth()

  // all notes from MongoDB
  const [notes, setNotes] = useState([])

  // loading state for spinner
  const [loading, setLoading] = useState(true)

  // which note is currently open in editor
  const [selectedNoteId, setSelectedNoteId] = useState(null)

  // search input value
  const [searchQuery, setSearchQuery] = useState('')

  // which category is selected in sidebar
  const [activeCategory, setActiveCategory] = useState('All')

  // theme saved in localStorage
  const [isDark, setIsDark] = useLocalStorage('theme-dark', false)

  const categories = ['All', 'Personal', 'Work', 'Ideas', 'Others']

  // ── Apply dark/light theme to <html> ──
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    )
  }, [isDark])

  function toggleTheme() {
    setIsDark(prev => !prev)
  }

  // ── Load notes when user logs in, clear when logs out ──
  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true)
        const data = await fetchNotes()

        // backend might return error object instead of array
        // always make sure notes is an array
        setNotes(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load notes:', err)
        setNotes([]) // fallback to empty array
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      // user just logged in → fetch their notes
      loadNotes()
    } else {
      // user logged out → clear everything
      setNotes([])
      setSelectedNoteId(null)
      setLoading(false)
    }
  }, [user]) // runs every time user changes (login/logout)

  // ── Create a new note ──
  async function addNote() {
    try {
      const newNote = await createNote({
        title: 'Untitled Note',
        content: '',
        category: 'Personal',
      })

      // make sure we got a valid note back
      if (newNote._id) {
        // add to top of list
        setNotes(prev => [newNote, ...prev])
        // open it in editor
        setSelectedNoteId(newNote._id)
      }
    } catch (err) {
      console.error('Failed to create note:', err)
    }
  }

  // ── Update an existing note ──
  async function updateNote(id, changes) {
    try {
      const updated = await apiUpdateNote(id, changes)

      // make sure we got a valid note back
      if (updated._id) {
        // replace old note with updated one
        setNotes(prev =>
          prev.map(note => note._id === id ? updated : note)
        )
      }
    } catch (err) {
      console.error('Failed to update note:', err)
    }
  }

  // ── Delete a note ──
  async function deleteNote(id) {
    try {
      await apiDeleteNote(id)

      // remove from list
      setNotes(prev => prev.filter(note => note._id !== id))

      // deselect if deleted note was open
      if (selectedNoteId === id) setSelectedNoteId(null)
    } catch (err) {
      console.error('Failed to delete note:', err)
    }
  }

  // ── Filter notes by search query + active category ──
  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' || note.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // find the full selected note object by id
  const selectedNote = notes.find(note => note._id === selectedNoteId) || null

  return (
    <NotesContext.Provider
      value={{
        notes,
        filteredNotes,
        selectedNote,
        selectedNoteId,
        setSelectedNoteId,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        categories,
        addNote,
        updateNote,
        deleteNote,
        isDark,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  return useContext(NotesContext)
}
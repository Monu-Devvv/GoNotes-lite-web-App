import { createContext, useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  fetchNotes,
  createNote,
  updateNote as apiUpdateNote,
  deleteNote as apiDeleteNote
} from '../api/notes'

const NotesContext = createContext()

export function NotesProvider({ children }) {
  // notes now come from MongoDB, not localStorage
  const [notes, setNotes] = useState([])

  // loading state so UI can show spinner
  const [loading, setLoading] = useState(true)

  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // theme still uses localStorage (no backend needed for this)
  const [isDark, setIsDark] = useLocalStorage('theme-dark', false)

  const categories = ['All', 'Personal', 'Work', 'Ideas', 'Others']

  // Apply dark/light theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'dark' : 'light'
    )
  }, [isDark])

  function toggleTheme() { setIsDark(prev => !prev) }

  // ── Load all notes when app starts ──
  useEffect(() => {
    async function loadNotes() {
      try {
        setLoading(true)
        const data = await fetchNotes()
        setNotes(data)
      } catch (err) {
        console.error('Failed to load notes:', err)
      } finally {
        setLoading(false)
      }
    }
    loadNotes()
  }, [])

  // ── Create a new note ──
  async function addNote() {
    try {
      const newNote = await createNote({
        title: 'Untitled Note',
        content: '',
        category: 'Personal',
      })
      // add new note to top of list
      setNotes(prev => [newNote, ...prev])
      setSelectedNoteId(newNote._id)  // MongoDB uses _id not id
    } catch (err) {
      console.error('Failed to create note:', err)
    }
  }

  // ── Update an existing note ──
  async function updateNote(id, changes) {
    try {
      const updated = await apiUpdateNote(id, changes)
      // replace old note with updated one in state
      setNotes(prev =>
        prev.map(note => note._id === id ? updated : note)
      )
    } catch (err) {
      console.error('Failed to update note:', err)
    }
  }

  // ── Delete a note ──
  async function deleteNote(id) {
    try {
      await apiDeleteNote(id)
      // remove from state
      setNotes(prev => prev.filter(note => note._id !== id))
      // deselect if deleted note was selected
      if (selectedNoteId === id) setSelectedNoteId(null)
    } catch (err) {
      console.error('Failed to delete note:', err)
    }
  }

  // ── Filter notes by search + category ──
  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' || note.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // find the full selected note object
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
        loading,          // so components can show loading state
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  return useContext(NotesContext)
}
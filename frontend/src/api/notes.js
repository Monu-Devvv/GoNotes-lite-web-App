// Base URL of our backend
const BASE_URL = 'https://notes-app-backend-pnn6.onrender.com'

// Get all notes from database
export async function fetchNotes() {
  const res = await fetch(BASE_URL)
  return res.json()
}

// Create a new note in database
export async function createNote(noteData) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData)
  })
  return res.json()
}

// Update an existing note by its id
export async function updateNote(id, changes) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes)
  })
  return res.json()
}

// Delete a note by its id
export async function deleteNote(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
}
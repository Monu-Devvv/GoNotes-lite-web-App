import Note from '../models/Note.js'

// GET /api/notes — fetch all notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' })
  }
}

// POST /api/notes — create a new note
export async function createNote(req, res) {
  try {
    const note = await Note.create(req.body)
    res.status(201).json(note)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' })
  }
}

// PUT /api/notes/:id — update a note
export async function updateNote(req, res) {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // return updated note
    )
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json(note)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' })
  }
}

// DELETE /api/notes/:id — delete a note
export async function deleteNote(req, res) {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json({ message: 'Note deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' })
  }
}
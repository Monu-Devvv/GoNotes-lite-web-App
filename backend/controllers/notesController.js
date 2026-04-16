import Note from '../models/Note.js'

// GET /api/notes — only get notes of logged in user
export async function getAllNotes(req, res) {
  try {
    // req.userId comes from JWT middleware
    const notes = await Note.find({ user: req.userId }).sort({ updatedAt: -1 })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' })
  }
}

// POST /api/notes
export async function createNote(req, res) {
  try {
    // attach logged in user to the note
    const note = await Note.create({ ...req.body, user: req.userId })
    res.status(201).json(note)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' })
  }
}

// PUT /api/notes/:id
export async function updateNote(req, res) {
  try {
    // make sure user can only update their own notes
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    )
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json(note)
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' })
  }
}

// DELETE /api/notes/:id
export async function deleteNote(req, res) {
  try {
    // make sure user can only delete their own notes
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId })
    if (!note) return res.status(404).json({ message: 'Note not found' })
    res.json({ message: 'Note deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' })
  }
}
import express from 'express'
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notesController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// protect middleware runs before every notes route
// it checks the JWT token first
router.get('/',       protect, getAllNotes)
router.post('/',      protect, createNote)
router.put('/:id',    protect, updateNote)
router.delete('/:id', protect, deleteNote)

export default router
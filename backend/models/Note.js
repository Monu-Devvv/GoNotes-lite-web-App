import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    title:    { type: String, default: 'Untitled Note' },
    content:  { type: String, default: '' },
    category: { type: String, default: 'Personal' },
  },
  { timestamps: true }  // auto adds createdAt & updatedAt
)

export default mongoose.model('Note', noteSchema)
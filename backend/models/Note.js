import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    title:    { type: String, default: 'Untitled Note' },
    content:  { type: String, default: '' },
    category: { type: String, default: 'Personal' },
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Note', noteSchema)
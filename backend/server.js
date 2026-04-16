process.on('uncaughtException', (err) => {
  console.error('CRASH:', err.message)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err.message)
  process.exit(1)
})

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import notesRouter from './routes/notes.js'
import authRouter from './routes/auth.js'         
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/auth',  authRouter)                
app.use('/api/notes', notesRouter)

app.get('/', (req, res) => res.send('Notes API running ✅'))
app.use(errorHandler)

try {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected ✅')
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000} ✅`)
  )
} catch (err) {
  console.error('MongoDB connection failed ❌', err.message)
  process.exit(1)
}
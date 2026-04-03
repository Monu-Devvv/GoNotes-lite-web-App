import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import notesRouter from './routes/notes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }))  // allow React app
app.use(express.json())                              // parse JSON body

// Routes
app.use('/api/notes', notesRouter)

// Health check
app.get('/', (req, res) => res.send('Notes API running ✅'))

// Error handler (always last)
app.use(errorHandler)

// Connect DB then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅')
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT} ✅`)
    )
  })
  .catch(err => console.error('MongoDB connection failed ❌', err))
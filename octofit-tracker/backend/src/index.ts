import express from 'express'
import mongoose from 'mongoose'

const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
  })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB at ${mongoUri}`)
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection failed:', error)
  })

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`)
})
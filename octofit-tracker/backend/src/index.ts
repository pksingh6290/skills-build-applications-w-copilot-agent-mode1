import express from 'express'
import mongoose from 'mongoose'
import { Activity } from './models/activity.js'
import { LeaderboardEntry } from './models/leaderboard.js'
import { Team } from './models/team.js'
import { User } from './models/user.js'
import { Workout } from './models/workout.js'

const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

const app = express()

app.use(express.json())

app.get('/api/users/', async (_request, response) => {
  const items = await User.find().sort({ name: 1 }).lean()
  response.json({ resource: 'users', baseUrl, items })
})

app.get('/api/teams/', async (_request, response) => {
  const items = await Team.find().sort({ name: 1 }).lean()
  response.json({ resource: 'teams', baseUrl, items })
})

app.get('/api/activities/', async (_request, response) => {
  const items = await Activity.find().sort({ performedAt: -1 }).lean()
  response.json({ resource: 'activities', baseUrl, items })
})

app.get('/api/leaderboard/', async (_request, response) => {
  const items = await LeaderboardEntry.find().sort({ rank: 1 }).lean()
  response.json({ resource: 'leaderboard', baseUrl, items })
})

app.get('/api/workouts/', async (_request, response) => {
  const items = await Workout.find().sort({ completedAt: -1 }).lean()
  response.json({ resource: 'workouts', baseUrl, items })
})

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl,
  })
})

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri)
    console.log(`Connected to MongoDB at ${mongoUri}`)

    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${baseUrl}`)
    })
  } catch (error: unknown) {
    console.error('MongoDB connection failed:', error)
    process.exitCode = 1
  }
}

void startServer()
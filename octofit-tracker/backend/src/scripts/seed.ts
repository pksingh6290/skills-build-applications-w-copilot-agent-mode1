import mongoose from 'mongoose'
import { Activity } from '../models/activity.js'
import { LeaderboardEntry } from '../models/leaderboard.js'
import { Team } from '../models/team.js'
import { User } from '../models/user.js'
import { Workout } from '../models/workout.js'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'

const seed = async () => {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUri)

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ])

  const teams = await Team.create([
    {
      name: 'Lightning Leopards',
      captain: 'Ava Johnson',
      members: ['Ava Johnson', 'Noah Smith', 'Mia Chen'],
      totalPoints: 1240,
    },
    {
      name: 'River Raptors',
      captain: 'Liam Brown',
      members: ['Liam Brown', 'Sophia Davis', 'Ethan Miller'],
      totalPoints: 1185,
    },
  ])

  const users = await User.create([
    {
      name: 'Ava Johnson',
      email: 'ava.johnson@octofit.example',
      grade: 10,
      teamId: teams[0]._id,
      points: 425,
    },
    {
      name: 'Noah Smith',
      email: 'noah.smith@octofit.example',
      grade: 11,
      teamId: teams[0]._id,
      points: 390,
    },
    {
      name: 'Liam Brown',
      email: 'liam.brown@octofit.example',
      grade: 9,
      teamId: teams[1]._id,
      points: 410,
    },
  ])

  await Activity.create([
    {
      userId: users[0]._id,
      type: 'Running',
      minutes: 35,
      calories: 320,
      performedAt: new Date('2026-06-18T17:30:00.000Z'),
      notes: 'Evening 5K training run',
    },
    {
      userId: users[1]._id,
      type: 'Strength Training',
      minutes: 40,
      calories: 280,
      performedAt: new Date('2026-06-19T16:00:00.000Z'),
      notes: 'Upper body circuit and core work',
    },
    {
      userId: users[2]._id,
      type: 'Cycling',
      minutes: 50,
      calories: 410,
      performedAt: new Date('2026-06-20T08:15:00.000Z'),
      notes: 'Morning endurance ride',
    },
  ])

  await LeaderboardEntry.create([
    {
      userId: users[0]._id,
      userName: users[0].name,
      rank: 1,
      points: 425,
      period: 'monthly',
    },
    {
      userId: users[2]._id,
      userName: users[2].name,
      rank: 2,
      points: 410,
      period: 'monthly',
    },
    {
      userId: users[1]._id,
      userName: users[1].name,
      rank: 3,
      points: 390,
      period: 'monthly',
    },
  ])

  await Workout.create([
    {
      userId: users[0]._id,
      name: 'Speed intervals',
      category: 'Cardio',
      durationMinutes: 30,
      intensity: 'High',
      completedAt: new Date('2026-06-18T17:30:00.000Z'),
    },
    {
      userId: users[1]._id,
      name: 'Full body circuit',
      category: 'Strength',
      durationMinutes: 45,
      intensity: 'Moderate',
      completedAt: new Date('2026-06-19T16:00:00.000Z'),
    },
    {
      userId: users[2]._id,
      name: 'Endurance ride',
      category: 'Cycling',
      durationMinutes: 50,
      intensity: 'High',
      completedAt: new Date('2026-06-20T08:15:00.000Z'),
    },
  ])

  console.log('Seed complete')

  await mongoose.disconnect()
}

void seed().catch((error: unknown) => {
  console.error('Seed failed:', error)
  process.exitCode = 1
})
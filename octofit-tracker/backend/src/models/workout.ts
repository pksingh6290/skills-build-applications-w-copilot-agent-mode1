import { Schema, model } from 'mongoose'

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

export const Workout = model('Workout', workoutSchema)
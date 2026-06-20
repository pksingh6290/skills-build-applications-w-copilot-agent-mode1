import { Schema, model } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    captain: { type: String, required: true },
    members: [{ type: String, required: true }],
    totalPoints: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
)

export const Team = model('Team', teamSchema)
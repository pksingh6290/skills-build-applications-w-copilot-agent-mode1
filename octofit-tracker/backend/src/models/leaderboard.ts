import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { timestamps: true },
)

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema)
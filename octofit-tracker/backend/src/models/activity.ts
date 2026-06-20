import { Schema, model } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    calories: { type: Number, required: true },
    performedAt: { type: Date, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
)

export const Activity = model('Activity', activitySchema)
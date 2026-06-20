import mongoose from 'mongoose'

export const port = Number(process.env.PORT ?? 8000)
export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
export const codespaceName = process.env.CODESPACE_NAME
export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

export const connectDatabase = async () => {
  await mongoose.connect(mongoUri)
}
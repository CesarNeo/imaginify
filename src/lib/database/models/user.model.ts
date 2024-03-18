import { Document, model, models, Schema } from 'mongoose'

type User = Document & {
  clerkId: string
  username: string
  email: string
  photo?: string
  firstName?: string
  lastName?: string
  planId?: number
  creditBalance?: number
  createdAt?: Date
  updatedAt?: Date
}

const UserSchema = new Schema({
  clerkId: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  photo: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  creditBalance: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const User = models?.User || model('User', UserSchema)

export default User

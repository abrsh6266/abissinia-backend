import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  role: string;  // Add role attribute
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, default: "user" },  // Default role is "user"
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);

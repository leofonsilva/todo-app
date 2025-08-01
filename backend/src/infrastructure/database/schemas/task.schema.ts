import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending', 'done'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});
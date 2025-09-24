import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
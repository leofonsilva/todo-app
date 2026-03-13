import { minLength } from 'class-validator';
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  createdAt: { type: Date, default: Date.now },
});

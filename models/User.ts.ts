import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../interfaces/userInterface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

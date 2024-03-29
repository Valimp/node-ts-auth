import { Document } from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    // You can add other fields here as needed
  }
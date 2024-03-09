import { Document } from "mongoose";

export interface JWTDocument extends Document {
    token: string;
    userId: string;
    createdAt: Date;
}
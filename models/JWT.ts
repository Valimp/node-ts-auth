import mongoose, { Schema } from "mongoose";
import { JWTDocument } from "../interfaces/jwtInterface";

const jwtSchema: Schema = new Schema({
    token: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now, 
        expires: 3600 
    }
});

export const JWTModel = mongoose.model<JWTDocument>('JWT', jwtSchema);
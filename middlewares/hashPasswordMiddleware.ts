import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export async function hashPasswordMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
};



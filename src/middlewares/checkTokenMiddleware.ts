import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../const/config';

interface CustomRequest extends Request {
    user?: any;
}

export async function checkTokenMiddleware(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('Access Denied');
    } else {
        try {
            const verified = jwt.verify(token, JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            res.status(400).send('Invalid Token');
        }
    }
};
import { Request, Response, NextFunction } from 'express';

export async function validateUsernameMiddleware(req: Request, res: Response, next: NextFunction) {
    const { username } = req.body;

    // Check if the name is provided
    if (!username) {
        res.status(400).json({ message: "Name is required" });
    }

    // Check if the name is valid (only letters, spaces, and numbers between 2 and 30 characters)
    if (!/^[A-Za-z0-9\s]{2,30}$/.test(username)) {
        return res.status(400).json({ message: "Name is not valid" });
    }

    next();
}

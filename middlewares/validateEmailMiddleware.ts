import { Request, Response, NextFunction } from 'express';

export async function validateEmailMiddleware(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
        res.status(400).json({ message: "Email is required" });
    }

    // Check if the email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Email is not valid" });
    }

    next(); // Passer au middleware suivant si le mot de passe est assez fort
}

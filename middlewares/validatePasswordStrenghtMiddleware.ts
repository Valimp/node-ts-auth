import { Request, Response, NextFunction } from 'express';

export async function validatePasswordStrengthMiddleware(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    // Check if the password is provided
    if (!password) {
        res.status(400).json({ message: "Password is required" });
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must have more than 8 caracters" });
    }

    // Check if the password contains at least one special character
    if (!/[^A-Za-z0-9]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one special character" });
    }

    // Check if the password contains at least one number
    if (!/[0-9]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one number" });
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one lowercase letter" });
    }

    next(); // Passer au middleware suivant si le mot de passe est assez fort
}

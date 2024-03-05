import bcrypt from 'bcrypt';


export async function comparePasswordMiddleware(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
};
import { Request, Response, NextFunction } from 'express';
import { info } from '../const/logging';

export function logRequestMiddleware(req: Request, res: Response, next: NextFunction, namespace: string): void {
    info(`${namespace}`, `${req.method} ${req.path}`);
    next();
};
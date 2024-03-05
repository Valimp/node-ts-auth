import { Request, Response } from 'express';
import { UserModel } from '../models/User';
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentification routes
 */

export class AuthController {
    
    /**
     * @swagger
     * /auth/status:
     *  get:
     *     summary: Checkout if the routes are working
     *     description: Check if auth routes are working
     *     tags: [Auth]   
     *     responses:
     *      200:
     *       description: Success
     *      400: 
     *       description: Bad request
     * 
     */
    public async status(req: Request, res: Response): Promise<void> {
        res.send('auth routes are working!');
    }

    /**
     * @swagger
     * /register:
     *   post:
     *     summary: Register a new user
     *     description: Register a new user with the provided username, email, and password.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       '201':
     *         description: Successfully registered a new user
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *       '400':
     *         description: Bad request or registration failed
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: fail
     *                 error:
     *                   type: string
     */
    public async register(req: Request, res: Response): Promise<void> {        
        try {
            const { username, email, password } = req.body;
            const user = await UserModel.create({ username: username , email: email, password: password });
            res.status(201).json({ status: 'success', user });
        } catch (error) {
            res.status(400).json({ status: 'fail', error });
        }
    }

}
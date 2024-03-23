import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../const/config';
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

    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Login a new user
     *     description: Login a user with the provided email, and password and create a token for the user.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Successfully logged in a user
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *       '401':
     *         description: Invalid password
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
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                res.status(404).json({ status: 'fail', error: 'User not found' });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {

                    const payload = {
                        userId: user._id,
                        username: user.username,
                        role: user.role
                    };
                    const secretKey = JWT_SECRET;
                    const options = { expiresIn: '1h' };
                    const token = jwt.sign(payload, secretKey, options);

                    // send the token to the client with a cookie
                    res.cookie('token', token, { httpOnly: true });
                    // send the user data to the client
                    res.status(200).json({ status: 'success', user });
                    
                } else {
                    res.status(401).json({ status: 'fail', error: 'Invalid password' });
                }
            }
        } catch (error) {
            res.status(400).json({ status: 'fail', error });
        }
    }

    /**
     * @swagger
     * /changepassword:
     *   post:
     *     summary: change password of a user
     *     description: change password of a user with the provided email, and password and create a token for the user.
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       '200':
     *         description: Successfully changed password of a user
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *       '404':
     *         description: User not found
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
    public async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email });  
            if (!user) {
                res.status(404).json({ status: 'fail', error: 'User not found' });
            } else {
                user.password = password;
                await user.save();
                res.status(200).json({ status: 'success', user });
            } 
        } catch (error) {
            res.status(400).json({ status: 'fail', error });
        }
    }
}
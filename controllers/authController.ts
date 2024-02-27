import { Request, Response } from 'express';

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

}
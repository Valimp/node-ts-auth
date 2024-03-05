import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();
const authController = new AuthController();

// Check if the routes are working
router.get('/status', authController.status);

// Register
router.post('/register', authController.register);

export default router;
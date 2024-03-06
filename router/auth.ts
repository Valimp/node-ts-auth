import express from 'express';
import { AuthController } from '../controllers/authController';

// Midelwares imports
import { hashPasswordMiddleware } from '../middlewares/hashPasswordMiddleware';
import { validatePasswordStrengthMiddleware } from '../middlewares/validatePasswordStrenghtMiddleware';
import { validateEmailMiddleware } from '../middlewares/validateEmailMiddleware';

const router = express.Router();
const authController = new AuthController();

// Check if the routes are working
router.get('/status', authController.status);

// Register
router.post('/register', validateEmailMiddleware, validatePasswordStrengthMiddleware, hashPasswordMiddleware, authController.register);

export default router;
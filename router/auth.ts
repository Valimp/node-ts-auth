import express from 'express';
import { AuthController } from '../controllers/authController';

// Midelwares imports
import { hashPasswordMiddleware } from '../middlewares/hashPasswordMiddleware';
import { validatePasswordStrengthMiddleware } from '../middlewares/validatePasswordStrenghtMiddleware';
import { validateEmailMiddleware } from '../middlewares/validateEmailMiddleware';
import { validateNameMiddleware } from '../middlewares/validateNameMiddleware';

const router = express.Router();
const authController = new AuthController();

// Check if the routes are working
router.get('/status', authController.status);

// Register
router.post('/register', validateNameMiddleware, validateEmailMiddleware, validatePasswordStrengthMiddleware, hashPasswordMiddleware, authController.register);

export default router;
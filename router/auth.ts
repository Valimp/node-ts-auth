import express from 'express';
import { AuthController } from '../controllers/authController';

// Midelwares imports
import { hashPasswordMiddleware } from '../middlewares/hashPasswordMiddleware';
import { validatePasswordStrengthMiddleware } from '../middlewares/validatePasswordStrenghtMiddleware';
import { validateEmailMiddleware } from '../middlewares/validateEmailMiddleware';
import { validateUsernameMiddleware } from '../middlewares/validateUsernameMiddleware';
import { comparePasswordMiddleware } from '../middlewares/comparePasswordMiddleware';

const router = express.Router();
const authController = new AuthController();

// Check if the routes are working
router.get('/status', authController.status);

// Register
router.post('/register', validateUsernameMiddleware, validateEmailMiddleware, validatePasswordStrengthMiddleware, hashPasswordMiddleware, authController.register);

// Login with comparePasswordMiddleware
router.post('/login', authController.login);


export default router;
import express from 'express';
import { AuthController } from '../controllers/authController';

// Midelwares imports
import { hashPasswordMiddleware } from '../middlewares/hashPasswordMiddleware';
import { validatePasswordStrengthMiddleware } from '../middlewares/validatePasswordStrenghtMiddleware';
import { validateEmailMiddleware } from '../middlewares/validateEmailMiddleware';
import { validateUsernameMiddleware } from '../middlewares/validateUsernameMiddleware';
import { checkTokenMiddleware } from '../middlewares/checkTokenMiddleware';
import { logRequestMiddleware } from '../middlewares/logRequestMiddleware';

const router = express.Router();
const authController = new AuthController();
const NAMESPACE = 'auth';

// Log the request
router.use((req, res, next) => logRequestMiddleware(req, res, next, NAMESPACE));

// Check if the routes are working
router.get('/status', authController.status);

// Register
router.post('/register', validateUsernameMiddleware, validateEmailMiddleware, validatePasswordStrengthMiddleware, hashPasswordMiddleware, authController.register);

// Login with jwt
router.post('/login', authController.login);

// Change password
router.post('/changepassword', checkTokenMiddleware, validatePasswordStrengthMiddleware, hashPasswordMiddleware, authController.changePassword);

export default router;
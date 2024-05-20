import { Router } from 'express';
import { login, register, verifyToken } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-token', verifyToken);

export default router;
    
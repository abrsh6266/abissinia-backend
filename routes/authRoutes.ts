import { Router } from 'express';
import { deleteUser, editUser, login, register,verifyToken as verifyToken2 } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-token', verifyToken2);

//protected routes
router.put('/user/:id', verifyToken, editUser);
router.delete('/user/:id', verifyToken, deleteUser);


export default router;
    
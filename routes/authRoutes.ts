import { Router } from 'express';
import { deleteUser, editUser, login, register, verifyToken } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-token', verifyToken);

//protected routes
router.put('/user/:id', verifyToken, editUser);
router.delete('/user/:id', verifyToken, deleteUser);


export default router;
    
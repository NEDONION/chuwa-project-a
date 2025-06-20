import express from 'express';
import { registerUser, loginUser, getAllUsers, checkAuth } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', loginUser);
router.get('/all', getAllUsers);
router.get('/check-auth', protect, checkAuth);

export default router;
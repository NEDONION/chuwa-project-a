import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', loginUser);
router.get('/all', getAllUsers); 

export default router;
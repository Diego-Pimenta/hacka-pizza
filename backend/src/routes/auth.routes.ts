import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';
import { protectAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', AuthController.validateLoginData, AuthController.login);
router.get('/user', protectAuth, AuthController.getUser);

export default router;

import { Router } from 'express';

import RegisterController from '../controllers/api/Auth/Register';
import LoginController from '../controllers/api/Auth/Login';
import LogoutContainer from '../controllers/api/Auth/Logout';
import auth from '../middlewares/Authorization';

const router = Router();

router.post('/auth/register', RegisterController.perform);
router.post('/auth/login', LoginController.perform);
router.post('/auth/logout', auth, LogoutContainer.single);

export default router;

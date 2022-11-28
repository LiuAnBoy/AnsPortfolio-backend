import { Router } from 'express';

import RegisterController from '../controllers/api/Auth/Register';
import LoginController from '../controllers/api/Auth/Login';
import LogoutContainer from '../controllers/api/Auth/Logout';
import auth from '../middlewares/Authorization';

const authRouter = Router();

authRouter.post('/auth/register', RegisterController.perform);
authRouter.post('/auth/login', LoginController.perform);
authRouter.post('/auth/logout', auth, LogoutContainer.single);
authRouter.post('/auth/logoutAll', auth, LogoutContainer.all);

export default authRouter;

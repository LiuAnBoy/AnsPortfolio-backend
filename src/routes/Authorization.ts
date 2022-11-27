import { Router } from 'express';

import RegisterController from '../controllers/api/Auth/Register';
import LoginController from '../controllers/api/Auth/Login';
import LogoutContainer from '../controllers/api/Auth/Logout';
import auth from '../middlewares/Authorization';

const authRouter = Router();

authRouter.post('/register', RegisterController.perform);
authRouter.post('/login', LoginController.perform);
authRouter.post('/logout', auth, LogoutContainer.single);
authRouter.post('/logoutAll', auth, LogoutContainer.all);

export default authRouter;

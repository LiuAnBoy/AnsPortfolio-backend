import { Router } from 'express';

// import Locals from '../providers/Locals';

import RegisterController from '../controllers/api/Auth/Register';
import LoginController from '../controllers/api/Auth/Login';

const router = Router();

router.post('/auth/register', RegisterController.perform);
router.post('/auth/login', LoginController.perform);

export default router;

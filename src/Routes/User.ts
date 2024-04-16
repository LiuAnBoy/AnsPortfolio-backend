import { Router } from 'express';

import User from '../Controller/API/User';
import auth from '../Middleware/User';

const router = Router();

router.get('/me', auth, User.getUser);

router.post('/register', User.Register);
router.post('/login', User.Login);

router.put('/me', auth, User.updateUser);

export default router;

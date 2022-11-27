import { Router } from 'express';

import authRouter from './Authorization';

const router = Router();

router.use('/auth', authRouter);

export default router;

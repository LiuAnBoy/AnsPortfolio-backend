import { Router } from 'express';

import authRouter from './Authorization';
import projectRouter from './Project';

const router = Router();

router.use('/auth', authRouter);
router.use(projectRouter);

export default router;

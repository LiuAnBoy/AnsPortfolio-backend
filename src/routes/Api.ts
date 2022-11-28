import { Router } from 'express';

import authRouter from './Authorization';
import projectRouter from './Project';
import tagRouter from './Tag';

const router = Router();

router.use(authRouter);
router.use(projectRouter);
router.use(tagRouter);

export default router;

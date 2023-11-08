import { Router } from 'express';

import authRouter from './Authorization';
import mailRouter from './Mail';
import projectRouter from './Project';
import tagRouter from './Tag';

const router = Router();

router.use(authRouter);
router.use(projectRouter);
router.use(tagRouter);

router.use(mailRouter);

export default router;

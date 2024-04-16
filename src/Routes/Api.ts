import { Router } from 'express';

import ProjectRouter from './Project';
import TagRouter from './Tag';

const router = Router();

router.use('/', ProjectRouter);

router.use('/', TagRouter);

export default router;

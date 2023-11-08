import { Router } from 'express';

import Mail from '../controllers/api/Mail';

const mailRouter = Router();

mailRouter.post('/mailto', Mail.send);

export default mailRouter;

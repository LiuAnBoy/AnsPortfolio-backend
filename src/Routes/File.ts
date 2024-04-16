import { Router } from 'express';

import File from '../Controller/API/File';
import auth from '../Middleware/User';

const router = Router();

router.get('/upload/images', File.getImageList);

router.post('/upload/image', File.uploadImage);
router.post('/upload/avatar', File.uploadAvatarImage);

router.put('/upload/image/:id', File.updateImage);

router.delete('/upload/image', File.destroyImage);

export default router;

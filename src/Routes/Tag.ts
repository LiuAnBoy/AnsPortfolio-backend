import { Router } from 'express';

import Tag from '../Controller/API/Tag';
import auth from '../Middleware/User';

const router = Router();

router.get('/tags', Tag.getAllTags);

router.post('/tag', auth, Tag.createTag);

router.put('/tag/:id', auth, Tag.updateTag);

router.delete('/tag/:id', auth, Tag.deleteTag);

export default router;

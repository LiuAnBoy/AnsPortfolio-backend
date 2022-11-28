import { Router } from 'express';

import Tag from '../controllers/api/Tag';
import auth from '../middlewares/Authorization';

const tagRouter = Router();

tagRouter.get('/tags', Tag.getAllTags);
tagRouter.put('/tag/:id', auth, Tag.updateTagsById);
tagRouter.delete('/tag/:id', auth, Tag.deleteTagsById);

export default tagRouter;

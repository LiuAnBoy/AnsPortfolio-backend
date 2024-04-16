import { Router } from 'express';

import Project from '../Controller/API/Project';
import auth from '../Middleware/User';

const router = Router();

router.get('/projects', Project.getAllProjects);
router.get('/project/:id', Project.getProjectById);

router.post('/project', auth, Project.createProject);

router.put('/project/:id', auth, Project.updateProject);

router.patch('/project/featured/:id', auth, Project.updateProjectFeatured);

router.delete('/project/:id', auth, Project.deleteProject);

export default router;

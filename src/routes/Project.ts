import { Router } from 'express';

import Project from '../controllers/api/Projects';
import auth from '../middlewares/Authorization';

const projectRouter = Router();

projectRouter.get('/projects', Project.getAllProjects);
projectRouter.get('/project/:number', Project.getProjectsByNumber);

projectRouter.post('/project', auth, Project.createProject);

projectRouter.put('/project/:number', auth, Project.updateProjectByNumber);

projectRouter.patch(
  '/project/featured/:number',
  auth,
  Project.updateFeaturedByNumber
);

projectRouter.delete('/project/:number', auth, Project.deleteProjectByNumber);

export default projectRouter;

import RoutesProps from '../../domain/Route/RouteProps';

import ProjectPage from '../../pages/Project';
import ProjectCreateForm from '../../pages/Project/ProjectCreateForm';
import ProjectEditForm from '../../pages/Project/ProjectEditForm';

const projectRoutes: RoutesProps[] = [
  {
    path: '/project',
    view: ProjectPage,
  },
  {
    path: '/project/create/:number',
    view: ProjectCreateForm,
  },
  {
    path: '/project/edit/:number',
    view: ProjectEditForm,
  },
];

export default projectRoutes;

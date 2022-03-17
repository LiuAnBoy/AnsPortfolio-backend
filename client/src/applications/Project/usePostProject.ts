import { ProjectProps } from '../../domain/Project/ProjectProps';
import { requestPostProject } from '../../services/projects/postProjectService';

function usePostProject() {
  const postProject = async (params: ProjectProps) => {
    const res = await requestPostProject(params);
    if (res?.status === 200) {
      return true;
    }
    return false;
  };

  return {
    postProject,
  };
}

export default usePostProject;

import { ProjectProps } from '../../domain/Project/ProjectProps';
import {
  requestPatchFeaturedProject,
  requestPatchProject,
} from '../../services/projects/patchProjectService';

function usePatchProject() {
  const patchFeaturedProject = async (id: string, checked: boolean) => {
    const res = await requestPatchFeaturedProject(id, checked);
    if (res?.status === 200) {
      return true;
    }
    return false;
  };

  const updateProjectByNumber = async (id: string, params: ProjectProps) => {
    const res = await requestPatchProject(id, params);
    if (res?.status === 200) {
      return true;
    }
    return false;
  };

  return { patchFeaturedProject, updateProjectByNumber };
}

export default usePatchProject;

import { requestDeleteProject } from '../../services/projects/deleteProjectService';

function useDeleteProject() {
  const deleteProject = async (id: string) => {
    const res = await requestDeleteProject(id);
    if (res?.status === 200) {
      return true;
    }
    return false;
  };

  return {
    deleteProject,
  };
}

export default useDeleteProject;

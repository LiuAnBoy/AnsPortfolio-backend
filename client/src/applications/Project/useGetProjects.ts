import { useEffect, useState } from 'react';
import { ProjectProps } from '../../domain/Project/ProjectProps';
import {
  requestGetAllProjects,
  requestGetProjectByNo,
} from '../../services/projects/getProjectService';

function useGetProjects() {
  const [projectList, setProjectList] = useState<ProjectProps[]>([]);

  const getAllProjects = async () => {
    const res = await requestGetAllProjects();
    if (res?.status === 200) {
      setProjectList(res.data);
    }
  };

  const getProjectDetail = async (no: string) => {
    const res = await requestGetProjectByNo(no);
    if (res?.status === 200) {
      return res.data;
    }
    return false;
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return {
    projectList,
    getAllProjects,
    getProjectDetail,
  };
}

export default useGetProjects;

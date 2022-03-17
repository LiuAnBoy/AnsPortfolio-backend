import { getRequest } from '../api';
import { ProjectProps } from '../../domain/Project/ProjectProps';
import { AxiosResponse, AxiosError } from 'axios';

export const requestGetAllProjects = async () => {
  const url = '/api/projects';

  try {
    const res: AxiosResponse<ProjectProps[]> = await getRequest(url);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const requestGetProjectByNo = async (no: string) => {
  const url = `/api/project/${no}`;

  try {
    const res: AxiosResponse<ProjectProps> = await getRequest(url);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

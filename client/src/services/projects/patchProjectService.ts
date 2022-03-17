import { patchRequest } from '../api';
import { ProjectProps } from '../../domain/Project/ProjectProps';
import { AxiosResponse, AxiosError } from 'axios';

export const requestPatchFeaturedProject = async (id: string, checked: boolean) => {
  const url = `/api/project/featured/${id}`;

  const params = {
    featured: checked,
  };

  try {
    const res: AxiosResponse<ProjectProps> = await patchRequest(url, params);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const requestPatchProject = async (id: string, params: ProjectProps) => {
  const url = `/api/project/${id}`;

  try {
    const res: AxiosResponse<ProjectProps> = await patchRequest(url, params);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

import { AxiosResponse, AxiosError } from 'axios';
import { ProjectProps } from '../../domain/Project/ProjectProps';
import { postRequest } from '../api';

export const requestPostProject = async (params: ProjectProps) => {
  const url = '/api/project';

  try {
    const res: AxiosResponse = await postRequest(url, params);

    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

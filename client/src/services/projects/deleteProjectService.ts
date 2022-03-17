import { AxiosError, AxiosResponse } from 'axios';
import { deleteRequest } from '../api';

export const requestDeleteProject = async (id: string) => {
  const url = `/api/project/${id}`;

  try {
    const res: AxiosResponse = await deleteRequest(url);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

import { getRequest } from '../api';
import { AxiosResponse, AxiosError } from 'axios';
import { TagProps } from '../../domain/Tag/TagProps';

export const requestGetAllTags = async () => {
  const url = '/api/tags';

  try {
    const res: AxiosResponse<TagProps[]> = await getRequest(url);
    return res;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

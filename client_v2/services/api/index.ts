import axios from 'axios';

export const getRequest = async (apiRoute: string, bodyParams?: string) => {
  let params;

  if (!bodyParams) {
    params = null;
  } else {
    params = bodyParams;
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return axios.get(apiRoute, {
    headers,
    params,
  });
};

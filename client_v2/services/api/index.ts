import axios from 'axios';

export function getRequest(apiRoute: string, bodyParams?: string) {
  let params;
  if (!bodyParams) {
    params = null;
  } else {
    params = bodyParams;
  }
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params,
  };

  return axios.get(apiRoute, config);
}

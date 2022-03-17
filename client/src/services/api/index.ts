import axios, { AxiosRequestConfig } from 'axios';

export const getRequest = async (apiRoute: string, bodyParams?: any) => {
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
};

export const postRequest = async (apiRoute: string, bodyParams?: any) => {
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
  };

  return axios.post(apiRoute, params, config);
};

export const patchRequest = async (apiRoute: string, bodyParams?: any) => {
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
  };

  return axios.patch(apiRoute, params, config);
};

export const deleteRequest = async (apiRoute: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return axios.delete(apiRoute, config);
};

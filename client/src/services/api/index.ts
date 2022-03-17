import axios, { AxiosRequestConfig } from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.luansportfolio.com/'
    : 'http://localhost:8000';

export const getRequest = async (apiRoute: string, bodyParams?: any) => {
  const url = baseUrl + apiRoute;

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

  return axios.get(url, config);
};

export const postRequest = async (apiRoute: string, bodyParams?: any) => {
  const url = baseUrl + apiRoute;

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

  return axios.post(url, params, config);
};

export const patchRequest = async (apiRoute: string, bodyParams?: any) => {
  const url = baseUrl + apiRoute;

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

  return axios.patch(url, params, config);
};

export const deleteRequest = async (apiRoute: string) => {
  const url = baseUrl + apiRoute;

  const config: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return axios.delete(url, config);
};

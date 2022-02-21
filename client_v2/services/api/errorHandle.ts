import { AxiosError } from 'axios';

//TODO: Error handler

const errorHandle = ({ code, response }: AxiosError) => {
  // const code = error.response?.status;
  if (code === 404) {
    return {
      message: error.response?.data.message,
      status: error.response?.status,
    };
  }

  return {
    message: error.response?.data.message,
    status: error.response?.status,
  };
};

export default errorHandle;

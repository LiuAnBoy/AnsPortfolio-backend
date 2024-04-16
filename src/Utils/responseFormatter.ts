import { Response } from 'express';

const responseFormatter = ({
  res,
  status,
  message,
  data,
}: ResponseFormatterProps): Response => {
  const result: ResponseDataProps = {
    success: status < 400,
    status,
    message,
  };

  if (data) result.data = data;

  return res.status(status).send(result);
};

export default responseFormatter;

export interface ResponseFormatterProps {
  res: Response;
  status: number;
  message: string;
  data?: any;
}

/* eslint @typescript-eslint/no-explicit-any: 0 */
export interface ResponseDataProps {
  success: boolean;
  status: number;
  message: string;
  data?: any;
}

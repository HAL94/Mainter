import AppResponse from '../app-response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { HttpStatus } from '@nestjs/common';

export const handleApiError = (error: any): AppResponse<any> => {
  let status = error?.status || error?.statusCode || 500;
  let message = error?.message || 'Something Went Wrong!';
  const data = null;

  console.log(error);

  if (error instanceof PrismaClientKnownRequestError) {
    status = HttpStatus.CONFLICT;
    message = 'Data entered is invalid';
  }

  console.log('error', error);

  return {
    success: false,
    error: {
      status,
    },
    message,
    data,
  };
};

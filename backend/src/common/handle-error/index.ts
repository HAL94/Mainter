import AppResponse from '../app-response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { HttpStatus } from '@nestjs/common';

export const handleApiError = (error: any): AppResponse<any> => {
  let status = error?.status || error?.statusCode || 500;
  let message = error?.message || 'Something Went Wrong!';
  const data = null;

  if (error instanceof PrismaClientKnownRequestError) {
    status = HttpStatus.CONFLICT;
    message = 'Data entered is invalid';
  }

  return {
    success: false,
    error: {
      status,
    },
    message,
    data,
  };
};

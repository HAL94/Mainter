import AppResponse from '../app-response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { HttpStatus } from '@nestjs/common';

export const handleApiError = (error: any): AppResponse<any> => {
  let status = error?.status || error?.statusCode || 500;
  let message = error?.message || 'Something Went Wrong!';
  const data = null;

  console.log('here', error);

  if (error instanceof PrismaClientKnownRequestError) {
    status = HttpStatus.CONFLICT;
    message = 'Data entered is invalid';

    if (error.code === 'P2002') {
      message = `a value for '${error.meta?.target?.[0]}' field already exists, must enter a new one`;
    }
  }

  // console.log('error', error);

  return {
    success: false,
    error: {
      status,
    },
    message,
    data,
  };
};

import { API, handleApiError } from '.';

export const getAllClients = async (onErrorCb = null) => {
  try {
    const res = await API.get('/clients', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    if (typeof onErrorCb === 'function') {
      onErrorCb(error);
    }
    return handleApiError(error);
  }
};

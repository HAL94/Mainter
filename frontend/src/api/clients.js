import { API, handleApiError } from '.';

export const getAllClients = async (onErrorCb = null) => {
  try {
    const res = await API.get('/clients', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result.data, success: true };
  } catch (error) {
    if (typeof onErrorCb === 'function') {
      onErrorCb(error);
    }
    return handleApiError(error);
  }
};

export const addClient = async (data) => {
  try {
    const res = await API.post('/clients', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result.data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

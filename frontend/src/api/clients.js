import { API, handleApiError } from '.';

export const getAllClients = async (data) => {
  try {
    const uri = '/clients';

    const params = new URLSearchParams();

    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key && value) {
        console.log(key, String(value));
        params.append(key, String(value));
      }
    });

    const url = new URL(API.getUri() + uri);

    url.search = params;

    // await new Promise((r) => setTimeout(r, 1000));

    const res = await API.get(url.href, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('data', res.data.result.data)
    return { error: null, data: res.data.result.data, success: true };
  } catch (error) {
    console.log('error', error);
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

export const deleteClients = async (data) => {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await API.post('/clients/delete', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getOneClient = async (data) => {
  try {
    const res = await API.get(`/clients/${data}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const editClient = async (data) => {
  try {
    const res = await API.post(`/clients/update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

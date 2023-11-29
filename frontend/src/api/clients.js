import { API, handleApiError } from '.';

export const getAllClients = async (data) => {
  try {
    const { pageNo, pageSize, query, type, order, orderBy } = data;

    let uri = `/clients?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}&order=${order}&orderBy=${orderBy}`;

    if (type !== '') {
      uri += `&type=${type}`;
    }

    // console.log('data', data, 'uri', uri);
    const res = await API.get(uri, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result.data, success: true };
  } catch (error) {
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
}

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
}

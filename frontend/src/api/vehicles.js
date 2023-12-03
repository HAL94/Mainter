import { API, handleApiError } from '.';

export const getAllVehicles = async (data) => {
  try {
    const { pageNo, pageSize, query, order, orderBy } = data;

    const uri = `/vehicles?pageNo=${pageNo}&pageSize=${pageSize}&query=${query}&order=${order}&orderBy=${orderBy}`;

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

export const getOneVehicle = async (data) => {
  try {
    const res = await API.get(`/vehicles/${data}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const addVehicle = async (data) => {
  try {
    const res = await API.post('/vehicles', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result.data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteVehicles = async (data) => {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await API.post('/vehicles/delete', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const editVehicle = async (data) => {
  try {
    const res = await API.post(`/vehicles/update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

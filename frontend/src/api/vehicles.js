import { API, handleApiError } from '.';

export const getAllVehicles = async (data) => {
  try {
    const uri = '/vehicles';

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


    // console.log('data', data, 'uri', uri);

    const res = await API.get(url.href, {
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

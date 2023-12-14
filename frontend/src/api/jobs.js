import { API, handleApiError } from '.';

export const getAllJobs = async (data) => {
  try {
    const uri = '/jobs';

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

export const getOneJob = async (data) => {
  try {
    const res = await API.get(`/jobs/${data}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const addJob = async (data) => {
  try {
    const res = await API.post('/jobs', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteJobs = async (data) => {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await API.post('/jobs/delete', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateJobStatus = async (data) => {
  try {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await API.post(
      `/jobs/status/${data.id}`,
      { status: data.status },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const editJob = async (data) => {
  try {
    const res = await API.post(`/jobs/update`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data.result, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};
import { API, handleApiError } from '.';

export const signUp = async (formData) => {
  try {
    const res = await API.post('/auth/local/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const signIn = async (formData) => {
  try {
    const res = await API.post('/auth/local/signin', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });    
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMe = async () => {
  try {
    const res = await API.get('/auth/me', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.success) {
      localStorage.setItem('at_expiration', res.data.exp);
    }

    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const logout = async () => {
  try {
    const res = await API.post('/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('isLoggedIn', false); 
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const refresh = async () => {
  try {
    const res = await API.post('/auth/refresh', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return { error: null, data: res.data };
  } catch (error) {
    return handleApiError(error);
  }
};

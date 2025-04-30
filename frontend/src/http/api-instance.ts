import { deleteAuthToken, getAuthToken } from '@/actions/headers';
import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
});

api.interceptors.request.use(async (config) => {
  const auth_token = await getAuthToken();

  if (auth_token) {
    config.headers.Authorization = auth_token;
  }

  return config;
});

export { api };


api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error instanceof AxiosError) {
      const message = error.response?.data.error;

      if (message === 'Unauthorized') {
        api.defaults.headers.Authorization = '';
        await deleteAuthToken();

        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

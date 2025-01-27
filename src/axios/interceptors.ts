import { AxiosInstance, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { errorMessageLogger } from '@/utils/logger';
import { ACCESS_TOKEN_KEY } from './constants';

export const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const headers = new AxiosHeaders(config.headers);
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return { ...config, headers };
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      if (process.env.NODE_ENV === 'development') {
        errorMessageLogger(error);
      }
      return Promise.reject(error);
    }
  );
};

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
        // 토큰과 사용자 정보 모두 제거
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem('userInfo');

        // 현재 경로 저장 (로그인 후 리다이렉트용)
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          localStorage.setItem('redirectPath', currentPath);
        }

        window.location.href = '/login';
      }
      if (process.env.NODE_ENV === 'development') {
        errorMessageLogger(error);
      }
      return Promise.reject(error);
    }
  );
};

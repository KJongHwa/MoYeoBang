import { axiosInstance } from './axiosInstance';
import { API_PATH } from './config/path';
import { ACCESS_TOKEN_KEY } from './constants';

interface AuthRequest {
  email: string;
  password: string;
  nickname?: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  signup: (data: AuthRequest) => axiosInstance.post(API_PATH.auth.signup, data),

  login: async (data: Omit<AuthRequest, 'nickname'>) => {
    const response = await axiosInstance.post<LoginResponse>(
      API_PATH.auth.login,
      data
    );
    const authHeader = response.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
    return response;
  },

  reissue: (refreshToken: string) =>
    axiosInstance.post(API_PATH.auth.reissue, { refreshToken }),

  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return axiosInstance.post(API_PATH.auth.logout);
  },
};

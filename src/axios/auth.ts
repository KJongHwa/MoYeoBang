import { axiosInstance } from './axiosInstance';
import { API_PATH } from './config/path';

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
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response;
  },

  reissue: (refreshToken: string) =>
    axiosInstance.post(API_PATH.auth.reissue, { refreshToken }),

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return axiosInstance.post(API_PATH.auth.logout);
  },
};

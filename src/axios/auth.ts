import { axiosInstance } from './axiosInstance';

interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  signup: (data: SignUpRequest) => axiosInstance.post('/auth/signup', data),
  login: (data: LoginRequest) => axiosInstance.post('/login', data),
};

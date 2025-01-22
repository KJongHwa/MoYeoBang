import { axiosInstance } from '@/axios/axiosInstance';
import { API_PATH } from '../config/path';
import { ImageTypes, UserTypes } from '@/types/mypage.types';
import { AddImageFileParams, UpdateMyProfileParams } from './types';

export const getMyProfile = async () => {
  const response = await axiosInstance.get<UserTypes>(`${API_PATH.user.me}`); // 현재 header에 accessToken이 없어서 401 error
  return response.data ?? [];
};

export const postMyImage = async ({ image }: AddImageFileParams) => {
  const response = await axiosInstance.post<ImageTypes>(
    `${API_PATH.user.image}`,
    image
  );
  return response.data.url ?? [];
};

export const updateMyProfile = async ({
  nickname,
  image,
}: UpdateMyProfileParams) => {
  const params = { image, nickname };
  const response = await axiosInstance.put<UserTypes>(
    `${API_PATH.user.me}`,
    params
  );
  return response.data ?? [];
};

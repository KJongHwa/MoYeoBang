import { publicAxiosInstance, authAxiosInstance } from '@/axios/axiosInstance';
import {
  ImageTypes,
  UserTypes,
  AddImageFileParams,
  UpdateMyProfileParams,
  UserGatheringJoined,
} from '@/types/mypage.types';
import { API_PATH } from '../config/path';

export const getMyProfile = async () => {
  const response = await publicAxiosInstance.get<UserTypes>(
    `${API_PATH.user.me}`
  ); // 현재 header에 accessToken이 없어서 401 error
  return response.data ?? [];
};

export const postMyImage = async ({ image }: AddImageFileParams) => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await authAxiosInstance.post<ImageTypes>(
    `${API_PATH.user.image}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data.image ?? [];
};
export const updateMyProfile = async ({
  nickname,
  image,
}: UpdateMyProfileParams) => {
  const params = { image, nickname };
  const response = await authAxiosInstance.put<UserTypes>(
    `${API_PATH.user.me}`,
    params
  );
  return response.data ?? [];
};

export const getMyGatheringJoied = async () => {
  const response = await authAxiosInstance.get<UserGatheringJoined[]>(
    `${API_PATH.gathering.joined}`
  );
  return response.data ?? [];
};

import { authAxiosInstance } from '@/axios/axiosInstance';
import {
  ImageTypes,
  UserTypes,
  AddImageFileParams,
  UpdateMyProfileParams,
  UserGatheringJoined,
} from '@/types/mypage.types';
import { GatheringRequestBody } from '@/types/gathering.types';
import { API_PATH } from '../config/path';

export const getMyProfile = async () => {
  const response = await authAxiosInstance.get<UserTypes>(
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

export const getMyGatheringJoined = async ({
  isHost,
  reviewed,
  offset = 0,
  limit = 10,
}: {
  isHost?: boolean;
  reviewed?: boolean;
  offset?: number;
  limit?: number;
}) => {
  if (isHost === undefined && reviewed === undefined) {
    throw new Error('host 또는 reviewed 중 하나는 반드시 제공해야 합니다.');
  }

  const response = await authAxiosInstance.get<UserGatheringJoined[]>(
    `${API_PATH.gathering.joined}`,
    {
      params: { isHost, reviewed, offset, limit },
    }
  );

  return response.data ?? [];
};

export const deleteMyCreateGathering = async (gatheringId: number) => {
  const response = await authAxiosInstance.delete(
    `${API_PATH.gathering.detail(gatheringId)}`
  );
  return response.data ?? [];
};

export const editMyCreateGathering = async (
  data: GatheringRequestBody['post'],
  gatheringId: number
) => {
  const response = await authAxiosInstance.put(
    `${API_PATH.gathering.detail(gatheringId)}`,
    data
  );
  return response.data ?? [];
};

import { authAxiosInstance } from '@/axios/axiosInstance';
import {
  ImageTypes,
  UserTypes,
  AddImageFileParams,
  UpdateMyProfileParams,
  UserGatheringJoined,
  ReviewParams,
  EditReviewParams,
} from '@/types/mypage.types';
import { GatheringRequestBody } from '@/types/gathering.types';
import { API_PATH } from '../config/path';

// 프로필 Get
export const getMyProfile = async () => {
  const response = await authAxiosInstance.get<UserTypes>(
    `${API_PATH.user.me}`
  );
  return response.data ?? [];
};

// 프로필 이미지 Post
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

// 프로필 Put
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

// 나의 모임, 작성 가능한 리뷰 모임, 작성한 리뷰, 내가 만든 모임 Get
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

// 내가 만든 모임 Delete
export const deleteMyCreateGathering = async (gatheringId: number) => {
  const response = await authAxiosInstance.delete(
    `${API_PATH.gathering.detail(gatheringId)}`
  );
  return response.data ?? [];
};

// 내가 만든 모임 Put
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

// 리뷰 Post
export const postGatheringReview = async (data: ReviewParams) => {
  const response = await authAxiosInstance.post(
    `${API_PATH.review.default}`,
    data
  );
  return response.data ?? [];
};

// 리뷰 Delete
export const deleteGatheringReview = async (reviewId: number) => {
  const response = await authAxiosInstance.delete(
    `${API_PATH.review.detail(reviewId)}`
  );
  return response.data ?? [];
};

// 리뷰 Put
export const editGatheringReview = async (
  reviewId: number,
  data: EditReviewParams
) => {
  const response = await authAxiosInstance.put(
    `${API_PATH.review.detail(reviewId)}`,
    data
  );
  return response.data ?? [];
};

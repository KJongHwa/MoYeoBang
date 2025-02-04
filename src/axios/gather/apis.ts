import { publicAxiosInstance } from '@/axios/axiosInstance';
import type {
  GatheringRequestBody,
  GatheringUrlParams,
} from '@/types/gathering.types';
import qs from 'qs';
import { API_PATH } from '../config/path';
import { authAxiosInstance } from '../axiosInstance';
import { apiCall } from '@/utils/apiCall';

// 홈페이지 모임 목록 (registrationEnd 기준)
export const getGatheringsByRegistrationEnd = async () => {
  const params: GatheringUrlParams = {
    limit: 6,
    sortBy: 'registrationEnd',
  };

  const queryString = qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'brackets',
    filter: (prefix, value) => (value === '' ? undefined : value),
  });

  const response = await publicAxiosInstance.get(
    `${API_PATH.gathering.default}?${queryString}`
  );
  return response.data;
};

// 홈페이지 모임 목록 (participantCount 기준)
export const getGatheringsByParticipantCount = async () => {
  const params: GatheringUrlParams = {
    limit: 4,
    sortBy: 'participantCount',
  };

  const queryString = qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'brackets',
    filter: (prefix, value) => (value === '' ? undefined : value),
  });

  const response = await publicAxiosInstance.get(
    `${API_PATH.gathering.default}?${queryString}`
  );
  return response.data;
};

// 모임 목록
export const getGatherings = async (params: GatheringUrlParams) => {
  const queryString = qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'brackets',
    filter: (prefix, value) => (value === '' ? undefined : value),
  });

  const response = await publicAxiosInstance.get(
    `${API_PATH.gathering.default}?${queryString}`
  );
  return response.data;
};

// 모임 생성
export const postGathering = async (data: GatheringRequestBody['post']) => {
  return await authAxiosInstance.post(API_PATH.gathering.default, data);
};

// 모임 상세 정보 조회
export const getGatheringDetail = (gatheringId: number) => {
  return apiCall(
    'get',
    `${API_PATH.gathering.default}/${gatheringId}`,
    null,
    {}
  );
};

// 모임 주최자 프로필 조회
export const getHostProfile = (hostId: number) => {
  return apiCall('get', `${API_PATH.user}/${hostId}/profile`, null, {});
};

export const getGatheringReviews = (gatheringId: number) => {
  return apiCall(
    'get',
    `${API_PATH.review.default}?gatheringId=${gatheringId}`,
    null,
    {}
  );
};

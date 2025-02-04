import type {
  GatheringRequestBody,
  GatheringUrlParams,
} from '@/types/gathering.types';
import { apiCall } from '@/utils/apiCall';
import { API_PATH } from '../config/path';

// 홈페이지 모임 목록 (registrationEnd 기준)
export const getGatheringsByRegistrationEnd = async () => {
  const params: GatheringUrlParams = {
    limit: 6,
    sortBy: 'registrationEnd',
  };

  return apiCall('get', API_PATH.gathering.default, null, { params });
};

// 홈페이지 모임 목록 (participantCount 기준)
export const getGatheringsByParticipantCount = async () => {
  const params: GatheringUrlParams = {
    limit: 4,
    sortBy: 'participantCount',
  };

  return apiCall('get', API_PATH.gathering.default, null, { params });
};

// 모임 목록
export const getGatherings = async (params: GatheringUrlParams) => {
  return apiCall('get', API_PATH.gathering.default, null, { params });
};

// 모임 생성
export const postGathering = async (data: GatheringRequestBody['post']) => {
  return apiCall('post', API_PATH.gathering.default, data);
};

import type {
  GatheringRequestBody,
  GatheringUrlParams,
} from '@/types/gathering.types';
import { apiCall } from '@/utils/apiCall';
import { API_PATH } from '../config/path';

// 홈페이지 모임 목록 (registrationEnd 기준)
export const getGatheringsByRegistrationEnd = () => {
  const params: GatheringUrlParams = {
    limit: 6,
    sortBy: 'registrationEnd',
  };

  return apiCall('get', API_PATH.gathering.default, { params });
};

// 홈페이지 모임 목록 (participantCount 기준)
export const getGatheringsByParticipantCount = () => {
  const params: GatheringUrlParams = {
    limit: 4,
    sortBy: 'participantCount',
  };

  return apiCall('get', API_PATH.gathering.default, { params });
};

// 모임 목록
export const getGatherings = (params: GatheringUrlParams) => {
  return apiCall('get', API_PATH.gathering.default, null, { params });
};

export const postGathering = async (data: GatheringRequestBody['post']) => {
  return apiCall('post', API_PATH.gathering.default, data);
};

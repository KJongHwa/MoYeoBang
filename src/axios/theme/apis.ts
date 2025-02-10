import type { RecommendUrlParams } from '@/types/theme.types';
import { apiCall } from '@/utils/apiCall';
import { API_PATH } from '../config/path';

// 추천 테마
export const getRecommendTheme = async (params: RecommendUrlParams) => {
  return apiCall('get', API_PATH.theme.recommend, null, { params });
};

import { publicAxiosInstance, authAxiosInstance } from '@/axios/axiosInstance';
import qs from 'qs';

type HttpMethod = 'get' | 'post' | 'patch' | 'delete' | 'put';

// 공통 apiCall 함수
export const apiCall = async (
  method: HttpMethod,
  url: string,
  data: any = null,
  config: Record<string, any> = {}
) => {
  try {
    const { params: queryParams, ...axiosConfig } = config;

    const axiosInstance =
      method === 'get' ? publicAxiosInstance : authAxiosInstance;

    const response = await axiosInstance[method](url, data, {
      ...axiosConfig,
      params: queryParams,
      paramsSerializer: (params) =>
        qs.stringify(params, {
          skipNulls: true,
          arrayFormat: 'brackets',
          filter: (prefix, value) => (value === '' ? undefined : value),
        }),
    });
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

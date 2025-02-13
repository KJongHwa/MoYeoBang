import { publicAxiosInstance, authAxiosInstance } from '@/axios/axiosInstance';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

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

    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      params: queryParams,
      ...axiosConfig,
      paramsSerializer: (params: any) =>
        qs.stringify(params, {
          skipNulls: true,
          arrayFormat: 'brackets',
          filter: (prefix, value) => (value === '' ? undefined : value),
        }),
    };

    // Include data for non-GET methods
    if (method !== 'get') {
      requestConfig.data = data;
    }

    const response = await axiosInstance.request(requestConfig);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

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
    const { params, ...axiosConfig } = config;

    // params가 있을 경우 빈 값을 제외하고 쿼리 문자열 생성
    const queryString = params
      ? qs.stringify(params, {
          skipNulls: true,
          arrayFormat: 'brackets',
          filter: (prefix, value) => (value === '' ? undefined : value),
        })
      : '';

    const finalUrl = new URL(url, publicAxiosInstance.defaults.baseURL).href;
    const fullUrl = queryString ? `${finalUrl}?${queryString}` : finalUrl;

    const axiosInstance =
      method === 'get' ? publicAxiosInstance : authAxiosInstance;

    const response = await axiosInstance[method](fullUrl, data, axiosConfig);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

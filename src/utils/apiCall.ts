import { axiosInstance } from '@/axios/axiosInstance';

type HttpMethod = 'get' | 'post' | 'patch' | 'delete' | 'put';

// 공통 apiCall 함수
export const apiCall = async (
  method: HttpMethod,
  url: string,
  data: any = null,
  config: Record<string, any> = {}
) => {
  const { params, ...axiosConfig } = config;
  const queryString = new URLSearchParams(params).toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  const response = await axiosInstance[method](finalUrl, data, axiosConfig);
  return response.data;
};

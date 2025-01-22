import { axiosInstance } from '@/axios/axiosInstance';

type HttpMethod = 'get' | 'post' | 'patch' | 'delete' | 'put';

type Params = {
  [key: string]: string | number | boolean | null | undefined;
};

// 공통 apiCall 함수
export const apiCall = async (
  method: HttpMethod,
  url: string,
  data: any = null,
  config: Record<string, any> = {}
) => {
  const { params, ...axiosConfig } = config;

  // params가 있을 경우 빈 값을 제외하고 쿼리 문자열 생성
  const queryString = params
    ? new URLSearchParams(
        Object.entries(params)
          .filter(
            ([, value]) => value !== '' && value !== undefined && value !== null
          )
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  const finalUrl = queryString ? `${url}?${queryString}` : url;

  const response = await axiosInstance[method](finalUrl, data, axiosConfig);
  return response.data;
};

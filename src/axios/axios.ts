import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://54.180.79.214.nip.io/', // api 집어넣기
  headers: {
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use((config) => {
//   // 토근 로직 추후 구현
//   return config;
// });

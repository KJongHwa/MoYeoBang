// mockUser.ts
import { userDTO } from '@/types/mypage.types';

export const mockUser: userDTO['get'] = {
  userID: 0, // 수정: userId → userID
  email: 'janggh1012@naver.com', // 사용자 아이디
  nickname: 'jisoleil', // 사용자 별명
  image: '', // 사용자 이미지
  createdAt: '2025-01-03T02:49:27.832Z', // 사용자 생성일
  updatedAt: '2025-01-03T02:49:27.832Z', // 사용자 수정일
};

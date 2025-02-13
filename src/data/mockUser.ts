// mockUser.ts
import { UserDTO } from '@/types/mypage.types';

export const mockUser: UserDTO['get'] = {
  userID: 101, //
  email: 'moyeobangtester@naver.com', // 사용자 아이디
  nickname: '모여방테스터', // 사용자 별명
  image: '', // 사용자 이미지
  createdAt: '2025-01-03T02:49:27.832Z', // 사용자 생성일
  updatedAt: '2025-01-03T02:49:27.832Z', // 사용자 수정일
};

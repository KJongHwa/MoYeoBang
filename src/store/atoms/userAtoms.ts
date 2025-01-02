// 예시 코드 

import { atom } from 'recoil';

export interface UserState {
  id: number | null;
  email: string;
  name: string;
}

export const userState = atom<UserState>({
  key: 'userState', // 유니크한 키
  default: {
    id: null,
    email: '',
    name: '',
  },
});
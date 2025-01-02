// 예시 코드 


import { selector } from 'recoil';
import { userState } from '../atoms/userAtoms';

export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({get}) => {
    const user = get(userState);
    return user.name;
  },
});
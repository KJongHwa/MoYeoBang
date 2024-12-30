// 예시 코드 


import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/userAtoms';
import { userNameSelector } from '../store/selectors/userSelectors';

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  const userName = useRecoilValue(userNameSelector);

  const updateUser = (newUserData: Partial<typeof user>) => {
    setUser(prev => ({
      ...prev,
      ...newUserData
    }));
  };

  return {
    user,
    userName,
    updateUser,
  };
};
export interface GetUserInfoParmas {
  userId: string | number;
}

export interface AddImageFileParams {
  image: File;
}

export interface UpdateMyProfileParams {
  nickname: string;
  image: string;
}

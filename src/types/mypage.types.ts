// eslint-disable-next-line @typescript-eslint/naming-convention
export interface userDTO {
  get: {
    userID: number;
    email: string;
    nickname: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserTypes {
  userID: number;
  email: string;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageTypes {
  url: string;
}

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

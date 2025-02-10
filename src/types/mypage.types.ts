export interface UserDTO {
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

export interface UserGatheringJoined {
  gatheringId: number;
  userId: number;
  name: string;
  location: string;
  themeName: string;
  genre: string;
  image: string;
  level: string;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
  completed: boolean;
  canceled: boolean;
  review: {
    reviewId: number;
    score: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ImageTypes {
  image: string;
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

export interface MyReviewParmas {
  reviewId: number;
  themeName: string;
  image: string;
  comment: string;
  score: number;
}

export interface ReviewParams {
  gatheringId: number;
  score: number;
  comment: string;
}

export interface EditReviewParams {
  score: number;
  comment: string;
}

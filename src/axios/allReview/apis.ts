import { axiosInstance } from '../axiosInstance';
import { API_PATH } from '../config/path';

export const getReviewsRating = async (genre: string) => {
  const response = await axiosInstance.get(
    `${API_PATH.review.score}?genre=${genre}`
  );
  return response.data;
};

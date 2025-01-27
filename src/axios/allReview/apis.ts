import { publicAxiosInstance } from '../axiosInstance';
import { API_PATH } from '../config/path';

export const getReviewsRating = async (genre: string) => {
  const URL =
    genre === ''
      ? `${API_PATH.review.score}`
      : `${API_PATH.review.score}?genre=${genre}`;

  const response = await publicAxiosInstance.get(URL);
  return response.data;
};

export const getAllReviews = async (genre: string) => {
  const response = await publicAxiosInstance.get(
    `${API_PATH.review.default}?genre=${genre}`
  );
  return response.data;
};

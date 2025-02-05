import qs from 'qs';
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

interface GetAllReviewsProps {
  genre: string;
  location: string;
  date: string;
  sortBy: string;
  limit: number;
  offset: number;
}

export const getAllReviews = async (params: GetAllReviewsProps) => {
  const queryString = qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'brackets',
    filter: (prefix, value) => (value === '' ? undefined : value),
  });

  const URL = `${API_PATH.review.default}?${queryString}`;

  const response = await publicAxiosInstance.get(URL);
  return response.data;
};

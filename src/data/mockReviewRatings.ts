import { ReviewRatingDto } from '@/types/review.types';

export const mockReviewRatings: ReviewRatingDto['get'][] = [
  {
    genre: 'all', // 장르
    totalScore: 3, // 총 스코어 갯수
    averageScore: 2.7, // 평균 스코어
    Score: {
      1: 1, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 1, // 4점 스코어 갯수
      5: 1, // 5점 스코어 갯수
    },
  },
  {
    genre: 'mystery', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'horror', // 장르
    totalScore: 1, // 총 스코어 갯수
    averageScore: 1, // 평균 스코어
    Score: {
      1: 1, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'fantasy', // 장르
    totalScore: 2, // 총 스코어 갯수
    averageScore: 3.5, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 1, // 3점 스코어 갯수
      4: 1, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'comic', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'sci-fi', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'drama', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'thriller', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'romance', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
  {
    genre: 'stealth', // 장르
    totalScore: 0, // 총 스코어 갯수
    averageScore: 0, // 평균 스코어
    Score: {
      1: 0, // 1점 스코어 갯수
      2: 0, // 2점 스코어 갯수
      3: 0, // 3점 스코어 갯수
      4: 0, // 4점 스코어 갯수
      5: 0, // 5점 스코어 갯수
    },
  },
];

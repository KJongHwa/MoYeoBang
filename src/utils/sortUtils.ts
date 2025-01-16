import { getDateTime } from './dateUtils';

export const sortReviews = (reviews: any[], selectedSort: string) => {
  return reviews.sort((a, b) => {
    switch (selectedSort) {
      case 'createdAt':
        return getDateTime(b.createdAt) - getDateTime(a.createdAt);
      case 'score':
        return b.score - a.score;
      case 'participantCount':
        return b.review.participantCount - a.review.participantCount;
      default:
        return 0;
    }
  });
};

export const sortGatherings = (gatherings: any[], selectedSort: string) => {
  return gatherings.sort((a, b) => {
    switch (selectedSort) {
      case 'createdAt':
        return getDateTime(b.dateTime) - getDateTime(a.dateTime);
      case 'deadline':
        return getDateTime(a.registrationEnd) - getDateTime(a.registrationEnd);
      default:
        return 0;
    }
  });
};

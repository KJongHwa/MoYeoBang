export const questions = [
  {
    text: '선호하는 지역을 선택해주세요.',
    options: ['건대', '홍대', '혜화', '강남', '상관없어요'],
  },
  {
    text: '평소 관심있던 장르는 무엇인가요?',
    options: [
      '스릴러 또는 자극적인 것',
      '오락적인 것',
      '감성적인 것',
      '이색적인 것',
    ],
  },
  {
    text: '원하는 플레이 타임을 선택해주세요.',
    options: ['길게', '짧게', '상관없어요'],
  },
  {
    text: '원하는 난이도를 선택해주세요.',
    options: ['쉬움', '보통', '어려움', '상관없어요'],
  },
];

// 질문 옵션 매핑 목록
export const locationMap: { [key: string]: string } = {
  건대: 'geondae',
  홍대: 'hongdae',
  혜화: 'hyehwa',
  강남: 'gangnam',
  상관없어요: '',
};

export const genreMap: { [key: string]: string[] } = {
  '스릴러 또는 자극적인 것': ['mystery', 'horror', 'thriller', 'stealth'],
  '오락적인 것': ['comic', 'drama'],
  '감성적인 것': ['romance', 'drama', 'fantasy'],
  '이색적인 것': ['fantasy', 'sci-fi'],
};

export const levelMap: { [key: string]: string } = {
  쉬움: 'low',
  보통: 'middle',
  어려움: 'high',
  상관없어요: '',
};

export const playTimeMap: { [key: string]: string[] } = {
  짧게: ['60', '65'],
  길게: ['70', '75'],
  상관없어요: ['all'],
};

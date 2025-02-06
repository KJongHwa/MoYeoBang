export const questions = [
  {
    text: '선호하는 지역을 선택해주세요.',
    options: ['건대', '홍대', '혜화', '강남', '🙂‍↔️ 상관없어요'],
  },
  {
    text: '오늘 저녁, 이 중 하나의 음료를 마셔야한다면?',
    options: [
      '🍷 포도 향이 진한 와인',
      '🍺 시원한 맥주',
      '🍵 따뜻한 차',
      '🍸 영롱한 빛의 칵테일',
    ],
  },
  {
    text: '내가 원하는 플레이 방식은?',
    options: [
      '🐶 한 번 잡은 문제는 놔주지 않는 불독 스타일',
      '🦅 답답한 건 못참는 시원시원한 독수리 스타일',
      '🐸 게임 그 자체를 즐기는 개구리 스타일',
    ],
  },
  {
    text: '원하는 난이도를 선택해주세요.',
    options: ['쉬움', '보통', '어려움', '🙂‍↔️ 상관없어요'],
  },
];

// 질문 옵션 매핑 목록
export const locationMap: { [key: string]: string } = {
  건대: 'geondae',
  홍대: 'hongdae',
  혜화: 'hyehwa',
  강남: 'gangnam',
  '🙂‍↔️ 상관없어요': '',
};

export const genreMap: { [key: string]: string[] } = {
  '🍷 포도 향이 진한 와인': ['mystery', 'horror', 'thriller', 'stealth'],
  '🍺 시원한 맥주': ['comic', 'drama'],
  '🍵 따뜻한 차': ['romance', 'drama', 'fantasy'],
  '🍸 영롱한 빛의 칵테일': ['fantasy', 'sci-fi'],
};

export const levelMap: { [key: string]: string } = {
  쉬움: 'low',
  보통: 'middle',
  어려움: 'high',
  '🙂‍↔️ 상관없어요': '',
};

export const playTimeMap: { [key: string]: string[] } = {
  '🐶 한 번 잡은 문제는 놔주지 않는 불독 스타일': ['60', '65'],
  '🦅 답답한 건 못참는 시원시원한 독수리 스타일': ['70', '75'],
  '🐸 게임 그 자체를 즐기는 개구리 스타일': ['60', '65', '70', '75'],
};

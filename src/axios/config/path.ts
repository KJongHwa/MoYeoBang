export const API_PATH = {
  user: {
    me: '/user', // 내 정보 조회 && 수정
  },
  auth: {
    signup: '/auth/signup', // 회원가입
    login: '/login', // 로그인
    logout: '/logout', // 로그아웃
    reissue: '/auth/reissue', // 토큰 재발급
    sendEmail: '/auth/email/send', // 이메일 인증 코드 전송
    verifyEmail: '/auth/email/verify', // 이메일 인증 코드 확인
  },
  gathering: {
    default: '/gather', // 모임 목록 조회 && 생성
    joined: '/gather/joined', // 나의 모임 조회
    zzim: '/gather/zzim', // 찜한 모임 조회
    detail(gatheringId: string | number) {
      return `/gather/${gatheringId}`; // 모임 상세 조회 && 수정 && 삭제
    },
    participant(gatheringId: string | number) {
      return `/participant/${gatheringId}`; // 모임 참여 && 취소
    },
  },
  review: {
    default: '/review', // 리뷰 목록 조회 && 작성
    score: 'review/score', // 장르 평점 조회
    detail(reviewId: string | number) {
      return `review/${reviewId}`; // 리뷰 작성 && 수정 && 삭제
    },
  },
};

export interface GatheringParams {
  sortBy: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder: 'asc' | 'desc';
  keyword: string;
  location: string;
  dateTime: string;
  genre: string;
}

// Response
export interface GatheringDto {
  get: {
    gatheringId: number;
    userId: number;
    name: string;
    location: string;
    themeName: string;
    image: string;
    level: string;
    genre: string;
    playtime: number;
    map: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
    participantCount: number;
  };
}

// Request
export interface GatheringRequestBody {
  post: {
    name: string;
    location: '건대' | '홍대' | '강남' | '혜화';
    themeName: string;
    dateTime: string;
    registrationEnd: string;
    capacity: number;
  };
  patch: {
    gatheringId: number;
    name: string;
    location: '건대' | '홍대' | '강남' | '혜화';
    themeName: string;
    dateTime: string;
    registrationEnd: string;
  };
  delete: {
    gatheringId: number;
  };
}

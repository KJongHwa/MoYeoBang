export interface RecommendUrlParams {
  genre: string[];
  location?: string;
  playtime?: string[];
  level?: string;
}

export interface RecommendThemeDto {
  name: string;
  synopsis: string;
  image: string;
  level: string;
  genre: string;
  playtime: string;
  location: string;
}

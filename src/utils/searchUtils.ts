import { themeNameList } from '@/constants/themeList';

// 방탈출 테마 이름 검색
export const searchThemes = (inputThemeName: string, location?: string) => {
  let filtered: string[] = [];
  let searchErrorMessage = '';

  // location이 제공된 경우 필터링
  if (location && themeNameList[location]) {
    filtered = themeNameList[location].theme.filter((theme) =>
      theme.toLowerCase().includes(inputThemeName.toLowerCase())
    );
  } else {
    // 모든 테마 검색
    filtered = Object.values(themeNameList).flatMap((locationData) =>
      locationData.theme.filter((theme) =>
        theme.toLowerCase().includes(inputThemeName.toLowerCase())
      )
    );
  }

  if (filtered.length === 0) {
    searchErrorMessage = '검색어가 없어요. 다시 입력해 주세요.';
  }

  return {
    filtered,
    searchErrorMessage,
  };
};

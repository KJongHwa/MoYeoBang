import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import SlideDownMotion from '@/components/@shared/animation/SlideDownMotion';
import Input from '@/components/@shared/input/Input';
import Button from '@/components/@shared/button/Button';
import { themeNameList } from '@/constants/themeList';

interface ThemeSelectorProps {
  location: string;
  inputThemeName: string;
  setInputThemeName: (themeName: string) => void;
  searchThemes: () => void;
  filteredThemes: string[];
  setFilteredThemes: (themes: string[]) => void;
  setThemeName: (name: string) => void;
  selectedThemeName: string;
  setSelectedThemeName: (themeName: string) => void;
  searchAttempted: boolean;
  searchMessage: string;
  showThemeDropdown: boolean;
  setShowThemeDropdown: (value: boolean) => void;
  handleShowAllThemes: (location: string) => void;
}

export default function ThemeSelector({
  location,
  inputThemeName,
  setInputThemeName,
  searchThemes,
  filteredThemes,
  setFilteredThemes,
  handleShowAllThemes,
  setThemeName,
  selectedThemeName,
  setSelectedThemeName,
  searchAttempted,
  searchMessage,
  showThemeDropdown,
  setShowThemeDropdown,
}: ThemeSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeSelect = (theme: string) => {
    setSelectedThemeName(theme);
    setThemeName(theme);
    setInputThemeName(theme);
    setShowThemeDropdown(false);
  };

  // 클릭 외부 감지 핸들러
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowThemeDropdown(false);
    }
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col items-start text-base">
      <h2 className="font-semibold text-white">{`${themeNameList[location].label}의 방탈출 테마`}</h2>
      <div
        ref={dropdownRef}
        className="mt-3 flex w-full items-center gap-2 md:gap-3"
      >
        <div className="relative w-full">
          <Input
            labelColor="white"
            variant="elevated"
            placeholder="테마 제목을 입력하세요."
            inputProps={{
              type: 'text',
              value: inputThemeName,
              onChange: (e) => {
                setInputThemeName(e.target.value);
                setShowThemeDropdown(true);
              },
            }}
          />
          <button
            title="전체 보기"
            type="button"
            className="absolute right-4 top-0"
            onClick={() => handleShowAllThemes(location)}
          >
            <Image
              src="/icons/chevron-down.svg"
              alt="드롭다운 아이콘"
              width={24}
              height={24}
              className="my-4"
            />
          </button>
          {filteredThemes.length > 0 && showThemeDropdown && (
            <SlideDownMotion>
              <div className=" absolute top-3 w-full  rounded-lg bg-secondary-80 p-2">
                <ul className="dropdown-scrollbar flex max-h-64 flex-1 flex-col overflow-y-auto">
                  {filteredThemes.map((filteredTheme) => (
                    <li key={filteredTheme} className="mr-2">
                      <button
                        type="button"
                        onClick={() => handleThemeSelect(filteredTheme)}
                        className={`w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 py-[6px] text-left text-sm font-medium text-white ${
                          selectedThemeName === filteredTheme
                            ? 'rounded-md bg-secondary-90'
                            : 'hover:rounded-md hover:bg-secondary-90'
                        }`}
                      >
                        {filteredTheme}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideDownMotion>
          )}
        </div>
        <Button onClick={searchThemes} className="w-20 md:w-28">
          검색
        </Button>
      </div>

      {!selectedThemeName && searchAttempted && searchMessage && (
        <p className="w-full py-2 text-status-danger">{searchMessage}</p>
      )}
    </div>
  );
}

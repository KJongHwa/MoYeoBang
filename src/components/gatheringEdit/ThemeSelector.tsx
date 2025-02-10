import Input from '@/components/@shared/input/Input';
import Button from '@/components/@shared/button/Button';
import { themeNameList } from '@/constants/themeList';

interface ThemeSelectorProps {
  location: string;
  inputThemeName: string;
  setInputThemeName: (themeName: string) => void;
  searchThemes: () => void;
  filteredThemes: string[];
  setThemeName: (name: string) => void;
  selectedThemeName: string;
  setSelectedThemeName: (themeName: string) => void;
  searchAttempted: boolean;
  searchMessage: string;
}

export default function ThemeSelector({
  location,
  inputThemeName,
  setInputThemeName,
  searchThemes,
  filteredThemes,
  setThemeName,
  selectedThemeName,
  setSelectedThemeName,
  searchAttempted,
  searchMessage,
}: ThemeSelectorProps) {
  return (
    <div className="flex flex-1 flex-col items-start gap-3 text-base">
      <h2 className="font-semibold text-white">{`${themeNameList[location].label}의 방탈출 테마`}</h2>
      <div className="flex w-full items-center gap-2 md:gap-3">
        <Input
          labelColor="white"
          variant="elevated"
          placeholder="테마 제목을 입력하세요."
          inputProps={{
            type: 'text',
            value: inputThemeName,
            onChange: (e) => setInputThemeName(e.target.value),
          }}
        />
        <Button onClick={searchThemes} className="w-20 md:w-28">
          검색
        </Button>
      </div>

      {searchAttempted && searchMessage && (
        <p className="w-full rounded-lg bg-secondary-20 px-3 py-2 text-secondary-80">
          {searchMessage}
        </p>
      )}

      {searchAttempted && !searchMessage && filteredThemes.length > 0 && (
        <div className="-my-1 flex w-full flex-col flex-wrap gap-1 rounded-lg bg-secondary-80 p-1">
          {filteredThemes.map((filteredTheme) => (
            <button
              type="button"
              key={filteredTheme}
              onClick={() => {
                setSelectedThemeName(filteredTheme);
                setThemeName(filteredTheme);
              }}
              className={`w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 py-[6px] text-left text-sm font-medium text-white ${
                selectedThemeName === filteredTheme
                  ? 'rounded-md bg-secondary-90'
                  : 'hover:rounded-md hover:bg-secondary-90'
              }`}
            >
              {filteredTheme}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

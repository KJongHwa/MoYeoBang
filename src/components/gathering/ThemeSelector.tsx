import Input from '@/components/@shared/Input';
import Button from '@/components/@shared/Button';
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
}: ThemeSelectorProps) {
  return (
    <div className="text-md flex flex-1 flex-col items-start gap-3">
      <h2 className="font-semibold text-gray-800">{`${themeNameList[location].label}의 방탈출 테마`}</h2>
      <div className="flex w-full items-center gap-2 md:gap-3">
        <Input
          placeholder="테마 제목을 입력하세요."
          inputProps={{
            type: 'text',
            value: inputThemeName,
            onChange: (e) => setInputThemeName(e.target.value),
          }}
        />
        <Button variant="secondary" onClick={searchThemes}>
          검색
        </Button>
      </div>
      {filteredThemes.length > 0 ? (
        <div className="-my-1 flex w-full flex-col flex-wrap gap-1 rounded-lg bg-secondary-5 p-1">
          {filteredThemes.map((filteredTheme) => (
            <button
              type="button"
              key={filteredTheme}
              onClick={() => {
                setSelectedThemeName(filteredTheme);
                setThemeName(filteredTheme);
              }}
              className={`w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 py-[6px] text-left text-sm font-medium text-secondary-80 ${
                selectedThemeName === filteredTheme
                  ? 'rounded-md bg-primary-5'
                  : 'hover:rounded-md hover:bg-primary-5'
              }`}
            >
              {filteredTheme}
            </button>
          ))}
        </div>
      ) : (
        searchAttempted && (
          <p className="w-full rounded-lg bg-secondary-20 px-3 py-2 text-secondary-5 text-secondary-80">
            검색어가 없어요. 다시 입력해 주세요.
          </p>
        )
      )}
    </div>
  );
}

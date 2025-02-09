import Button from '@/components/@shared/button/Button';
import { themeNameList } from '@/constants/themeList';

interface LocationSelectorProps {
  location: string;
  handleLocationClick: (selectedLocation: string) => void;
}

export default function LocationSelector({
  location,
  handleLocationClick,
}: LocationSelectorProps) {
  return (
    <div className="text-md flex w-full flex-col items-start gap-3">
      <h3 className="font-semibold text-white">장소</h3>
      <div className="flex w-full gap-2">
        {Object.entries(themeNameList).map(([locationKey, { label }]) => (
          <Button
            variant="secondary"
            padding="12"
            key={locationKey}
            onClick={() => handleLocationClick(locationKey)}
            className={
              locationKey === location
                ? 'w-36 !bg-default-primary text-white'
                : 'w-36'
            }
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

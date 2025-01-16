import { useState, useEffect, useCallback } from 'react';
import { matchFilter } from '@/utils/filterUtils';
import DateDropdown from '@/components/allReview/DateDropdown';
import LocationDropdown from '@/components/allReview/LocationDropdown';
import LevelDropdown from '@/components/gathering/LevelDropdown';
import GenreFilter from '../@shared/GenreFilter';

interface Gathering {
  gatheringId: string;
  genre: string;
  location: string;
  dateTime: string;
  level: string;
}

interface Filters {
  genre: string;
  location: string;
  date: string;
  level: string;
}

interface FilterCondition {
  option: string;
  target: string;
  isDate?: boolean;
}

interface GatheringFiltersProps {
  gatherings: Gathering[];
  setFilteredGatherings: (gatherings: Gathering[]) => void;
}

export default function GatheringFilters({
  gatherings,
  setFilteredGatherings,
}: GatheringFiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    genre: 'all',
    location: 'all',
    date: '',
    level: 'all',
  });

  const filterGatherings = useCallback(() => {
    if (!gatherings) return; // gatherings가 undefined일 때 처리

    const { genre, location, date, level } = filters;

    const filtered = gatherings.filter((gathering: Gathering) => {
      const filterConditions: FilterCondition[] = [
        { option: genre, target: gathering.genre },
        { option: location, target: gathering.location },
        { option: date, target: gathering.dateTime, isDate: true },
        { option: level, target: gathering.level },
      ];

      const matches = filterConditions.map(({ option, target, isDate }) =>
        matchFilter({ option, target, isDate })
      );

      return matches.every(Boolean);
    });

    setFilteredGatherings(filtered);
  }, [filters, gatherings, setFilteredGatherings]);

  useEffect(() => {
    filterGatherings();
  }, [filterGatherings]);

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return (
    <section className="mx-1 flex flex-col xl:mx-5">
      <div className="flex flex-col gap-6">
        <GenreFilter
          onGenreChange={(value: string) => handleFilterChange('genre', value)}
          selectedGenre={filters.genre}
        />
        <div className="flex justify-between text-text-secondary">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <LocationDropdown
                onLocatingChange={(value) =>
                  handleFilterChange('location', value)
                }
              />
              <DateDropdown
                onDateChange={(value) => handleFilterChange('date', value)}
              />
              <LevelDropdown
                onLevelChange={(value) => handleFilterChange('level', value)}
              />
            </div>
          </div>
          <ul>정렬</ul>
        </div>
      </div>
    </section>
  );
}

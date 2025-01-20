import { levels } from '@/constants/themeList';

interface GatheringDetailSectionProps {
  level: string;
  genre: string;
  themeName: string;
  playtime: number;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
  map: string;
}

export default function GatheringDetailSection({
  level,
  genre,
  themeName,
  playtime,
  dateTime,
  registrationEnd,
  capacity,
  participantCount,
  map,
}: GatheringDetailSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const levelsLabel =
    levels.find((item) => item.value === level)?.label || level;

  return (
    <section className="mt-8 space-y-6">
      {/* 플레이타임 */}
      <div className="flex items-center gap-4">
        <h3 className="min-w-[100px] text-secondary-50">플레이타임</h3>
        <span>{playtime}분</span>
      </div>

      {/* 난이도 */}
      <div className="flex items-center gap-4">
        <h3 className="min-w-[100px] text-secondary-50">난이도</h3>
        <div className="flex items-center gap-2">
          <span>{levelsLabel}</span>
        </div>
      </div>

      {/* 모임 일시 */}
      <div className="flex items-center gap-4">
        <h3 className="min-w-[100px] text-secondary-50">모임 일시</h3>
        <span>{formatDate(dateTime)}</span>
      </div>

      {/* 신청 마감 */}
      <div className="flex items-center gap-4">
        <h3 className="min-w-[100px] text-secondary-50">신청 마감</h3>
        <span>{formatDate(registrationEnd)}</span>
      </div>

      {/* 모임 정원 */}
      <div className="flex items-center gap-4">
        <h3 className="min-w-[100px] text-secondary-50">모임 정원</h3>
        <span>{capacity}명</span>
      </div>
    </section>
  );
}

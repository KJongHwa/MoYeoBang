import { levels } from '@/constants/themeList';
import Image from 'next/image';

interface GatheringDetailSectionProps {
  synopsis: string;
  level: string;
  themeName: string;
  playtime: number;
  dateTime: string;
  registrationEnd: string;
  capacity: number;
  participantCount: number;
}

export default function GatheringDetailSection({
  synopsis,
  level,
  themeName,
  playtime,
  dateTime,
  registrationEnd,
  capacity,
  participantCount,
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
    <section className="mt-8 max-w-[805px] space-y-6">
      {/* 방탈출 정보 섹션 */}
      <div>
        <h2 className="font-noto mb-4 text-[26px] leading-[28px]">
          방탈출 정보
        </h2>
        <div className="space-y-6 rounded-xl bg-[#2A2B2E] p-6">
          <div className="flex items-baseline gap-4">
            <h3 className="min-w-[100px] text-secondary-50">테마명</h3>
            <span>{themeName}</span>
          </div>

          <div className="flex items-baseline gap-4">
            <h3 className="min-w-[100px] text-secondary-50">시놉시스</h3>
            <p className="whitespace-pre-line">{synopsis}</p>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="min-w-[100px] text-secondary-50">플레이타임</h3>
            <span>{playtime}분</span>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="min-w-[100px] text-secondary-50">난이도</h3>
            <div className="flex items-center gap-2">
              <span>{levelsLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 모임 안내 섹션 */}
      <div>
        <h2 className="font-noto mb-4 text-[26px] leading-[28px]">모임 안내</h2>
        <div className="space-y-6 rounded-xl bg-[#2A2B2E] p-6">
          <div className="flex items-center gap-4">
            <h3 className="min-w-[100px] text-secondary-50">모임 일시</h3>
            <span>{formatDate(dateTime)}</span>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="min-w-[100px] text-secondary-50">신청 마감</h3>
            <span>{formatDate(registrationEnd)}</span>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="min-w-[100px] text-secondary-50">모임 정원</h3>
            <span>{capacity}명</span>
          </div>

          <div className="flex items-center gap-4">
            <h3 className="min-w-[100px] text-secondary-50">참여 유저</h3>
            <div className="flex -space-x-2">
              {Array.from({ length: participantCount }, (_, i) => (
                <div
                  key={`participant-${crypto.randomUUID()}`}
                  className="relative h-8 w-8 rounded-full border-2 border-secondary-90 bg-secondary-90"
                >
                  <Image
                    src="/icons/profile_image_default.svg"
                    alt={`참여자 ${i + 1}`}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Button from '@/components/@shared/button/Button';

interface JoinBoxSectionProps {
  name: string;
  themeName: string;
  participantCount: number;
  capacity: number;
}

export default function JoinBoxSection({
  name,
  themeName,
  participantCount,
  capacity,
}: JoinBoxSectionProps) {
  const participationRate = (participantCount / capacity) * 100;

  return (
    <aside className="w-[369px]">
      <div className="rounded-xl border border-secondary-70 bg-[#17171C] p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold text-text-default">{name}</h2>
          <p className="text-secondary-50">{themeName}</p>
        </div>

        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-sm text-text-default">
            <span>
              {participantCount}/{capacity}
            </span>
            <span className="text-primary-40">모집중</span>
          </div>
          {/* 프로그레스 바 */}
          <div className="relative h-1 w-full rounded-full bg-secondary-90">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary-40 transition-all duration-300"
              style={{ width: `${participationRate}%` }}
            />
          </div>
        </div>

        <Button
          variant="primary"
          onClick={() => {}}
          className="h-12 w-full text-base font-semibold"
        >
          참여하기
        </Button>
      </div>
    </aside>
  );
}

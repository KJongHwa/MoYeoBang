'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/@shared/button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  cancelParticipation,
  participateGathering,
  checkParticipationStatus,
} from '@/axios/gather/apis';
import { useState } from 'react';

interface JoinBoxSectionProps {
  gatheringId: number;
  name: string;
  themeName: string;
  participantCount: number;
  capacity: number;
}

export default function JoinBoxSection({
  gatheringId,
  name,
  themeName,
  participantCount: initialParticipantCount,
  capacity,
}: JoinBoxSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [participantCount, setParticipantCount] = useState(
    initialParticipantCount
  );
  const [isParticipating, setIsParticipating] = useState(false);

  const participationRate = (participantCount / capacity) * 100;
  const isRecruiting = participantCount < capacity;
  const isExpanded = searchParams.has('joinbox');

  const { mutate: participate } = useMutation({
    mutationFn: () => participateGathering(gatheringId),
    onSuccess: () => {
      setParticipantCount((prev) => prev + 1);
      setIsParticipating(true);
      queryClient.invalidateQueries({
        queryKey: ['gathering-detail', gatheringId],
      });
    },
  });

  const { mutate: cancel } = useMutation({
    mutationFn: () => cancelParticipation(gatheringId),
    onSuccess: () => {
      setParticipantCount((prev) => prev - 1);
      setIsParticipating(false);
      queryClient.invalidateQueries({
        queryKey: ['gathering-detail', gatheringId],
      });
    },
  });

  const handleParticipation = () => {
    if (isParticipating) {
      cancel();
    } else {
      participate();
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (isExpanded) {
      current.delete('joinbox');
    } else {
      current.set('joinbox', 'expanded');
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const getButtonText = () => {
    if (isParticipating) return '참여 취소';
    if (isRecruiting) return '참여하기';
    return '모집완료';
  };

  return (
    <aside className="w-full min-[1000px]:w-[369px]">
      {/* 모바일 뷰 */}
      <div className="min-[1000px]:hidden">
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="mx-auto w-full max-w-screen-xl">
            {isExpanded && (
              <div className="mx-[17px] rounded-lg border border-secondary-70 bg-[#17171C] p-4 min-[420px]:mx-[104px]">
                <div className="mb-6">
                  <h2 className="mb-2 text-xl font-bold text-text-default">
                    {name}
                  </h2>
                  <p className="text-secondary-50">{themeName}</p>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center text-sm text-text-default">
                    <Image
                      src="/icons/human.svg"
                      alt="participants"
                      width={16}
                      height={16}
                      className="mr-1"
                    />
                    <span>
                      {participantCount}/{capacity}
                    </span>
                    <span className="mx-2">·</span>
                    <span
                      className={
                        isRecruiting ? 'text-primary-40' : 'text-status-danger'
                      }
                    >
                      {isRecruiting ? '모집중' : '모집완료'}
                    </span>
                  </div>
                  <div className="relative h-1 w-full rounded-full bg-secondary-90">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-primary-40 transition-all duration-300"
                      style={{ width: `${participationRate}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mx-[17px] flex items-center justify-between gap-4 py-4 min-[420px]:mx-[104px]">
              <Button
                onClick={toggleExpand}
                className="flex h-11 items-center justify-center rounded-lg p-2"
                aria-label={isExpanded ? '접기' : '펼치기'}
              >
                <Image
                  src="/icons/gathering_chevron.svg"
                  alt="toggle button"
                  width={24}
                  height={24}
                  className={`transform transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              <div className="flex-1">
                <Button
                  variant="primary"
                  onClick={handleParticipation}
                  className="h-11 w-full text-base font-semibold"
                  disabled={!isRecruiting}
                >
                  {getButtonText()}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 데스크톱 뷰 */}
      <div className="hidden min-[1000px]:block">
        <div className="rounded-xl border border-secondary-70 bg-[#17171C]">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="mb-2 text-xl font-bold text-text-default">
                {name}
              </h2>
              <p className="text-secondary-50">{themeName}</p>
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center text-sm text-text-default">
                <Image
                  src="/icons/human.svg"
                  alt="participants"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <span>
                  {participantCount}/{capacity}
                </span>
                <span className="mx-2">·</span>
                <span
                  className={
                    isRecruiting ? 'text-primary-40' : 'text-status-danger'
                  }
                >
                  {isRecruiting ? '모집중' : '모집완료'}
                </span>
              </div>
              <div className="relative h-1 w-full rounded-full bg-secondary-90">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary-40 transition-all duration-300"
                  style={{ width: `${participationRate}%` }}
                />
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleParticipation}
              className="h-11 w-full text-base font-semibold"
              disabled={!isRecruiting}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}

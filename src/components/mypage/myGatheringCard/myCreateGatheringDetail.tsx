/* eslint-disable prettier/prettier */

import { useRouter } from 'next/navigation';
import GatheringBadge from '@/components/gathering/UI/GatheringBadge';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import { useModal } from '@/hooks/useModal';
import { useDropdown } from '@/hooks/useDropdown';
import { findLabelByValue } from '@/utils/mappingUtils';
import { locationList } from '@/constants/themeList';
import DeleteModal from '../deleteModal';

interface MyCreateGatheringDetailProps {
  location: string;
  dateTime: string;
  name: string;
  themeName: string;
  capacity: string;
  participantCount: string;
  gatheringId: number;
}

export default function MyCreateGatheringDetail({
  location,
  dateTime,
  name,
  themeName,
  capacity,
  participantCount,
  gatheringId,
}: MyCreateGatheringDetailProps) {
  const router = useRouter();

  const {
    isOpen: isDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const {
    isOpen: isMenuOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  } = useDropdown();

  const liDropdowns = [
    {
      label: '수정하기',
      clickHandler: () => {
        router.push(`/gathering/edit?gatheringId=${gatheringId}`); // 수정 페이지로 이동
      },
    },
    { label: '모임삭제', clickHandler: openDeleteModal },
  ];

  return (
    <div className="flex w-full justify-between md:pr-3 md:pt-3">
      <div className="flex flex-col gap-5 px-4 py-5 md:py-3">
        <div className="flex items-center gap-1 text-sm md:gap-[6px]">
          <GatheringBadge variant="primary" fontColor="secondary">
            {findLabelByValue(location, locationList)}
          </GatheringBadge>
          <GatheringBadge variant="secondary" fontColor="primary">
            {new Date(dateTime) > new Date() ? '모임 예정' : '모임 완료'}
          </GatheringBadge>
          <GatheringBadge variant="secondary" fontColor="primary">
            {participantCount === capacity ? (
              <span>
                <Image
                  src="/icons/check.svg"
                  width={16}
                  height={16}
                  alt="체크 이미지"
                />
                일정 확정
              </span>
            ) : (
              '일정 미확정'
            )}
          </GatheringBadge>
        </div>
        <div className="flex flex-col gap-[1px]">
          <p className="text-[18px] font-semibold">{name}</p>
          <p className="text-[14px] font-light text-secondary-40">
            {themeName}
          </p>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-text-secondary md:text-sm">
          <p>{formatDate(dateTime)}</p>
          <p>.</p>
          <Image
            src="/icons/gathering_icon.svg"
            width={20}
            height={20}
            alt="모임 아이콘"
          />
          <p>
            {participantCount}/{capacity}
          </p>
        </div>
      </div>

      <div className="group relative">
        <button type="button" onClick={toggleDropdown}>
          <Image
            src="/icons/see_more_icon.svg"
            width={24}
            height={24}
            alt="드롭다운 클릭 버튼"
          />
        </button>
        {isMenuOpen && (
          <ul className="absolute -right-2 z-50 mt-2 w-32 rounded-md bg-secondary-80 shadow-md md:-right-16">
            {liDropdowns.map((liDropdown) => (
              <li key={liDropdown.label}>
                <button
                  onClick={() => {
                    liDropdown.clickHandler();
                    closeDropdown();
                  }}
                  type="button"
                  className="w-full rounded-md px-4 py-2 text-left hover:bg-secondary-60"
                >
                  {liDropdown.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <DeleteModal
        isModal={isDeleteModal}
        setIsModal={closeDeleteModal}
        classification="gathering_delete"
        id={gatheringId}
      />
    </div>
  );
}

/* eslint-disable prettier/prettier */

import GatheringBadge from '@/components/gathering/GatheringBadge';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import CreateGatheringModal from '@/components/gathering/CreateGatheringModal';
import { useModal } from '@/hooks/useModal';
import DeleteModal from '../deleteModal';

interface MyCreateGatheringDetailProps {
  location: string;
  dateTime: string;
  name: string;
  themeName: string;
  capacity: string;
  participantCount: string;
}

export default function MyCreateGatheringDetail({
  location,
  dateTime,
  name,
  themeName,
  capacity,
  participantCount,
}: MyCreateGatheringDetailProps) {
  const {
    isOpen: isDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const {
    isOpen: isGatheringEditModal,
    openModal: openGatheringEditModal,
    closeModal: closeGatheringEditModal,
  } = useModal();

  const liDropdowns = [
    { label: '수정하기', clickHandler: openGatheringEditModal },
    { label: '삭제하기', clickHandler: openDeleteModal },
  ];

  return (
    <div className="flex w-full flex-row justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-1 text-sm md:gap-[6px]">
          <GatheringBadge variant="secondary">{location}</GatheringBadge>
          <GatheringBadge variant="tertiary">
            {new Date(dateTime) > new Date() ? '모임 예정' : '모임 완료'}
          </GatheringBadge>
          <GatheringBadge variant="primary">
            {participantCount === capacity ? (
              <span>
                <Image
                  src="/check.png"
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
        <div>
          <p className="text-sm font-semibold md:text-lg">{name}</p>
          <p className="text-xs font-light md:text-sm">{themeName}</p>
        </div>
        <div className="text-text-secondary flex items-center gap-1 text-[10px] md:text-sm">
          <p>{formatDate(dateTime)}</p>
          <p>.</p>
          <Image
            src="/gathering_icon.png"
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
        <Image
          src="/see_more_icon.png"
          width={24}
          height={24}
          alt="드롭다운 클릭 버튼"
        />
        <ul className="bg-secondary-80 absolute -right-10 z-50 mt-2 hidden w-32 rounded-md shadow-md group-hover:pointer-events-auto group-hover:block">
          {liDropdowns.map((liDropdown) => (
            <li key={liDropdown.label}>
              <button
                onClick={liDropdown.clickHandler}
                type="button"
                className="hover:bg-secondary-60 w-full px-4 py-2 text-left"
              >
                {liDropdown.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <CreateGatheringModal
        isOpen={isGatheringEditModal}
        onClose={closeGatheringEditModal}
      />
      <DeleteModal isModal={isDeleteModal} setIsModal={closeDeleteModal} />
    </div>
  );
}

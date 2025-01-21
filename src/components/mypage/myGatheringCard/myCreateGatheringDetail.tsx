/* eslint-disable prettier/prettier */

import GatheringBadge from '@/components/gathering/UI/GatheringBadge';
import { formatDate } from '@/utils/dateUtils';
import Image from 'next/image';
import GatheringModal from '@/components/gathering/GatheringModal';
import { useModal } from '@/hooks/useModal';
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
    { label: '모임취소', clickHandler: openDeleteModal },
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
        <div className="flex flex-col gap-[1px]">
          <p className="text-[18px] font-semibold">{name}</p>
          <p className="text-secondary-40 text-[14px] font-light">
            {themeName}
          </p>
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
        <ul className="bg-secondary-80 absolute -right-1 z-50 mt-2 hidden w-32 rounded-md shadow-md group-hover:pointer-events-auto group-hover:block md:-right-10 md:-right-3">
          {liDropdowns.map((liDropdown) => (
            <li key={liDropdown.label}>
              <button
                onClick={liDropdown.clickHandler}
                type="button"
                className="hover:bg-secondary-60 w-full rounded-md px-4 py-2 text-left"
              >
                {liDropdown.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <GatheringModal
        isOpen={isGatheringEditModal}
        onClose={closeGatheringEditModal}
      />
      <DeleteModal
        isModal={isDeleteModal}
        setIsModal={closeDeleteModal}
        classification="cancel"
      />
    </div>
  );
}

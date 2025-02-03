/* eslint-disable prettier/prettier */

import { ReviewDto } from '@/types/review.types';
import Image from 'next/image';
import { useDropdown } from '@/hooks/useDropdown';
import { useModal } from '@/hooks/useModal';
import Rating from '../@shared/rating/Rating';
import MyReviewModal from './myReviewModal';
import DeleteModal from './deleteModal';

export default function MyReviewCard({
  score,
  comment,
  createdAt,
  Gathering,
  User,
}: ReviewDto['get']) {
  const {
    isOpen: isMenuOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  } = useDropdown();
  const {
    isOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const liDropdowns = [
    { label: '수정하기', clickHandler: openEditModal },
    { label: '삭제하기', clickHandler: openDeleteModal },
  ];

  return (
    <article className="bg-default-tertiary relative flex w-full flex-col gap-2 rounded-xl md:max-h-[200px] md:flex-row xl:max-h-[170px]">
      <Image
        src={Gathering.image}
        alt={Gathering.themeName}
        width={240}
        height={170}
        quality={100}
        className="bg-default-tertiary w-full rounded-t-xl md:w-60 md:max-w-[192px] md:rounded-l-xl md:rounded-r-none"
      />

      <div className="mx-4 my-5 flex flex-1 flex-col justify-between md:mx-6 md:my-5">
        <div className="flex flex-col gap-[7px]">
          <div className="group relative flex items-center justify-between">
            <Rating rating={score} width={120} height={24} />
            <div className="relative">
              <button type="button" onClick={toggleDropdown}>
                <Image
                  src="/icons/see_more_icon.svg"
                  width={24}
                  height={24}
                  alt="드롭다운 클릭 버튼"
                />
              </button>
              {isMenuOpen && (
                <ul className="bg-secondary-80 absolute -right-6 z-50 mt-2 w-32 rounded-md shadow-md md:-right-20">
                  {liDropdowns.map((liDropdown) => (
                    <li key={liDropdown.label}>
                      <button
                        onClick={() => {
                          liDropdown.clickHandler();
                          closeDropdown();
                        }}
                        type="button"
                        className="hover:bg-secondary-60 w-full rounded-md px-4 py-2 text-left"
                      >
                        {liDropdown.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <h2 className="text-secondary-40 text-xs font-medium">
            {Gathering.themeName}
          </h2>
          <p className="text-sm font-medium text-white md:mt-5">{comment}</p>
        </div>
      </div>
      <MyReviewModal
        isModal={isEditModal}
        setIsModal={closeEditModal}
        comment={comment}
        score={score}
      />
      <DeleteModal
        isModal={isDeleteModal}
        setIsModal={closeDeleteModal}
        classification="delete"
      />
    </article>
  );
}

import { useState } from 'react';
import Image from 'next/image';
import { useDropdown } from '@/hooks/useDropdown';
import { useModal } from '@/hooks/useModal';
import { MyReviewParmas } from '@/types/mypage.types';
import Rating from '../@shared/rating/Rating';
import MyReviewModal from './myReviewModal';
import DeleteModal from './deleteModal';
import Link from 'next/link';

export default function MyReviewCard({
  reviewId,
  themeName,
  image,
  comment,
  score,
  gatheringId,
}: MyReviewParmas) {
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
  const [isError, setIsError] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);

  const handleError = () => {
    setIsError(true);
    setImgSrc('/images/theme_default.png');
  };

  const liDropdowns = [
    { label: '수정하기', clickHandler: openEditModal },
    { label: '삭제하기', clickHandler: openDeleteModal },
  ];

  return (
    <article className="relative flex w-full flex-col gap-2 rounded-2xl bg-default-tertiary xs:max-h-[170px] xs:flex-row">
      <Link href={`/gathering/${gatheringId}`}>
        <Image
          src={imgSrc}
          onError={handleError}
          alt={themeName}
          width={240}
          height={170}
          quality={100}
          className={`h-[292px] w-full rounded-t-2xl bg-default-tertiary xs:h-[170px] xs:w-[192px] md:rounded-l-2xl md:rounded-r-none ${isError ? 'object-cover' : ''}`}
        />
      </Link>
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
                <ul className="absolute -right-6 z-50 mt-2 w-32 rounded-md bg-secondary-80 shadow-md xl:-right-20">
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
          </div>

          <h2 className="text-xs font-medium text-secondary-40">{themeName}</h2>
          <p className="text-sm font-medium text-white md:mt-5">{comment}</p>
        </div>
      </div>
      <MyReviewModal
        isModal={isEditModal}
        setIsModal={closeEditModal}
        comment={comment}
        score={score}
        id={reviewId}
      />
      <DeleteModal
        id={reviewId}
        isModal={isDeleteModal}
        setIsModal={closeDeleteModal}
        classification="review_delete"
      />
    </article>
  );
}

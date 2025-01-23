'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import Modal from '@/components/@shared/Modal';
import Input from '@/components/@shared/input/Input';
import Button from '@/components/@shared/button/Button';
import clsx from 'clsx';
import { postMyImage, updateMyProfile } from '@/axios/mypage/api';
import useToast from '@/hooks/useToast';
import Toast from '../@shared/Toast';

interface MyProfileEditModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
  image: string;
  onProfileUpdate: (updatedNickname: string, updatedImage: string) => void;
}

export default function MyProfileEditModal({
  isModal,
  setIsModal,
  nickname,
  image,
  onProfileUpdate,
}: MyProfileEditModalProps) {
  const [img, setImg] = useState<string | null>(null);
  const [updatedNickname, setUpdatedNickname] = useState<string>(nickname);
  const { toastMessage, toastVisible, toastType, handleError, handleSuccess } =
    useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const closeModalhandler = () => {
    setIsModal(false);
    setImg(null);
    setUpdatedNickname(nickname);
  };

  const isModified =
    (updatedNickname.trim() !== '' && nickname !== updatedNickname) ||
    (img && img !== image);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isEnglishName = /^[a-zA-Z0-9._-]+$/.test(file.name);
    if (!isEnglishName) {
      handleError('파일 이름은 영어로만 이루어져야 합니다.');
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      handleError('파일 크기는 5MB 이하여야만 합니다.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImg(previewUrl);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedNickname(e.target.value);
  };

  // api put
  const handleProfileUpdate = async () => {
    try {
      let uploadedImageUrl = image;
      if (
        fileInputRef.current?.files?.[0] &&
        fileInputRef.current.files[0]?.name !== image
      ) {
        const file = fileInputRef.current.files[0];
        const response = await postMyImage({ image: file });
        uploadedImageUrl = response;
      }
      await updateMyProfile({
        nickname: updatedNickname,
        image: uploadedImageUrl,
      });
      handleSuccess('프로필이 성공적으로 업데이트되었습니다.');
      onProfileUpdate(updatedNickname, uploadedImageUrl);
      closeModalhandler();
    } catch (error) {
      handleError('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={closeModalhandler}
      customDimStyle="w-[307px] md:w-[472px]"
    >
      <div className="flex flex-col justify-between gap-5">
        <p className="text-base font-bold">프로필 수정하기</p>
        <div className="rounded-full">
          <div
            className={clsx(
              'relative flex items-center justify-center overflow-hidden',
              {
                'w-118 h-118 rounded-full': img || image,
              }
            )}
          >
            <Image
              src={img || image || '/icons/edit_profile_image_default.svg'}
              width={117}
              height={117}
              alt="프로필 이미지 미리보기"
              className={clsx({ 'h-[118px] rounded-full': img || image })}
            />
          </div>
          <button type="button" onClick={triggerFileInput}>
            <Image
              src="/icons/btn_edit.svg"
              width={37}
              height={37}
              alt="프로필이미지 수정 버튼 이미지"
              className="absolute bottom-[200px] left-[175px] md:bottom-[200px] md:left-[260px]"
            />
          </button>
          <input
            type="file"
            id="profile_image-input"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <Input
          label="닉네임"
          fontSize="14"
          gap="8"
          inputProps={{
            value: updatedNickname,
            onChange: handleNicknameChange,
          }}
        />
        <div className="flex w-full gap-3 ">
          <Button
            variant="tertiary"
            fontSize="16"
            onClick={closeModalhandler}
            className="w-full"
          >
            취소하기
          </Button>
          <Button
            variant="primary-gray"
            fontSize="16"
            disabled={!isModified}
            className="w-full"
            onClick={handleProfileUpdate}
          >
            수정하기
          </Button>
        </div>
        {toastVisible && <Toast message={toastMessage} type={toastType} />}
      </div>
    </Modal>
  );
}

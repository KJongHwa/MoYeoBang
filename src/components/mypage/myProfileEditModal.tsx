'use client';

import { useState } from 'react';
import Image from 'next/image';

import Modal from '@/components/@shared/Modal';
import Input from '@/components/@shared/Input';
import Button from '@/components/@shared/Button';

interface MyProfileEditModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  nickname: string;
  image: string;
}

export default function MyProfileEditModal({
  isModal,
  setIsModal,
  nickname,
  image,
}: MyProfileEditModalProps) {
  const [img, setImg] = useState<string | null>(null);

  const closeModalhandler = () => {
    setIsModal(false);
    setImg(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isEnglishName = /^[a-zA-Z0-9._-]+$/.test(file.name);
    if (!isEnglishName) {
      alert('파일 이름은 영어로만 이루어져야 합니다.');
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert('파일 크기는 5MB 이하여야만 합니다.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImg(previewUrl);
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      'profile_image-input'
    ) as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  return (
    <Modal
      isOpen={isModal}
      onClose={closeModalhandler}
      customDimStyle="w-[400px]"
    >
      <div className="flex flex-col gap-5">
        <p className="text-base font-bold">프로필 수정하기</p>
        <div className="h-[65px] w-[65px] rounded-full">
          <div
            className={`relative flex items-center justify-center overflow-hidden ${
              img ? 'w-65 h-65 rounded-full' : ''
            }`}
          >
            <Image
              src={img || '/profile_image_default.png'}
              width={65}
              height={65}
              alt="프로필 이미지 미리보기"
              className={img ? 'h-[65px] rounded-full' : ''}
            />
          </div>
          <button type="button" onClick={triggerFileInput}>
            <Image
              src="/edit.png"
              width={30}
              height={30}
              alt="프로필이미지 수정 버튼 이미지"
              className="absolute bottom-[180px] left-[65px]"
            />
          </button>
          <input
            type="file"
            id="profile_image-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <Input placeholder={nickname} label="닉네임" fontSize="14" gap="8" />
        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={closeModalhandler}>
            취소하기
          </Button>
          <Button variant="primary" disabled>
            수정하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}

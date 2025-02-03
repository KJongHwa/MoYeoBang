'use client';

import EmptyElement from '@/components/@shared/EmptyElement';
import Toast from '@/components/@shared/Toast';
import GatheringCard from '@/components/gathering/GatheringCard';
import { useSearchGathering } from '@/hooks/useSearchGathering';
import useToast from '@/hooks/useToast';
import Image from 'next/image';
import { useState } from 'react';

const searchWords = ['미스터리', '방탈모집중', '방'];
export default function Search() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { toastMessage, toastVisible, toastType, handleError } = useToast();
  const { data: searchGatherings, isLoading: isGatheringLoading } =
    useSearchGathering(searchQuery);
  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchGatheringGet = () => {
    if (searchKeyword.trim() === '') {
      handleError('검색 키워드가 없습니다');
      return;
    }

    setSearchQuery(searchKeyword);
  };

  if (isGatheringLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full justify-center gap-12 py-24 md:py-32">
      <div className="flex flex-col gap-5">
        <section className="relative flex h-[50px] w-[335px] items-center rounded-md border-[1px] border-secondary-60 md:w-[644px] xl:w-[657px]">
          <button
            type="submit"
            className="px-3"
            onClick={handleSearchGatheringGet}
          >
            <Image
              src="/icons/search.svg"
              alt="검색 버튼"
              width={24}
              height={24}
            />
          </button>
          <input
            type="text"
            placeholder="제목/장르 검색해주세요"
            className="w-full bg-secondary-bg pr-3 text-base outline-none"
            value={searchKeyword}
            onChange={handleSearchKeywordChange}
          />
        </section>
        <section className="flex justify-center text-base">
          <div className="flex-col items-center justify-center">
            <p className="text-secondary-60">추천 검색어</p>
            <div className="flex w-full justify-center gap-3">
              {searchWords.map((searchWord) => (
                // eslint-disable-next-line react/button-has-type
                <button
                  key={searchWord}
                  className="rounded-lg bg-secondary-100 px-2 py-1 text-secondary-50"
                  onClick={() => {
                    setSearchKeyword(searchWord);
                    setSearchQuery(searchWord);
                  }}
                >
                  {searchWord}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="pt-6 ">
          {searchQuery && searchGatherings?.length !== 0 && (
            <>
              <p className="pb-3">{searchQuery} 검색 결과 입니다.</p>
              <div className="grid h-full w-full grid-cols-1 gap-3 text-white">
                {searchGatherings?.map((searchGathering) => (
                  <GatheringCard
                    key={searchGathering.gatheringId}
                    {...searchGathering}
                  />
                ))}
              </div>
            </>
          )}
        </section>
        {searchQuery && searchGatherings?.length === 0 && (
          <EmptyElement>해당 검색 결과가 없어요.</EmptyElement>
        )}
        {toastVisible && <Toast message={toastMessage} type={toastType} />}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

import CardMotion from '@/components/@shared/animation/CardMotion';
import EmptyElement from '@/components/@shared/EmptyElement';
import Spinner from '@/components/@shared/Spinner';
import Toast from '@/components/@shared/Toast';
import GatheringCard from '@/components/gathering/GatheringCard';
import { useSearchGathering } from '@/hooks/useSearchGathering';
import useToast from '@/hooks/useToast';
import Image from 'next/image';

const searchWords = ['모여방', '팀이', '짱이다'];

export default function Search({ params }: { params: { keyword: string } }) {
  const initialKeyword =
    params?.keyword && decodeURIComponent(params.keyword) !== 'default-keyword'
      ? decodeURIComponent(params.keyword)
      : '';

  const [searchKeyword, setSearchKeyword] = useState<string>(initialKeyword);
  const [searchQuery, setSearchQuery] = useState<string>(initialKeyword);

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
    return <Spinner />;
  }

  return (
    <div className="mx-auto flex h-full w-full justify-center gap-12 py-24 md:py-32">
      <title>
        {searchQuery
          ? `모여방 | ${searchQuery} 검색 결과`
          : '모여방 | 방탈출 검색'}
      </title>
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchGatheringGet();
              }
            }}
          />
        </section>
        <section className="flex justify-center text-base">
          <div className="flex-col items-center justify-center">
            <p className="text-center text-secondary-60">추천 검색어</p>
            <div className="flex w-full justify-center gap-3">
              {searchWords.map((searchWord) => (
                <button
                  key={searchWord}
                  type="button"
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
        <section className="mb-[180px] pt-6">
          {searchQuery && searchGatherings?.length !== 0 && (
            <>
              <p className="pb-3">{searchQuery} 검색 결과 입니다.</p>
              <div className="grid h-full w-full grid-cols-1 gap-5 text-white">
                {searchGatherings?.map((searchGathering) => (
                  <CardMotion key={searchGathering.gatheringId}>
                    <GatheringCard {...searchGathering} />
                  </CardMotion>
                ))}
              </div>
            </>
          )}
          {searchQuery && searchGatherings?.length === 0 && (
            <EmptyElement>해당 검색 결과가 없어요.</EmptyElement>
          )}
        </section>

        {toastVisible && <Toast message={toastMessage} type={toastType} />}
      </div>
    </div>
  );
}

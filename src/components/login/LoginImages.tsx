import Image from 'next/image';

export default function LoginImages() {
  return (
    <>
      <Image
        src="/login/Image_login_L.png"
        alt="로그인 캐릭터"
        width={431}
        height={504}
        className="absolute right-[-350px] top-0 z-0 hidden xl:block"
      />
      <Image
        src="/login/Image_login_puzzle.png"
        alt="퍼즐 캐릭터"
        width={203}
        height={198}
        className="absolute bottom-8 left-[-170px] z-0 hidden xl:block"
      />
      <Image
        src="/login/Image_login_M.png"
        alt="로그인 캐릭터"
        width={456}
        height={256}
        className="absolute left-[-160px] top-[700px] z-100 hidden md:block xl:hidden"
      />
      <Image
        src="/login/Image_login_S.png"
        alt="로그인 캐릭터"
        width={244}
        height={164}
        className="top-[700px] z-100 md:hidden"
      />
    </>
  );
}

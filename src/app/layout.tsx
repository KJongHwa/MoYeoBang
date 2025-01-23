import Head from 'next/head';

import Header from '../components/@shared/Header';
import { Providers } from '../providers/providers';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <title>모여방</title>
        <meta
          name="description"
          content="방탈출 팀원을 모집하고, 방탈출 테마에 대한 경험을 나눌 수 있는 또 하나의 방. 일단 모여방!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/icons/favicon.svg" />
        <meta
          name="keywords"
          content="방탈출, 방탈출 모임, 방탈출 모집, 방탈출 리뷰, 모여방"
        />
        <meta property="og:title" content="모여방" />
        <meta
          property="og:description"
          content="방탈출 팀원을 모집하고, 방탈출 테마에 대한 경험을 나눌 수 있는 또 하나의 방. 일단 모여방!"
        />
        <meta property="og:url" content="https://moyeobang.vercel.app/" />
        <meta property="og:image" content="/images/thumnail.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <body>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

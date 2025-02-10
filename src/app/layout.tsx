import type { Metadata } from 'next';
import Header from '../components/@shared/Header';
import { Providers } from '../providers/providers';
import '../styles/globals.css';
import '../styles/scrollbar.css';

export const metadata: Metadata = {
  title: '모여방',
  description:
    '방탈출 팀원을 모집하고, 방탈출 테마에 대한 경험을 나눌 수 있는 또 하나의 방. 일단 모여방!',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/icons/favicon.svg',
  },
  keywords: ['방탈출', '방탈출 모임', '방탈출 모집', '방탈출 리뷰', '모여방'],
  openGraph: {
    title: '모여방',
    description:
      '방탈출 팀원을 모집하고, 방탈출 테마에 대한 경험을 나눌 수 있는 또 하나의 방. 일단 모여방!',
    url: 'https://moyeobang.vercel.app/',
    images: [
      {
        url: '/images/thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="scrollbar-x-hidden default-scrollbar">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

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
      <body className="bg-black text-white">
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

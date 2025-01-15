import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="relative mx-10 mb-5 mt-48 h-full xl:mx-auto xl:w-[1166px]">
      {children}
    </main>
  );
}

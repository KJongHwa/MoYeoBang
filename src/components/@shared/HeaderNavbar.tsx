/* eslint-disable prettier/prettier */
import Link from 'next/link';

export default function HeaderNavBar({ onClose }: { onClose: () => void }) {
  const navLinks = [
    { label: '모임 찾기', href: '/gathering' },
    { label: '찜한 모임', href: '/likes' },
    { label: '모든 리뷰', href: '/allreview' },
  ];

  return (
    <div className="fixed inset-0 z-20 flex flex-col bg-secondary-bg">
      <div className="mt-16 flex flex-col">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="mx-3 mb-4 rounded-xl px-7 py-4 text-xl font-bold transition duration-300 hover:bg-primary-40"
          >
            <button
              onClick={onClose}
              type="button"
              className="w-full text-left"
            >
              {link.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

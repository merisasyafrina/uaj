import Image from 'next/image';
import Link from 'next/link';
import { SmoothScrollLink } from '@/components/SmoothScrollLink';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-[#142456]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[#142456]/80">
      <div className="mx-auto flex h-14 max-w-5xl flex-nowrap items-center justify-between gap-3 overflow-hidden px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label="Khusyuk Itu Mudah - Beranda"
        >
          <Image
            src="/logo.png"
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
          />
          <span className="truncate font-heading text-base font-semibold text-white sm:text-lg md:text-xl">
            Arifin Jayadiningrat
          </span>
        </Link>
        <nav className="flex shrink-0 items-center" aria-label="Navigasi utama">
          <SmoothScrollLink
            href="#bulk-order"
            className="whitespace-nowrap text-sm text-white/90 transition-colors hover:text-white"
          >
            Baca Sekarang
          </SmoothScrollLink>
        </nav>
      </div>
    </header>
  );
}

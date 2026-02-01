import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--muted)]/20 bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Khusyuk Itu Mudah - Beranda">
          {/* Logo placeholder */}
          <div
            className="h-9 w-9 rounded-lg bg-[var(--accent)]/20 sm:h-10 sm:w-10"
            aria-hidden
          />
          <span className="font-heading text-lg font-semibold text-[var(--foreground)] sm:text-xl">
            Khusyuk Itu Mudah
          </span>
        </Link>
        <nav className="flex items-center gap-4" aria-label="Navigasi utama">
          <a
            href="#unduh"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Unduh
          </a>
          <a
            href="#donasi"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Donasi
          </a>
        </nav>
      </div>
    </header>
  );
}

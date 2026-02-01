import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--muted)]/20 bg-[var(--background)]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Khusyuk Itu Mudah - Beranda">
            {/* Logo placeholder */}
            <div
              className="h-8 w-8 rounded-lg bg-[var(--accent)]/20 sm:h-9 sm:w-9"
              aria-hidden
            />
            <span className="font-heading text-base font-semibold text-[var(--foreground)]">
              Khusyuk Itu Mudah
            </span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--muted)]">
            <a href="#unduh" className="hover:text-[var(--foreground)] transition-colors">
              Unduh Buku
            </a>
            <a href="#feedback" className="hover:text-[var(--foreground)] transition-colors">
              Masukan
            </a>
            <a href="#donasi" className="hover:text-[var(--foreground)] transition-colors">
              Donasi
            </a>
          </div>
        </div>
        <p className="mt-6 border-t border-[var(--muted)]/20 pt-6 text-center text-sm text-[var(--muted)]">
          © {currentYear} Khusyuk Itu Mudah. Buku digital.
        </p>
      </div>
    </footer>
  );
}

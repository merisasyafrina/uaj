'use client';

import { useState } from 'react';
import Image from 'next/image';

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
const SYNOPSIS = `
Buku ini membahas cara praktis meraih khusyuk dalam shalat. Dibuat dengan bahasa yang mudah dipahami dan dilengkapi langkah-langkah yang bisa langsung dipraktikkan. Cocok untuk siapa saja yang ingin memperbaiki kualitas ibadah shalatnya.
`.trim();

export function BookSection() {
  const [bannerError, setBannerError] = useState(false);
  const shareText = encodeURIComponent('Khusyuk Itu Mudah – Buku Digital Gratis');
  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://khusyuk-itu-mudah.vercel.app';
  const shareUrlEnc = encodeURIComponent(shareUrl);

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Banner / cover area — smaller on mobile */}
        <div className="mb-8 sm:mb-10 flex justify-center">
          <div className="relative h-56 w-40 sm:h-64 sm:w-48 rounded-lg bg-slate-200 dark:bg-slate-700 shadow-xl overflow-hidden">
            {!bannerError && (
            <Image
              src="/banner.png"
              alt="Sampul Khusyuk Itu Mudah"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 160px, 192px"
                priority
                onError={() => setBannerError(true)}
              />
            )}
            {bannerError && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 dark:text-slate-400 text-center p-4">
                <span className="text-sm font-medium">Sampul buku</span>
              </div>
            )}
          </div>
        </div>

        {/* Title + meta — mobile-first typography */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-slate-900 dark:text-white mb-2">
          Khusyuk Itu Mudah
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
          Buku digital · Unduh gratis
        </p>

        {/* Bismillah */}
        <p
          className="text-center text-xl sm:text-2xl text-slate-700 dark:text-slate-300 mb-6 sm:mb-8 font-arabic leading-relaxed"
          dir="rtl"
          lang="ar"
        >
          {BISMILLAH}
        </p>

        {/* Synopsis */}
        <div className="prose prose-slate dark:prose-invert max-w-none mx-auto mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Sinopsis
          </h2>
          <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line text-sm sm:text-base">
            {SYNOPSIS}
          </p>
        </div>

        {/* Share — stacked on mobile, row on larger screens; touch-friendly */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center sm:items-center gap-3">
          <span className="text-slate-600 dark:text-slate-400 text-sm sm:mr-1">
            Bagikan:
          </span>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/?text=${shareText}%20${shareUrlEnc}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 min-h-[44px] text-sm font-medium text-white hover:bg-green-700 active:bg-green-800 transition touch-manipulation"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEnc}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-3 min-h-[44px] text-sm font-medium text-white hover:bg-sky-600 active:bg-sky-700 transition touch-manipulation"
            >
              X (Twitter)
            </a>
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Khusyuk Itu Mudah',
                    text: 'Khusyuk Itu Mudah – Buku Digital Gratis',
                    url: shareUrl,
                  });
                } else {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Link disalin ke clipboard.');
                }
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-600 px-4 py-3 min-h-[44px] text-sm font-medium text-white hover:bg-slate-700 active:bg-slate-800 transition touch-manipulation"
            >
              Salin link
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

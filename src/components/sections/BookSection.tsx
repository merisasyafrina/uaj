'use client';

import { useState } from 'react';
import Image from 'next/image';

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
const SYNOPSIS = `
Banyak orang bertanya,
Bagaimana salat bisa sampai menitikkan air mata?
Pertanyaan ini muncul karena salat sering dijalani sebagai rutinitas. Gerakannya benar, bacaannya hafal, tetapi hati terasa jauh. Tanpa disadari, seseorang bisa saja sedang salat, namun ingatannya ke mana-mana. Di situlah bahaya terbesar: melupakan Allah saat sedang berdiri di hadapan-Nya.

Padahal Al-Qur’an menegaskan bahwa Allah menghendaki kemudahan. Allah tidak ingin memberatkan hamba-Nya, termasuk dalam ibadah yang paling agung: salat.

Buku ini membahas inti khusyu yang jarang dibahas. Dibuat dengan bahasa yang mudah dipahami agar meresap sampai ke hati. Buku ini hadir sebagai pengingat bahwa kemuliaan sejati ada pada kerendahan hati. Cocok untuk siapa saja yang ingin memperbaiki kualitas ibadah salatnya.
`.trim();

const AuthorProfile = `
Arifin Jayadiningrat bin Abdurrahman Romli adalah seorang ustadz dan konsultan pendidikan karakter.  Beliau menempuh pendidikan di Pondok Pesantren Darussalam Gontor, IPD Gontor, IAIN Jakarta, Zaituna University (Tunisia), Amir Abdul Qodir University (Aljazair), Al-Azhar University (Mesir), dan Jamiat Duwal Arabiyah (Universitas Liga Arab) dengan fokus pada aqidah, filsafat, serta perbandingan hukum Islam. Aktif sebagai ketua di Aksi Peduli Bangsa, Yayasan Pendidikan Islam Al Madaniyah Al Husna, serta aktif di dalam tim kurikulum Milbos dan STIPI Maghfirah. Beliau juga merupakan pembimbing umroh dan haji sejak 1992. Moto utama mengumpulkan bekal akhirat untuk kehidupan yang abadi.
`.trim();

export function BookSection() {
  const [bannerError, setBannerError] = useState(false);
  const shareText = encodeURIComponent('Khusyuk Itu Mudah');
  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://khusyuk-itu-mudah.vercel.app/';
  const orderUrl =
  typeof window !== 'undefined'
    ? window.location.href
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://s.id/pobukukhusyuk';
  const shareUrlEnc = encodeURIComponent(shareUrl);
  

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Banner / cover area — smaller on mobile */}
        <div className="mb-8 sm:mb-10 flex justify-center">
          <div className="relative h-56 w-40 sm:h-64 sm:w-48 rounded-lg bg-slate-200 dark:bg-slate-700 shadow-xl overflow-hidden">
            {!bannerError && (
            <Image
              src="/banner.jpeg"
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
        {/* <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 min-h-[44px] text-sm font-medium text-white hover:bg-green-700 active:bg-green-800 transition touch-manipulation"
          >
            Pre-order Sekarang
          </a>
        </div> */}

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

        {/* Profil Penulis */}
        <div className="prose prose-slate dark:prose-invert max-w-none mx-auto mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Profil Penulis
          </h2>
          <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line text-sm sm:text-base">
            {AuthorProfile}
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
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Khusyuk Itu Mudah',
                    text: 'Khusyuk Itu Mudah',
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

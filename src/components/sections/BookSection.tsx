'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

const BISMILLAH = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
const SYNOPSIS = `
Banyak orang bertanya,
Bagaimana salat bisa sampai menitikkan air mata?
Pertanyaan ini muncul karena salat sering dijalani sebagai rutinitas. Gerakannya benar, bacaannya hafal, tetapi hati terasa jauh. Tanpa disadari, seseorang bisa saja sedang salat, namun ingatannya ke mana-mana. Di situlah kekurangan cukup fatal : melupakan Allah saat sedang berdiri di hadapan-Nya.

Padahal Al-Qur’an menegaskan bahwa Allah menghendaki kemudahan dan Allah tidak ingin kesulitan bagi hambaNya.

Tentu bila berpikir mendalam ternyata Allah memudahkan segala urusan termasuk dalam ibadah yang paling agung: SALAT.

Buku ini membahas inti khusyu yang jarang dibahas. Dibuat dengan bahasa yang mudah dipahami agar meresap sampai ke hati. Buku ini hadir sebagai pengingat bahwa kemuliaan sejati ada pada kerendahan hati. Cocok untuk siapa saja yang ingin memperbaiki kualitas ibadah salatnya.
`.trim();

const AuthorProfile = `
Arifin Jayadiningrat bin Abdurrahman Romli adalah seorang ustadz dan konsultan pendidikan karakter.  Beliau menempuh pendidikan di Pondok Pesantren Darussalam Gontor, IPD Gontor, IAIN Jakarta, Zaituna University (Tunisia), Amir Abdul Qodir University Constantine (Aljazair), Al-Azhar University (Mesir), dan Jamiat Duwal Arabiyah (Universitas Liga Arab) dengan fokus pada aqidah, filsafat, serta perbandingan hukum Islam. 

Aktif sebagai ketua di Aksi Peduli Bangsa, Yayasan Pendidikan Islam Al Madaniyah Al Husna, serta aktif di dalam tim kurikulum Milbos dan STIPI Maghfirah. 

Moto utama mengumpulkan bekal akhirat untuk kehidupan yang abadi.
 `.trim();

const SHARE_TITLE = 'Khusyuk Itu Mudah';
const SHARE_DESCRIPTION = `Buku ini ditulis untuk menemani perjalanan hati. Terutama bagi yang ingin salat lebih tenang, hadir, dan dekat dengan Allah.

Cek selengkapnya di:`;

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function BookSection() {
  const [bannerError, setBannerError] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arifinjayadiningrat.com/';

  const shareTextForApi = `${SHARE_TITLE}\n\n${SHARE_DESCRIPTION}`;
  const shareTextForClipboard = `${SHARE_TITLE}\n\n${SHARE_DESCRIPTION}\n${shareUrl}`;

  const copyFullToClipboard = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareTextForClipboard).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        () => {}
      );
    }
  }, [shareTextForClipboard]);

  const handleShare = useCallback(async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: SHARE_TITLE,
          text: shareTextForApi,
          url: shareUrl,
        });
        copyFullToClipboard();
        return;
      }
      copyFullToClipboard();
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        copyFullToClipboard();
        return;
      }
      try {
        copyFullToClipboard();
      } catch {
        // ignore
      }
    }
  }, [shareUrl, shareTextForApi, shareTextForClipboard, copyFullToClipboard]);

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

        {/* Title + share icon */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-slate-900 dark:text-white">
            Khusyuk Itu Mudah
          </h1>
          <button
            type="button"
            onClick={handleShare}
            className="shrink-0 p-1.5 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
            aria-label={copied ? 'Link disalin' : 'Bagikan'}
            title={copied ? 'Link disalin' : 'Bagikan'}
          >
            <ShareIcon className="w-5 h-5" />
          </button>
          {copied && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              Link disalin
            </span>
          )}
        </div>

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
        
      </div>
    </section>
  );
}

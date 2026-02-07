'use client';

import { useState } from 'react';
import Image from 'next/image';

const DONATE_NOTE = `
Mari Ambil Bagian dalam Kebaikan. Semoga menjadi amal jariyah. Jazaakumullahu khairan.
`.trim();

export function DonateSection() {
  const [qrisError, setQrisError] = useState(false);

  return (
    <section id="donasi" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-md w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
          Donasi
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-6 text-sm sm:text-base">
          Ingin mendukung? Scan QRIS di bawah untuk donasi.
        </p>

        {/* QRIS: responsive — full width on small screens, max 14rem */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-[14rem] aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
            {!qrisError && (
              <Image
                src="/qris.png"
                alt="QRIS Donasi"
                fill
                className="object-contain p-2"
                sizes="(max-width: 384px) 100vw, 224px"
                onError={() => setQrisError(true)}
              />
            )}
            {qrisError && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 dark:text-slate-400 text-center p-4 text-sm">
                Flyer tidak tersedia
              </div>
            )}
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-400 text-sm text-center whitespace-pre-line">
          {DONATE_NOTE}
        </p>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';

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

        {/* QRIS: fitted like EventsSection — no padding, image edge-to-edge */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-[20rem] sm:max-w-[24rem] rounded-lg overflow-hidden">
            {!qrisError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/qris.jpeg"
                alt="QRIS Donasi"
                className="w-full h-auto block"
                onError={() => setQrisError(true)}
              />
            ) : (
              <div className="flex min-h-[12rem] items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-center p-4 text-sm">
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

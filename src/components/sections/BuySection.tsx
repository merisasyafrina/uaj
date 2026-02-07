'use client';

import { useState } from 'react';
import Image from 'next/image';

const orderUrl =
  typeof window !== 'undefined'
    ? window.location.href
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://s.id/pobukukhusyuk';

export function BuySection() {
  const [coverError, setCoverError] = useState(false);

  return (
    <section id="beli" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
          Beli
        </h2>

        {/* Book image */}
        <div className="flex justify-center mb-8">
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            <div className="relative w-[16.5rem] aspect-square rounded-xl bg-slate-200 dark:bg-slate-700">
              {!coverError && (
                <Image
                  src="/bookFlyer.jpeg"
                  alt="Sampul buku Khusyuk Itu Mudah"
                  fill
                  className="object-contain"
                  sizes="264px"
                  onError={() => setCoverError(true)}
                />
              )}
              {coverError && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 dark:text-slate-400 text-center p-4">
                  <span className="text-sm font-medium">Sampul buku</span>
                </div>
              )}
            </div>
          </a>
        </div>

        {/* Sambung ke Shopee CTA */}
        <div className="flex justify-center">
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 min-h-[52px] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 active:bg-orange-700 active:translate-y-0 active:shadow touch-manipulation"
          >
            Pre-order Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}

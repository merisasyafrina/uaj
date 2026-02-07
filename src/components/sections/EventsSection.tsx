'use client';

import { useState } from 'react';
import Image from 'next/image';
import eventsConfig from '@/config/events.json';
import type { EventsConfig } from '@/types/events';

const config = eventsConfig as EventsConfig;

function EventFlyer({ src, alt, unoptimized }: { src: string; alt: string; unoptimized?: boolean }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-slate-500 dark:text-slate-400 text-center p-2 text-xs">
        Flyer tidak tersedia
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="160px"
      unoptimized={unoptimized}
      onError={() => setError(true)}
    />
  );
}

export function EventsSection() {
  if (!config.events?.length) return null;

  return (
    <section id="acara" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
          {config.title}
        </h2>
        {config.subtitle && (
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8 sm:mb-10 text-sm sm:text-base">
            {config.subtitle}
          </p>
        )}

        <div className="space-y-8 sm:space-y-10">
          {config.events.map((event) => (
            <article
              key={event.id}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
                <div className="flex-shrink-0 mx-auto sm:mx-0 w-full max-w-[10rem] sm:max-w-none sm:w-40">
                  <div className="relative aspect-[5/6] w-full sm:h-48 sm:w-40 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <EventFlyer
                      src={event.flyerUrl}
                      alt={event.title}
                      unoptimized={event.flyerUrl.startsWith('http')}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    {event.date}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {event.description}
                  </p>
                  {/* {event.ctaUrl && (
                    <a
                      href={event.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-3 min-h-[44px] text-sm font-medium text-white hover:bg-sky-700 active:bg-sky-800 transition touch-manipulation"
                    >
                      {event.ctaLabel || 'Info lengkap'}
                    </a>
                  )} */}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

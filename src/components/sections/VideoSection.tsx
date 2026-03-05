'use client';

import { useState } from 'react';

// Video ID from URL: youtu.be/ugh-z8KNgT0 or youtube.com/watch?v=ugh-z8KNgT0
const YOUTUBE_VIDEO_ID: string = '9l0udCYaDXY';

const THUMBNAIL_URL = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;
const THUMBNAIL_FALLBACK = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`;
const EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`;

export function VideoSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  // Don't load iframe until user clicks — keeps initial page load light
  const handlePlay = () => setIsLoaded(true);

  if (YOUTUBE_VIDEO_ID === 'VIDEO_ID') {
    return (
      <section className="relative overflow-hidden bg-slate-100 dark:bg-slate-800/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 text-center mb-6 sm:mb-8">
            Video
          </h2>
          <div className="aspect-video rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm text-center p-6">
            Set <code className="bg-slate-300 dark:bg-slate-600 px-1.5 py-0.5 rounded">YOUTUBE_VIDEO_ID</code> in{' '}
            <code className="bg-slate-300 dark:bg-slate-600 px-1.5 py-0.5 rounded">VideoSection.tsx</code> to show your video.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-100 dark:bg-slate-800/50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 text-center mb-6 sm:mb-8">
          Video
        </h2> */}

        {/* Responsive 16:9 container — iframe loads only after click */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-900 shadow-xl">
          {!isLoaded ? (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 w-full h-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 rounded-lg"
              aria-label="Putar video"
            >
              {/* Thumbnail — no iframe loaded yet */}
              <img
                src={thumbError ? THUMBNAIL_FALLBACK : THUMBNAIL_URL}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setThumbError(true)}
              />
              {/* Play button overlay */}
              <span className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 transition-colors shadow-lg">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7L8 5z" />
                </svg>
              </span>
            </button>
          ) : (
            <iframe
              src={EMBED_URL}
              title="Video YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}

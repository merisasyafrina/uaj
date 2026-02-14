'use client';

import { useState } from 'react';
import wpSectionsConfig from '@/config/wp-sections.json';
import type { WPSectionBlock, WPSectionsConfig, WPSectionTextBlock } from '@/types/wp-section';

const config = wpSectionsConfig as WPSectionsConfig;

function WPSectionText({ block }: { block: WPSectionTextBlock }) {
  const { text, tag: Tag, italic, color } = block;
  const style = color ? { color } : undefined;
  return (
    <Tag
      className={
        Tag === 'h1'
          ? 'text-2xl sm:text-3xl font-bold'
          : Tag === 'h2'
            ? 'text-xl sm:text-2xl font-bold'
            : Tag === 'h3'
              ? 'text-lg sm:text-xl font-semibold'
              : 'text-sm sm:text-base'
      }
      style={style}
    >
      {italic ? <span className="italic">{text}</span> : text}
    </Tag>
  );
}

function WPSectionImageBlock({ image }: { image: WPSectionBlock['image'] }) {
  const [error, setError] = useState(false);
  if (!image) return null;

  if (error) {
    return (
      <div className="rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center min-h-[12rem]">
        <span className="text-sm text-slate-500 dark:text-slate-400">Gambar tidak tersedia</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.url}
      alt={image.alt}
      className="rounded-xl w-full h-auto block max-w-full"
      style={
        image.width != null && image.height != null
          ? { width: image.width, height: image.height, maxWidth: '100%', objectFit: 'contain' }
          : undefined
      }
      onError={() => setError(true)}
    />
  );
}

function SingleWPSection({ section }: { section: WPSectionBlock }) {
  const sectionStyle = section.backgroundColor
    ? { backgroundColor: section.backgroundColor }
    : undefined;

  return (
    <section
      id={section.id}
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
      style={sectionStyle}
    >
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-6">
          <WPSectionText block={section.title} />
        </div>

        {section.description && (
          <div className="text-center mb-6">
            <WPSectionText block={section.description} />
          </div>
        )}

        {section.image && (
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-[16.5rem]">
              <WPSectionImageBlock image={section.image} />
            </div>
          </div>
        )}

        {section.cta && (
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={section.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 min-h-[52px] text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5 active:bg-orange-700 active:translate-y-0 active:shadow touch-manipulation"
            >
              {section.cta.label}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Renders dynamic sections from WordPress (or wp-sections.json).
 * Place below EventsSection; when using WP API, pass the latest section or full list here.
 */
export function WPDynamicSection() {
  if (!config.sections?.length) return null;

  return (
    <>
      {config.sections.map((section) => (
        <SingleWPSection key={section.id} section={section} />
      ))}
    </>
  );
}

/**
 * Types for WordPress-driven dynamic sections.
 * Shape matches what you can send from WP (REST API or static export).
 */

export type WPSectionTextTag = 'h1' | 'h2' | 'h3' | 'p';

export type WPSectionTextBlock = {
  text: string;
  tag: WPSectionTextTag;
  italic?: boolean;
  /** CSS color (hex, rgb, or named). Example: "#1e293b" or "rgb(30, 41, 59)" */
  color?: string;
};

export type WPSectionImage = {
  url: string;
  alt: string;
  /** Optional: width/height from WP; if omitted, component uses natural dimensions */
  width?: number;
  height?: number;
};

export type WPSectionCTA = {
  href: string;
  label: string;
};

export type WPSectionBlock = {
  id: string;
  /** Section background: CSS color (hex, rgb, or Tailwind-compatible class name for later). */
  backgroundColor?: string;
  title: WPSectionTextBlock;
  description?: WPSectionTextBlock;
  image?: WPSectionImage;
  cta?: WPSectionCTA;
};

export type WPSectionsConfig = {
  /** Sections in display order; "latest" = last item when fetching from WP. */
  sections: WPSectionBlock[];
};

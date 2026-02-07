'use client';

import { type ComponentPropsWithoutRef } from 'react';

const DURATION_MS = 5;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function SmoothScrollLink({
  href,
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  if (!href?.startsWith('#')) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  const id = href.slice(1);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    const start = window.scrollY;
    const distance = top - start;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION_MS, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

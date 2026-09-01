"use client";

import { useRef, useState } from "react";

export type CaseStudySlide = { src: string; alt: string };

const GRID = 16;
const STEP_MS = 180;

const PREV = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M18.25 11C18.6642 11 19 11.3358 19 11.75C19 12.1642 18.6642 12.5 18.25 12.5L7.35127 12.5L10.8262 16.2698C11.0913 16.5881 11.0483 17.061 10.7301 17.3261C10.4119 17.5913 9.939 17.5483 9.67383 17.2301L5.17383 12.2301C4.94205 11.952 4.94205 11.548 5.17383 11.2698L9.67383 6.26984C9.939 5.95163 10.4119 5.90864 10.7301 6.17382C11.0483 6.43899 11.0913 6.91191 10.8262 7.23012L7.35129 11L18.25 11Z" fill="#002E71" />
  </svg>
);

const NEXT = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.75 11C5.33579 11 5 11.3358 5 11.75C5 12.1642 5.33579 12.5 5.75 12.5L16.6487 12.5L13.1738 16.2698C12.9087 16.5881 12.9517 17.061 13.2699 17.3261C13.5881 17.5913 14.061 17.5483 14.3262 17.2301L18.8262 12.2301C19.0579 11.952 19.0579 11.548 18.8262 11.2698L14.3262 6.26984C14.061 5.95163 13.5881 5.90864 13.2699 6.17382C12.9517 6.43899 12.9087 6.91191 13.1738 7.23012L16.6487 11L5.75 11Z" fill="#002E71" />
  </svg>
);

function shuffle(n: number) {
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
  }
  return indices;
}

export function CaseStudyGallery({
  slides,
  variant,
  showDots,
}: {
  slides: CaseStudySlide[];
  variant?: "phone";
  showDots?: boolean;
}) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(slides[0].src);
  const transitioning = useRef(false);
  const pixelsRef = useRef<HTMLDivElement>(null);

  const goTo = (idx: number) => {
    const next = (idx + slides.length) % slides.length;
    if (transitioning.current || next === i) return;

    const pixels = pixelsRef.current?.children;
    if (!pixels) {
      setI(next);
      setShown(slides[next].src);
      return;
    }

    transitioning.current = true;
    setI(next);

    const total = pixels.length;
    const per = STEP_MS / total;
    let order = shuffle(total);

    order.forEach((pi, k) => {
      window.setTimeout(() => {
        (pixels[pi] as HTMLElement).style.display = "block";
      }, k * per);
    });

    window.setTimeout(() => {
      setShown(slides[next].src);
      order = shuffle(total);
      order.forEach((pi, k) => {
        window.setTimeout(() => {
          (pixels[pi] as HTMLElement).style.display = "none";
        }, k * per);
      });
      window.setTimeout(() => {
        transitioning.current = false;
      }, STEP_MS + 30);
    }, STEP_MS + 30);
  };

  const cells = Array.from({ length: GRID * GRID }, (_, n) => {
    const size = 100 / GRID;
    const col = n % GRID;
    const row = Math.floor(n / GRID);
    return { n, size, col, row };
  });

  return (
    <div className={`cs-gallery cs-gallery--fixed-frame cs-gallery--react${variant === "phone" ? " cs-gallery--phone" : ""}`}>
      <div className="cs-gallery__main">
        <img src={shown} alt={slides[i].alt} />
        <div
          ref={pixelsRef}
          aria-hidden
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 2, borderRadius: 10 }}
        >
          {cells.map(({ n, size, col, row }) => (
            <div
              key={n}
              style={{
                position: "absolute",
                display: "none",
                background: "#FFFFFF",
                width: `${size}%`,
                height: `${size}%`,
                left: `${col * size}%`,
                top: `${row * size}%`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="cs-gallery__thumb-row">
        <button type="button" className="cs-gallery__nav cs-gallery__nav--prev" aria-label="Previous" onClick={() => goTo(i - 1)}>
          {PREV}
        </button>
        <div className="cs-gallery__thumbs">
          {slides.map((slide, idx) => (
            <button
              type="button"
              key={slide.src}
              className={`cs-gallery__thumb${idx === i ? " cs-gallery__thumb--active" : ""}`}
              onClick={() => goTo(idx)}
            >
              <img src={slide.src} alt="" />
            </button>
          ))}
        </div>
        <button type="button" className="cs-gallery__nav cs-gallery__nav--next" aria-label="Next" onClick={() => goTo(i + 1)}>
          {NEXT}
        </button>
      </div>
      {showDots ? (
        <div className="cs-gallery__dots">
          {slides.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              className={`cs-gallery__dot${idx === i ? " cs-gallery__dot--active" : ""}`}
              onClick={() => goTo(idx)}
              aria-label={slide.alt}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

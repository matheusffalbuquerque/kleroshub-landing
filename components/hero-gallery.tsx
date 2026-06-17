"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { HeroSlide } from "@/types/hero";

type HeroGalleryProps = {
  id?: string;
  eyebrow?: string;
  slides: [HeroSlide, HeroSlide, HeroSlide] | HeroSlide[];
  autoPlayIntervalMs?: number;
};

export function HeroGallery({
  id,
  eyebrow,
  slides,
  autoPlayIntervalMs = 5000,
}: HeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, autoPlayIntervalMs);

    return () => window.clearInterval(timer);
  }, [autoPlayIntervalMs, slides.length]);

  const currentSlide = slides[activeIndex];

  return (
    <section id={id} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-89px)] max-w-7xl gap-10 px-6 py-14 md:grid-cols-[0.88fr_1.12fr] md:items-center md:px-10">
        <div className="space-y-6">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-gold)]">
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-5">
            <h1 className="max-w-xl font-[family-name:var(--font-display)] text-5xl leading-[0.96] md:text-7xl">
              {currentSlide.title}
            </h1>
            {currentSlide.description ? (
              <p className="max-w-xl text-lg leading-8 text-white/72">
                {currentSlide.description}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:translate-y-[-1px] hover:bg-[var(--color-gold)]"
            >
              Explorar vitrine
            </a>
            <a
              href="#contato"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
            >
              Solicitar apresentação
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/12 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.32)]">
            <Image
              key={currentSlide.src}
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-3">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Mostrar imagem ${index + 1}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 rounded-full transition ${
                      isActive
                        ? "w-12 bg-[var(--color-gold)]"
                        : "w-3 bg-white/28 hover:bg-white/50"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
                }
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                aria-label="Imagem anterior"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white transition hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                aria-label="Próxima imagem"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

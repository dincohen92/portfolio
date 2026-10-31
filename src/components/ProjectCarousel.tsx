"use client";
import { useRef, useState } from "react";

export type Slide = { image: string; title: string; caption: string };

export default function ProjectCarousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    setIndex(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  };

  const slide = slides[index];

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s) => (
            <div
              key={s.image}
              className="w-full shrink-0 snap-center flex items-center justify-center bg-black/[0.03] border border-border h-[320px] md:h-[480px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.title} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border border-border text-sm disabled:opacity-30 hover:bg-background transition-opacity"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(index + 1)}
              disabled={index === slides.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/90 border border-border text-sm disabled:opacity-30 hover:bg-background transition-opacity"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="max-w-2xl mx-auto text-center mt-8">
        <h3 className="text-lg font-medium tracking-tight mb-2">{slide.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{slide.caption}</p>
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-foreground" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

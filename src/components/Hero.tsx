"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type NoteId = "din-cohen" | "design-engineer" | "for-humans";

const NOTES: Record<NoteId, { color: string; note: string }> = {
  "din-cohen": {
    color: "#00ffff",
    note: "When not designing, you'll find me hiking trails in the Sierras, staring at big rocks, and sometimes even climbing them.",
  },
  "design-engineer": {
    color: "#ff00ff",
    note: "I led design and engineering at Apex Semi, built the AI infrastructure for PlanwithCoCo, and ran marketing and product research at Zira.",
  },
  "for-humans": {
    color: "#ffff00",
    note: "Trained in Industrial Design at SFSU, where I learned to think in systems, materials, and human behavior long before the AI takeover.",
  },
};

// Words light up in this order as the hero scrolls.
const ORDER: NoteId[] = ["din-cohen", "design-engineer", "for-humans"];

// Stage is the Figma "Frame 22" area that holds the shapes + photo, in design px.
// Each layer's `y` is its top offset at scroll stops 0 / 0.5 / 1, read from the
// landing-hero-scroll-1/2/3 frames, so layers drift up at different speeds.
const STAGE_W = 690;
const STAGE_H = 818;

const LAYERS = [
  { key: "magenta", src: "/images/hero/shape-magenta-square.svg", alt: "", x: 0, w: 274, h: 266, y: [367.5, 207, 51] },
  { key: "cyan", src: "/images/hero/shape-cyan-circle.svg", alt: "", x: 363, w: 283, h: 283, y: [186, -22, -119] },
  { key: "photo", src: "/images/hero/din-headshot.png", alt: "Portrait of Din Cohen", x: 36, w: 654, h: 818, y: [186, 120, 51] },
  { key: "yellow", src: "/images/hero/shape-yellow-triangle.svg", alt: "", x: 346.65, w: 318.697, h: 276, y: [532, 450, 255] },
] as const;

function lerpStops(stops: readonly number[], p: number) {
  const s = p * (stops.length - 1);
  const i = Math.min(Math.floor(s), stops.length - 2);
  return stops[i] + (stops[i + 1] - stops[i]) * (s - i);
}

const translateY = (y: number) => `translate3d(0, calc(var(--u) * ${y}), 0)`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollNote, setScrollNote] = useState<NoteId | null>(null);
  const [hoverNote, setHoverNote] = useState<NoteId | null>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      layerRefs.current.forEach((el, i) => {
        if (el) el.style.transform = translateY(lerpStops(LAYERS[i].y, p));
      });
      // Nothing highlighted for the first bit of scroll, then each word in turn.
      setScrollNote(p < 0.1 ? null : ORDER[p < 0.4 ? 0 : p < 0.7 ? 1 : 2]);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const activeNote = hoverNote ?? scrollNote;
  const note = activeNote ? NOTES[activeNote] : null;

  return (
    // Tall outer section = scroll runway; the inner panel stays pinned while it plays.
    <section ref={sectionRef} className="relative bg-black h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-end pb-20 section-padding">

        {/* ── Layered CMYK shapes + photo ──────────────────────────────────── */}
        <div
          className="absolute right-0 top-[6vh] opacity-60 md:opacity-100 md:top-auto md:right-[4.4vw] md:bottom-[calc(var(--u)*50)] pointer-events-none [--u:calc(100vw/690)] md:[--u:calc(min(46vw,690px)/690)]"
          style={
            {
              width: `calc(var(--u) * ${STAGE_W})`,
              height: `calc(var(--u) * ${STAGE_H})`,
            } as CSSProperties
          }
        >
          {LAYERS.map((layer, i) => (
            <div
              key={layer.key}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className={`absolute top-0 will-change-transform ${layer.key === "photo" ? "hidden md:block" : ""}`}
              style={{
                left: `calc(var(--u) * ${layer.x})`,
                width: `calc(var(--u) * ${layer.w})`,
                height: `calc(var(--u) * ${layer.h})`,
                transform: translateY(layer.y[0]),
              }}
            >
              <img
                src={layer.src}
                alt={layer.alt}
                className={`absolute inset-0 block max-w-none size-full ${
                  layer.key === "photo" ? "object-cover" : ""
                }`}
              />
            </div>
          ))}
        </div>

        {/* ── Editorial hero text ──────────────────────────────────────────── */}
        <div className="max-w-3xl md:max-w-[43vw] relative z-10">

          {/* ── Annotation card (driven by scroll; hover previews others) ── */}
          <div className="absolute bottom-full mb-4 w-72">
            {note && (
              <div
                key={activeNote}
                className="px-4 py-3 text-sm leading-relaxed text-white/90 animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ borderLeft: `2px solid ${note.color}` }}
              >
                {note.note}
              </div>
            )}
          </div>

          <p className="font-display text-[clamp(2rem,3.8vw,4rem)] font-medium leading-[1.2] tracking-tight text-white">
            <Phrase id="din-cohen" active={activeNote === "din-cohen"} onHover={setHoverNote}>Din Cohen</Phrase>
            {" "}is a {" "}
            <Phrase id="design-engineer" active={activeNote === "design-engineer"} onHover={setHoverNote}>design engineer</Phrase>
            {" "}who ships, designing and building AI-powered products end to end {" "}
            <Phrase id="for-humans" active={activeNote === "for-humans"} onHover={setHoverNote}>for humans</Phrase>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function Phrase({
  id,
  active,
  children,
  onHover,
}: {
  id: NoteId;
  active: boolean;
  children: React.ReactNode;
  onHover: (id: NoteId | null) => void;
}) {
  const { color } = NOTES[id];
  return (
    <span
      className="cursor-default"
      style={{
        color: active ? "#000" : "inherit",
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: active ? "100% 100%" : "0% 100%",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
        transition: "background-size 400ms cubic-bezier(0.2, 0.7, 0.2, 1), color 250ms",
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </span>
  );
}

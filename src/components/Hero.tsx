"use client";
import { useEffect, useState } from "react";

type NoteId = "din-cohen" | "experienced" | "humans";

const NOTES: Record<NoteId, { color: string; note: string }> = {
  "din-cohen": {
    color: "#00ffff",
    note: "When not designing, you'll find me hiking the trails of the Pacific Northwest, staring at buildings, and sometimes even climbing them.",
  },
  "experienced": {
    color: "#ff00ff",
    note: "Led design and engineering at Apex Semi (acquired by Cadence), built AI infrastructure for PlanwithCoCo, and contributed to computer vision at Zira.",
  },
  "humans": {
    color: "#ffff00",
    note: "Trained in Industrial Design at SFSU, where I learned to think in systems, materials, and human behavior long before the AI takeover.",
  },
};

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [activeNote, setActiveNote] = useState<NoteId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offset = scrollY * 0.3;
  const note = activeNote ? NOTES[activeNote] : null;

  return (
    <section className="min-h-screen flex flex-col justify-end pb-20 section-padding bg-black relative overflow-hidden">

      {/* ── Mobile profile image ───────────────────────────────────────────── */}
      <div className="md:hidden absolute top-0 right-0 h-[55vw] w-[55vw] overflow-hidden pointer-events-none opacity-30">
        <img
          src="/images/hero/din-headshot.png"
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* ── Bauhaus geometric mask ─────────────────────────────────────────── */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 440 580"
          className="absolute right-16 lg:right-28 top-1/2 -translate-y-[52%] h-[72vh] max-h-[620px] w-auto"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="bauhaus-clip">
              <circle cx="218" cy="205" r="178" />
              <rect x="8" y="360" width="172" height="220" />
              <circle cx="400" cy="108" r="66" />
            </clipPath>
          </defs>
          <circle cx="218" cy="205" r="178" fill="none" stroke="white" strokeWidth="1" opacity="0.13" />
          <rect x="8" y="360" width="172" height="220" fill="none" stroke="white" strokeWidth="1" opacity="0.13" />
          <circle cx="400" cy="108" r="66" fill="none" stroke="white" strokeWidth="1" opacity="0.13" />
          <image
            href="/images/hero/din-headshot.png"
            x="-30"
            y={offset}
            width="500"
            height="780"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#bauhaus-clip)"
          />
        </svg>
      </div>

      {/* ── Editorial hero text ────────────────────────────────────────────── */}
      <div className="max-w-3xl relative z-10">

        {/* ── Floating annotation card ─────────────────────────────────────── */}
        <div
          className={`absolute bottom-full mb-4 w-72 transition-all duration-300 ${
            note
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div
            className="px-4 py-3 text-sm leading-relaxed text-white/90"
            style={{
              borderLeft: `2px solid ${note?.color ?? "transparent"}`,
            }}
          >
            {note?.note}
          </div>
        </div>

        <p className="text-[clamp(2rem,3.8vw,4rem)] font-medium leading-[1.2] tracking-tight text-white">
          <Phrase id="din-cohen" onHover={setActiveNote}>Din Cohen</Phrase>
          {" "}is a product designer{" "}
          <Phrase id="experienced" onHover={setActiveNote}>experienced</Phrase>
          {" "}in simplifying complex problems with simple solutions for{" "}
          <Phrase id="humans" onHover={setActiveNote}>humans</Phrase>
          .
        </p>
      </div>

      <div className="absolute bottom-8 right-8 md:right-20 text-xs text-white/40 tracking-widest uppercase rotate-90 origin-right">
        Scroll
      </div>
    </section>
  );
}

function Phrase({
  id,
  children,
  onHover,
}: {
  id: NoteId;
  children: React.ReactNode;
  onHover: (id: NoteId | null) => void;
}) {
  const { color } = NOTES[id];
  return (
    <span
      className="cursor-default"
      style={{
        color,
        borderBottom: `2px solid ${color}`,
        paddingBottom: "2px",
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
    >
      {children}
    </span>
  );
}

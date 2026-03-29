"use client";
import { useState } from "react";
import Link from "next/link";
import projects from "@/data/projects.json";

type Project = (typeof projects)[0];

// ─── Layout engine ────────────────────────────────────────────────────────────
function groupIntoRows(items: Project[]): Project[][] {
  const rows: Project[][] = [];
  let i = 0;
  while (i < items.length) {
    const rem = items.length - i;
    if (rem === 4) {
      rows.push(items.slice(i, i + 2), items.slice(i + 2, i + 4));
      i += 4;
    } else if (rem >= 3) {
      rows.push(items.slice(i, i + 3));
      i += 3;
    } else {
      rows.push(items.slice(i));
      i = items.length;
    }
  }
  return rows;
}

const T = "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

// Perceived brightness — returns true if the hex color reads as dark
function isColorDark(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 64;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function CardContent({ project }: { project: Project }) {
  const dark = isColorDark(project.coverBg);
  const textMain  = dark ? "text-white"      : "text-foreground";
  const textSub   = dark ? "text-white/60"   : "text-foreground/80";
  const textFaint = dark ? "text-white/40"   : "text-foreground/60";
  const border    = dark ? "border-white/25" : "border-foreground/40";

  return (
    <Link href={`/projects/${project.slug}`} className="relative flex flex-col h-full">
      {/* Base: always solid color */}
      <div className="absolute inset-0" style={{ backgroundColor: project.coverBg }} />

      {/* Image: fades in on hover */}
      {project.images[0] && (
        <div
          className="absolute inset-0 bg-center bg-cover opacity-20 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-700 ease-out"
          style={{ backgroundImage: `url("${project.images[0]}")` }}
        />
      )}

      {/* Default label — number + name only */}
      <div className="relative mt-auto p-6 transition-opacity duration-300 group-hover:opacity-0">
        <span className={`text-xs font-mono block mb-1.5 ${textFaint}`}>{project.number}</span>
        <h3 className={`text-xl font-medium tracking-tight ${textMain}`}>{project.title}</h3>
      </div>

      {/* Hover reveal — number, name, role, year, tags */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        <div className="flex items-start justify-between">
          <span className={`text-xs font-mono ${textFaint}`}>{project.number}</span>
          <span className={`text-sm ${textSub}`}>↗</span>
        </div>
        <div>
          <h3 className={`text-xl font-medium tracking-tight ${textMain} mb-2`}>{project.title}</h3>
          <p className={`text-xs ${textFaint} uppercase tracking-widest mb-1`}>{project.role}</p>
          <p className={`text-xs font-mono ${textFaint} mb-4`}>{project.year}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className={`text-xs border ${border} px-2.5 py-0.5 ${textFaint}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
// rowFlex drives the vertical axis: this row's share of the outer flex-col height.
// hoveredSlug drives the horizontal axis: card widths within this row.
function BentoRow({
  row,
  rowIndex,
  hoveredSlug,
  rowFlex,
  onHover,
}: {
  row: Project[];
  rowIndex: number;
  hoveredSlug: string | null;
  rowFlex: number;
  onHover: (slug: string | null) => void;
}) {
  const slugsInRow = new Set(row.map((p) => p.slug));
  // Only react horizontally to hovers within this row
  const h = hoveredSlug && slugsInRow.has(hoveredSlug) ? hoveredSlug : null;
  const featuredLeft = rowIndex % 2 === 0;

  // Row's own flex (vertical axis) — sits inside the outer flex-col
  const rowStyle = { flex: rowFlex, transition: T };

  // ── 1 card ──────────────────────────────────────────────────────────────────
  if (row.length === 1) {
    const [p] = row;
    return (
      <div className="flex gap-px bg-border" style={rowStyle}>
        <div
          className="overflow-hidden group flex-1"
          onMouseEnter={() => onHover(p.slug)}
          onMouseLeave={() => onHover(null)}
        >
          <CardContent project={p} />
        </div>
      </div>
    );
  }

  // ── 2 cards — horizontal expansion ──────────────────────────────────────────
  if (row.length === 2) {
    const [p0, p1] = row;
    const defaultF0 = featuredLeft ? 1.4 : 1;
    const defaultF1 = featuredLeft ? 1 : 1.4;
    const f0 = h === p0.slug ? 2 : h === p1.slug ? 0.7 : defaultF0;
    const f1 = h === p1.slug ? 2 : h === p0.slug ? 0.7 : defaultF1;

    return (
      <div className="flex gap-px bg-border" style={rowStyle}>
        <div
          className="overflow-hidden group"
          style={{ flex: f0, transition: T }}
          onMouseEnter={() => onHover(p0.slug)}
          onMouseLeave={() => onHover(null)}
        >
          <CardContent project={p0} />
        </div>
        <div
          className="overflow-hidden group"
          style={{ flex: f1, transition: T }}
          onMouseEnter={() => onHover(p1.slug)}
          onMouseLeave={() => onHover(null)}
        >
          <CardContent project={p1} />
        </div>
      </div>
    );
  }

  // ── 3 cards — featured card expands H, stacked pair expands V within column ─
  const [pa, pb, pc] = row;
  const featureFlex = h === pa.slug ? 2    : h ? 0.85 : 1.4;
  const stackFlex   = h === pa.slug ? 0.65 : h ? 1.5  : 1;
  const pbFlex      = h === pb.slug ? 1.65 : h === pc.slug ? 0.5 : 1;
  const pcFlex      = h === pc.slug ? 1.65 : h === pb.slug ? 0.5 : 1;

  const featured = (
    <div
      className="overflow-hidden group"
      style={{ flex: featureFlex, transition: T }}
      onMouseEnter={() => onHover(pa.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <CardContent project={pa} />
    </div>
  );

  const stacked = (
    <div className="flex flex-col gap-px bg-border" style={{ flex: stackFlex, transition: T }}>
      <div
        className="overflow-hidden group"
        style={{ flex: pbFlex, transition: T }}
        onMouseEnter={() => onHover(pb.slug)}
        onMouseLeave={() => onHover(null)}
      >
        <CardContent project={pb} />
      </div>
      <div
        className="overflow-hidden group"
        style={{ flex: pcFlex, transition: T }}
        onMouseEnter={() => onHover(pc.slug)}
        onMouseLeave={() => onHover(null)}
      >
        <CardContent project={pc} />
      </div>
    </div>
  );

  return (
    <div className="flex gap-px bg-border" style={rowStyle}>
      {featuredLeft ? <>{featured}{stacked}</> : <>{stacked}{featured}</>}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const [hovered, setHovered] = useState<{ rowIndex: number; slug: string } | null>(null);
  const rows = groupIntoRows(projects as Project[]);

  // Fixed total height — rows flex within this to expand/contract vertically.
  // Single row gets more height since there's nothing to push against.
  const gridHeight = rows.length === 1 ? 500 : rows.length * 350;

  // Vertical expansion: hovered row grows, all others shrink proportionally.
  const getRowFlex = (i: number) => {
    if (!hovered || rows.length <= 1) return 1;
    return hovered.rowIndex === i ? 1.25 : 0.75;
  };

  return (
    <section id="projects" className="py-32 section-padding border-t border-border">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-16">
          Projects
        </p>

        {/* Desktop bento — outer flex-col owns the vertical axis */}
        <div
          className="hidden md:flex flex-col gap-px bg-border"
          style={{ height: gridHeight }}
        >
          {rows.map((row, i) => (
            <BentoRow
              key={i}
              row={row}
              rowIndex={i}
              hoveredSlug={hovered?.slug ?? null}
              rowFlex={getRowFlex(i)}
              onHover={(slug) =>
                setHovered(slug ? { rowIndex: i, slug } : null)
              }
            />
          ))}
        </div>

        {/* Mobile: stacked, no interaction */}
        <div className="md:hidden flex flex-col gap-px bg-border">
          {(projects as Project[]).map((project) => (
            <div
              key={project.slug}
              className="overflow-hidden group"
              style={{ height: 260 }}
            >
              <CardContent project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

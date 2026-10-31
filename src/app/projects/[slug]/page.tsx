import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import projects from "@/data/projects.json";
import ProjectCarousel, { type Slide } from "@/components/ProjectCarousel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Din Cohen`,
    description: project.description,
  };
}

// Perceived brightness — true if the hex color reads as dark
function isColorDark(hex: string): boolean {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 64;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dark = isColorDark(project.coverBg);
  const textMain = dark ? "text-white" : "text-foreground";
  const tagStyle = dark
    ? "border-white text-white"
    : "border-foreground text-foreground";

  // Explicit slides win; otherwise fall back to the case-study sections that have an image.
  const slides: Slide[] =
    "slides" in project && Array.isArray(project.slides)
      ? (project.slides as Slide[])
      : project.sections
          .filter((section) => section.image)
          .map((section) => ({
            image: section.image as string,
            title: section.heading,
            caption: section.body,
          }));

  return (
    <>
      {/* Minimal nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f7]/90 backdrop-blur-md border-b border-black/5">
        <div className="section-padding flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-foreground hover:opacity-60 transition-opacity"
          >
            Din Cohen
          </Link>
          <Link
            href="/#projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All projects
          </Link>
        </div>
      </header>

      <main className="pt-16">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:min-h-[420px] md:items-stretch"
          style={{ backgroundColor: project.coverBg }}
        >
          <div className="flex flex-col justify-between gap-10 px-6 md:px-12 py-10 md:w-[36%] md:shrink-0">
            <div className="flex items-center gap-3">
              <h1 className={`text-xl md:text-2xl font-medium tracking-tight ${textMain}`}>
                {project.title}
              </h1>
              {project.externalHref && (
                <a
                  href={project.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.externalLabel ?? "Visit site"}
                  title={project.externalLabel ?? "Visit site"}
                  className={`text-xl hover:opacity-60 transition-opacity ${textMain}`}
                >
                  ↗
                </a>
              )}
            </div>
            {"logo" in project && project.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className={`h-28 md:h-40 w-auto max-w-full object-contain self-start ${
                  "logoOpaque" in project && project.logoOpaque ? "mix-blend-multiply" : ""
                }`}
              />
            )}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className={`text-xs border px-3 py-1 ${tagStyle}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Screenshot runs the full height of the band, edge to edge */}
          <div className="md:flex-1 md:pr-[5%] min-h-[240px] md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroImage}
              alt={`${project.title} screenshot`}
              className="w-full h-full object-cover object-top bg-white"
            />
          </div>
        </div>

        <div className="section-padding pt-20 pb-20 max-w-5xl mx-auto">
          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-center">
            {project.description}
          </p>

          {/* Prototype */}
          {(project.figmaEmbed || project.externalHref) && (
            <div className="border-t border-border mt-20 pt-16">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-10">
                {project.figmaEmbed ? "Prototype" : "Website"}
              </p>
              {project.figmaEmbed ? (
                <div className="relative w-full aspect-video">
                  <p className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground uppercase tracking-widest border border-border">
                    Loading prototype…
                  </p>
                  <iframe
                    className="absolute inset-0 w-full h-full border border-border"
                    src={project.figmaEmbed}
                    title={`${project.title} prototype`}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={project.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block border border-border overflow-hidden bg-black/[0.03]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.heroImage}
                    alt={`${project.title} screenshot`}
                    className="w-full max-h-[480px] object-contain"
                  />
                  <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-background border border-foreground px-5 py-2.5 text-sm group-hover:bg-foreground group-hover:text-background transition-colors">
                    {project.externalLabel ?? "Visit site"} ↗
                  </span>
                </a>
              )}
            </div>
          )}

          {/* Features carousel */}
          {slides.length > 0 && (
            <div className="border-t border-border mt-20 pt-16">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-10">
                Features
              </p>
              <ProjectCarousel slides={slides} />
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="border-t border-border section-padding py-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">What&apos;s next</p>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Interested in working together?</h2>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a
                href="mailto:dincohen92@gmail.com"
                className="inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Get in touch ↗
              </a>
              <a
                href="https://linkedin.com/in/dincohen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer nav */}
        <div className="border-t border-border section-padding py-8 flex items-center justify-between text-sm text-muted-foreground">
          <Link href="/#projects" className="hover:text-foreground transition-colors">
            ← All projects
          </Link>
          <span>© {new Date().getFullYear()} Din Cohen</span>
        </div>
      </main>
    </>
  );
}

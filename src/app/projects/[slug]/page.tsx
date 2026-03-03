import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import projects from "@/data/projects.json";

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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

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
        {/* Cover */}
        <div
          className="w-full h-[50vh] min-h-[320px] bg-center bg-cover"
          style={
            project.images[0]
              ? { backgroundImage: `url(${project.images[0]})` }
              : { backgroundColor: project.coverBg }
          }
        />

        {/* Content */}
        <div className="section-padding py-20 max-w-5xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start mb-16">
            <div>
              <span className="text-xs font-mono text-muted-foreground">
                {project.number}
              </span>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight mt-2">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                {project.subtitle}
              </p>
            </div>

            {project.externalHref && (
              <a
                href={project.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Visit site ↗
              </a>
            )}
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-border mb-16">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Role
              </p>
              <p className="text-sm">{project.role}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Year
              </p>
              <p className="text-sm">{project.year}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
                Disciplines
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-border px-2.5 py-0.5 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="max-w-2xl">
            {project.body.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Figma prototype embed */}
        {project.figmaEmbed && (
          <div className="border-t border-border section-padding py-20">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-10">
                Prototype
              </p>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full border border-border"
                  src={project.figmaEmbed}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

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

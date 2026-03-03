export default function About() {
  return (
    <section id="about" className="py-32 section-padding border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        {/* Left column */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-10">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight tracking-tight mb-8">
            Designer who codes.<br />Engineer who designs.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            I studied Industrial Design at San Francisco State University, then
            expanded into software engineering through Hack Reactor&apos;s intensive
            bootcamp in Seattle. That combination of disciplines shapes how I
            work — I can take a product from concept to deployment.
          </p>
        </div>

        {/* Right column — timeline */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Beginnings — Israel &amp; Northern California
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Industrial Design, San Francisco State University</li>
              <li>OHIO Design Studio</li>
              <li>fyrn — manufacturing &amp; production</li>
            </ul>
          </div>
          <div className="w-full h-px bg-border" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              New Horizons — Seattle
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Hack Reactor — software engineering bootcamp</li>
              <li>Apex Semi — UI/UX &amp; frontend engineering</li>
              <li>Zira — marketing, branding &amp; computer vision AI</li>
            </ul>
          </div>
          <div className="w-full h-px bg-border" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Now — San Francisco
            </p>
            <p className="text-sm text-muted-foreground">
              Focused on user-centered product design — bridging the gap between
              beautiful interfaces and solid engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
            Designer who codes &amp;<br/> Engineer who designs
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Studying Industrial Design and transitioning into software engineering 
            has led me to the crossroads of design and code where 
            I can bridge the gap between the technical and the simple.
            I thrive working with teams that value user-focused design and elegant engineering.
          </p>
        </div>

        {/* Right column — timeline */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Beginnings — San Francisco
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>San Francisco State University - industrial design</li>
              <li>OHIO Design Studio - industrial designer</li>
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
              <li>Apex Semi — fullstack software engineering</li>
              <li>Zira — user experience, marketing &amp; computer vision AI</li>
            </ul>
          </div>
          <div className="w-full h-px bg-border" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Now
            </p>
            <p className="text-sm text-muted-foreground">
              Product Design bridging the gap between beautiful interfaces and complex engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

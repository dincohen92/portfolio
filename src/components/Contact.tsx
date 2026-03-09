const links = [
  { label: "Email", value: "dincohen92@gmail.com", href: "mailto:dincohen92@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/dincohen", href: "https://linkedin.com/in/dincohen/" },
  { label: "GitHub", value: "github.com/dincohen92", href: "https://github.com/dincohen92" },
  { label: "Instagram", value: "@dinco.design", href: "https://instagram.com/dinco.design/" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 section-padding border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-10">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-medium leading-tight tracking-tight">
            Let&apos;s work together.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Open to product design opportunities. Please reach out.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "dincohen92@gmail.com"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-5 hover:opacity-60 transition-opacity"
            >
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  {link.label}
                </p>
                <p className="text-sm">{link.value}</p>
              </div>
              <span className="text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

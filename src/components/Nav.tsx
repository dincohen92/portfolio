const links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  // { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#f9f9f7]/90 backdrop-blur-md border-b border-black/5"
    >
      <div className="section-padding flex items-center justify-between h-16">
        <a
          href="#"
          className="text-sm font-medium tracking-tight text-foreground hover:opacity-60 transition-opacity"
        >
          Din Cohen
        </a>
        <nav className="flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

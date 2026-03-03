export default function Footer() {
  return (
    <footer className="border-t border-border section-padding py-8 flex items-center justify-between text-xs text-muted-foreground">
      <span>© {new Date().getFullYear()} Din Cohen</span>
      <span>San Francisco</span>
    </footer>
  );
}

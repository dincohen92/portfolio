const reviews = [
  {
    quote:
      "Din has a rare combination of design intuition and engineering rigor. He understands what users need and actually builds it — no handoff friction. His attentiveness and communication make every project run smoothly.",
    author: "Client",
    role: "via dinco.design",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 section-padding border-t border-border bg-foreground text-background">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-background/50 uppercase tracking-widest mb-16">
          Reviews
        </p>

        <div className="max-w-3xl">
          <svg
            className="w-8 h-8 text-background/30 mb-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {reviews.map((review, i) => (
            <div key={i}>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-background/90 mb-10">
                {review.quote}
              </p>
              <div>
                <p className="text-sm font-medium text-background">{review.author}</p>
                <p className="text-xs text-background/50 mt-1">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

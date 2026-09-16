export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent"
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-24 text-center sm:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Software developer &middot; Toronto, Canada
        </p>
        <h1 className="font-display text-5xl font-medium text-foreground sm:text-6xl">
          Ajay Maan
        </h1>
        <p className="max-w-xl font-serif text-lg text-muted-foreground">
          Writing down what I build, break, and learn along the way.
        </p>
      </div>
    </section>
  );
}

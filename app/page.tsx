export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        personal-blogs · scaffold check
      </p>
      <h1 className="font-display text-5xl font-medium text-foreground">
        Ajay Maan
      </h1>
      <p className="max-w-md font-serif text-lg text-foreground">
        This placeholder confirms the type system (display / serif / mono) and
        light-dark color tokens before the real layout is built.
      </p>
      <code className="rounded border border-border bg-surface px-3 py-1 font-mono text-sm text-accent">
        BLOG-03
      </code>
    </main>
  );
}

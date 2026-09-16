import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page <= 1 ? basePath : `${basePath}?page=${page}`);

  const disabledClasses =
    "pointer-events-none rounded border border-border px-3 py-1.5 text-muted-foreground/50";
  const enabledClasses =
    "rounded border border-border px-3 py-1.5 text-foreground transition-colors hover:border-accent hover:text-accent";

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-sm"
    >
      <Link
        href={pageHref(currentPage - 1)}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : undefined}
        className={currentPage <= 1 ? disabledClasses : enabledClasses}
      >
        &larr; Previous
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage
              ? "rounded border border-accent px-3 py-1.5 text-accent"
              : "rounded border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
          }
        >
          {page}
        </Link>
      ))}

      <Link
        href={pageHref(currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : undefined}
        className={currentPage >= totalPages ? disabledClasses : enabledClasses}
      >
        Next &rarr;
      </Link>
    </nav>
  );
}

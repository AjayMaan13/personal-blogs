"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/series", label: "Series" },
  { href: "/about", label: "About" },
];

const PORTFOLIO_URL = "https://ajaymaan13.vercel.app";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="whitespace-nowrap font-display text-base text-foreground sm:text-lg">
          Ajay Maan
        </Link>

        <nav className="flex items-center gap-3 font-mono text-sm sm:gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "text-accent"
                    : "text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={PORTFOLIO_URL}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Portfolio &#8599;
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

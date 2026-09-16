"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export function TableOfContents({ containerId }: { containerId: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Read the actual rendered heading elements rather than re-parsing the MDX
  // source, so the ids here are always exactly what rehype-slug assigned —
  // no risk of a second slugifier drifting out of sync with the first.
  // Deferred to a rAF callback (rather than called synchronously in the
  // effect body) both because we want the DOM already painted, and because
  // react-hooks/set-state-in-effect flags a bare synchronous setState here.
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const frame = requestAnimationFrame(() => {
      const elements = Array.from(container.querySelectorAll<HTMLElement>("h2, h3"));
      setHeadings(
        elements.map((el) => ({
          id: el.id,
          text: el.textContent?.replace(/#$/, "").trim() ?? "",
          depth: el.tagName === "H2" ? 2 : 3,
        })),
      );
    });

    return () => cancelAnimationFrame(frame);
  }, [containerId]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const activeHeading = headings.find((heading) => heading.id === activeId);

  return (
    <nav className="sticky top-[65px] z-30 -mx-6 border-b border-border bg-background/95 px-6 py-3 backdrop-blur sm:mx-0 sm:rounded-lg sm:border sm:px-4">
      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        aria-expanded={!collapsed}
        className="flex w-full items-center justify-between gap-4 font-mono text-sm text-foreground"
      >
        <span className="truncate text-left">
          {collapsed && activeHeading ? activeHeading.text : "Overview"}
        </span>
        <ChevronDownIcon
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${collapsed ? "" : "rotate-180"}`}
        />
      </button>

      {!collapsed && (
        <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
          {headings.map((heading) => (
            <li key={heading.id} className={heading.depth === 3 ? "pl-4" : undefined}>
              <a
                href={`#${heading.id}`}
                className={`block truncate font-mono text-sm transition-colors ${
                  heading.id === activeId
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

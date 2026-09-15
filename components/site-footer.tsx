import { GithubIcon, LinkedinIcon } from "@/components/icons";

const SOCIAL_LINKS = [
  { href: "https://github.com/AjayMaan13", label: "GitHub", Icon: GithubIcon },
  {
    href: "https://www.linkedin.com/in/ajaypartap-singh-maan",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-6 py-8 font-mono text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Ajay Maan</p>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

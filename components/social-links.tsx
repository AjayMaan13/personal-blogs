import { GithubIcon, LinkedinIcon } from "@/components/icons";

export const SOCIAL_LINKS = [
  { href: "https://github.com/AjayMaan13", label: "GitHub", Icon: GithubIcon },
  {
    href: "https://www.linkedin.com/in/ajaypartap-singh-maan",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
];

export function SocialLinks({
  className = "flex items-center gap-4",
  iconClassName = "size-4",
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={className}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-muted-foreground transition-colors hover:text-accent"
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}

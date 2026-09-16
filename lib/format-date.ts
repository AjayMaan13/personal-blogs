export function formatDate(dateString: string): string {
  // Parse as local midnight rather than UTC so the displayed date never
  // shifts a day off depending on the reader's timezone.
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

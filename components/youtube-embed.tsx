export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative mt-6 aspect-video overflow-hidden rounded-lg border border-border">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        className="absolute inset-0 size-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

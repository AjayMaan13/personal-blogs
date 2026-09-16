import type { MetadataRoute } from "next";
import { getAllPosts, getAllSeries, getAllTags } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const series = getAllSeries();
  const tags = getAllTags();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/blog", "/series", "/about"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const seriesRoutes: MetadataRoute.Sitemap = series.map((item) => ({
    url: `${SITE_URL}/series/${item.slug}`,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${SITE_URL}/tags/${tag.slug}`,
  }));

  return [...staticRoutes, ...postRoutes, ...seriesRoutes, ...tagRoutes];
}

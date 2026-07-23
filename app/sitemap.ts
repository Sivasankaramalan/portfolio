import { MetadataRoute } from "next"
import { articles } from "@/lib/blog"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/playbook`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/playbook/mobile`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...blogPosts]
}

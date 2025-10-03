import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import { articles } from "@/lib/blog"

export function Blog() {
  return (
    <section id="blog" className="section-accent px-6 py-20 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog & Articles</h2>
          <p className="text-muted-foreground text-lg">
            Sharing insights on quality engineering, mobile automation, and testing best practices.
          </p>
        </div>
  <div className="space-y-6">
          {articles.map((article) => (
            <Card key={article.slug} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    <a href={`/blog/${article.slug}`}>{article.title}</a>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a href={`/blog/${article.slug}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                    Read More
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

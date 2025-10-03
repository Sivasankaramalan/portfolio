import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import { articles } from "@/lib/blog"

export function Blog() {
  return (
    <section id="blog" className="section-accent px-6 py-20 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">Blog & Articles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {articles.map(article => (
            <Card
              key={article.slug}
              className="p-6 flex flex-col hover:shadow-lg transition-shadow border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-xl"
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2 hover:text-primary transition-colors">
                    <a href={`/blog/${article.slug}`}>{article.title}</a>
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {article.excerpt}
                </p>
                <div className="mt-auto pt-3 border-t flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-[10px] py-0.5 px-2 font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    Read <ExternalLink className="h-3.5 w-3.5" />
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

import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articles, getArticle } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticle(params.slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default function BlogArticlePage({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) return notFound()

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-6 py-24">
      <header className="mb-8">
        <a href="/#blog" className="no-underline group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Articles
        </a>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
        <p className="text-muted-foreground text-lg mb-4">{article.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime}</span>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>
        </div>
        {article.image && (
          <div className="not-prose -mx-6 mb-10 rounded-lg overflow-hidden border bg-muted/40">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={article.image}
                alt={article.imageAlt || article.title}
                fill
                priority={false}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </header>
      <div className="markdown-body leading-relaxed text-base">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, ...rest } = props
              return <code className={`rounded px-1 py-0.5 bg-muted text-[0.85em] ${className || ''}`} {...rest}>{children}</code>
            },
            pre(props) {
              return <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm" {...props} />
            },
            h2(props) { return <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight" {...props} /> },
            h3(props) { return <h3 className="mt-10 mb-3 text-xl font-semibold tracking-tight" {...props} /> },
            ul(props) { return <ul className="list-disc pl-6 space-y-2" {...props} /> },
            ol(props) { return <ol className="list-decimal pl-6 space-y-2" {...props} /> },
            hr() { return <hr className="my-10 border-border/60" /> }
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

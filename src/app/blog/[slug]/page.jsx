import Link from 'next/link'
import { posts } from '../posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} | NEXORA Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <article style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '60px 20px 80px',
      }}>
        {/* Nav */}
        <Link href="/blog" style={{
          color: '#FF0000',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0.5,
        }}>
          ← Back to Blog
        </Link>

        {/* Tags */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginTop: 32,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#FF0000',
              background: 'rgba(255,0,0,0.1)',
              padding: '3px 10px',
              borderRadius: 4,
              letterSpacing: 0.3,
              textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 36,
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 12,
        }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{
          fontSize: 13,
          color: '#555',
          marginBottom: 40,
          paddingBottom: 32,
          borderBottom: '1px solid #222',
        }}>
          {post.author} · {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {/* Content */}
        <div style={{
          fontSize: 16,
          lineHeight: 1.8,
          color: '#ccc',
        }}>
          {post.content}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 56,
          padding: '32px',
          background: '#111',
          border: '1px solid #222',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}>
            Ready to grow your YouTube channel with AI?
          </p>
          <p style={{
            fontSize: 14,
            color: '#888',
            marginBottom: 20,
          }}>
            NEXORA analyzes your channel, coaches you, and finds your next viral video idea.
          </p>
          <Link href="/" style={{
            display: 'inline-block',
            background: '#FF0000',
            color: '#fff',
            padding: '12px 32px',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 14,
            textDecoration: 'none',
          }}>
            Try NEXORA Free
          </Link>
        </div>
      </article>
    </div>
  )
}
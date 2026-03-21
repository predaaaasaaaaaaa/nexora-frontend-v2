import Link from 'next/link'
import { posts } from './posts'

export const metadata = {
  title: 'Blog | NEXORA - AI Growth Intelligence for YouTubers',
  description: 'Tips, strategies, and tools to grow your YouTube channel faster with AI-powered insights.',
}

export default function BlogPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '60px 20px 40px',
      }}>
        <Link href="/" style={{
          color: '#FF0000',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0.5,
        }}>
          ← Back to NEXORA
        </Link>

        <h1 style={{
          fontSize: 42,
          fontWeight: 800,
          marginTop: 24,
          marginBottom: 12,
          lineHeight: 1.1,
        }}>
          NEXORA <span style={{ color: '#FF0000' }}>Blog</span>
        </h1>

        <p style={{
          fontSize: 16,
          color: '#888',
          marginBottom: 48,
          maxWidth: 500,
        }}>
          YouTube growth strategies, AI insights, and creator tools — backed by data.
        </p>
      </div>

      {/* Posts */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 20px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <article style={{
              background: '#111',
              border: '1px solid #222',
              borderRadius: 12,
              padding: '28px 32px',
              transition: 'border-color 0.2s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={undefined}
            >
              <div style={{
                display: 'flex',
                gap: 8,
                marginBottom: 12,
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

              <h2 style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 8,
                lineHeight: 1.3,
              }}>
                {post.title}
              </h2>

              <p style={{
                fontSize: 14,
                color: '#888',
                lineHeight: 1.5,
                marginBottom: 12,
              }}>
                {post.description}
              </p>

              <div style={{
                fontSize: 12,
                color: '#555',
              }}>
                {post.author} · {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
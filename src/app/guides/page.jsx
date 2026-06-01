import Link from 'next/link'
import { guides } from './data'
import JsonLd from '@/components/shared/JsonLd'

const SITE_URL = 'https://nexora-ai.org'
const PAGE_DESCRIPTION =
  'Problem-first YouTube analytics guides for 2026 — diagnose a view drop, spot hidden-gem videos, and turn your own YouTube Studio data into your next decision.'

// Cluster -> friendly section heading, in display order.
const CLUSTERS = [
  { key: 'diagnostics', heading: 'Diagnose a problem' },
  { key: 'opportunities', heading: 'Spot opportunities' },
  { key: 'strategy', heading: 'Plan your strategy' },
]

export const metadata = {
  title: 'YouTube Analytics Guides (2026) | NEXORA',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: 'YouTube Analytics Guides (2026) | NEXORA',
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/guides`,
  },
}

function GuideCard({ guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article
        style={{
          background: '#161616',
          border: '1px solid #222',
          borderRadius: 12,
          padding: '24px 28px',
        }}
      >
        <h3 style={{ fontSize: 19, fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 8, lineHeight: 1.3 }}>
          {guide.title}
        </h3>
        <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, margin: 0 }}>{guide.seoDescription}</p>
      </article>
    </Link>
  )
}

export default function GuidesIndex() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'YouTube Analytics Guides (2026)',
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/guides`,
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/guides/${g.slug}`,
      name: g.title,
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <JsonLd data={webPageSchema} />
      <JsonLd data={itemListSchema} />

      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 20px 40px' }}>
        <Link href="/" style={{ color: '#FF0000', textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }}>
          ← Back to NEXORA
        </Link>

        <h1 style={{ fontSize: 42, fontWeight: 800, marginTop: 24, marginBottom: 12, lineHeight: 1.1 }}>
          YouTube Analytics <span style={{ color: '#FF0000' }}>Guides</span>
        </h1>

        <p style={{ fontSize: 16, color: '#888', marginBottom: 8, maxWidth: 640, lineHeight: 1.7 }}>
          Short, problem-first walkthroughs that turn your own YouTube Studio data into a decision — diagnose what went wrong, find what is working, and plan what to make next. Updated June 2026.
        </p>
      </div>

      {/* Clusters */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 80px' }}>
        {CLUSTERS.map((cluster) => {
          const items = guides.filter((g) => g.cluster === cluster.key)
          if (items.length === 0) return null
          return (
            <section key={cluster.key} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 20 }}>{cluster.heading}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map((g) => (
                  <GuideCard key={g.slug} guide={g} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

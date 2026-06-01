import Link from 'next/link'
import { comparisons } from './data'
import JsonLd from '@/components/shared/JsonLd'

const SITE_URL = 'https://nexora-ai.org'
const PAGE_DESCRIPTION =
  'Head-to-head matchups and best-alternative guides for the top YouTube growth tools in 2026 — vidIQ, TubeBuddy, 1of10, Spotter Studio, Social Blade, and NEXORA.'

export const metadata = {
  title: 'YouTube Tool Comparisons (2026) | NEXORA',
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/compare` },
  openGraph: {
    title: 'YouTube Tool Comparisons (2026) | NEXORA',
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: `${SITE_URL}/compare`,
  },
}

function ComparisonCard({ comparison }) {
  return (
    <Link href={`/compare/${comparison.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article
        style={{
          background: '#161616',
          border: '1px solid #222',
          borderRadius: 12,
          padding: '24px 28px',
        }}
      >
        <h3 style={{ fontSize: 19, fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 8, lineHeight: 1.3 }}>
          {comparison.title}
        </h3>
        <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, margin: 0 }}>{comparison.seoDescription}</p>
      </article>
    </Link>
  )
}

export default function CompareIndex() {
  const vs = comparisons.filter((c) => c.type === 'vs')
  const alts = comparisons.filter((c) => c.type === 'alternatives')

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'YouTube Tool Comparisons (2026)',
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/compare`,
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: comparisons.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/compare/${c.slug}`,
      name: c.title,
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
          YouTube Tool <span style={{ color: '#FF0000' }}>Comparisons</span>
        </h1>

        <p style={{ fontSize: 16, color: '#888', marginBottom: 8, maxWidth: 620, lineHeight: 1.7 }}>
          Honest, up-to-date comparisons of the tools creators actually use — picked apart on price, features, and who each one is really for. Verified June 2026.
        </p>
      </div>

      {/* Head-to-head */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Head-to-head</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {vs.map((c) => (
            <ComparisonCard key={c.slug} comparison={c} />
          ))}
        </div>
      </div>

      {/* Alternatives */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px 80px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Alternatives</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {alts.map((c) => (
            <ComparisonCard key={c.slug} comparison={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

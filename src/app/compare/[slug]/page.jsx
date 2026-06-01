import Link from 'next/link'
import { notFound } from 'next/navigation'
import { tools, comparisons } from '../data'
import JsonLd from '@/components/shared/JsonLd'
import QuickAnswer from '@/components/shared/QuickAnswer'
import FAQ from '@/components/shared/FAQ'

const SITE_URL = 'https://nexora-ai.org'
// Hardcoded build date — also doubles as the JSON-LD freshness signal.
const BUILD_DATE = '2026-06-01'

// Reused blog org constants for schema author/publisher.
const ORG = { '@type': 'Organization', name: 'NEXORA', url: SITE_URL }
const PUBLISHER = {
  '@type': 'Organization',
  name: 'NEXORA',
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/web-app-manifest-192x192.png` },
}

// Theme tokens — same palette as the blog. The only colors beyond the blog's
// are the semantic check / limited / dash indicators used inside feature tables.
const C = {
  card: '#161616',
  border: '#222',
  subCard: '#1a1a1a',
  primary: '#FF0000',
  body: '#ccc',
  muted: '#888',
  yes: '#22c55e',
  limited: '#f59e0b',
  no: '#555',
  strength: '#22c55e',
  weakness: '#f87171',
}

// Resolve the set of tool slugs a comparison touches, regardless of type.
function toolSlugs(c) {
  return c.type === 'vs' ? c.tools : [c.primary, ...c.alternatives]
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return {}
  const canonical = `${SITE_URL}/compare/${comparison.slug}`
  return {
    title: comparison.seoTitle || comparison.title,
    description: comparison.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: comparison.seoTitle || comparison.title,
      description: comparison.seoDescription,
      type: 'article',
      url: canonical,
    },
  }
}

// ---------- presentational helpers ----------

// Renders a feature value: true -> green check, 'limited' -> orange, false -> dash.
function FeatureValue({ value }) {
  if (value === true) return <span style={{ color: C.yes, fontWeight: 700, fontSize: 16 }}>✓</span>
  if (value === 'limited') return <span style={{ color: C.limited, fontWeight: 600, fontSize: 13 }}>Limited</span>
  return <span style={{ color: C.no, fontSize: 16 }}>—</span>
}

const th = {
  padding: '12px 14px',
  fontSize: 12,
  fontWeight: 700,
  color: C.muted,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  textAlign: 'center',
  background: C.subCard,
}
const thLeft = { ...th, textAlign: 'left' }
const tdCenter = { padding: '12px 14px', textAlign: 'center' }
const tdLeft = { padding: '12px 14px', textAlign: 'left', fontSize: 14, color: C.body }

function SectionHeading({ children }) {
  return (
    <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '56px 0 20px', lineHeight: 1.2 }}>
      {children}
    </h2>
  )
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '28px 32px', marginTop: 24 }}>
      {title && <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 12 }}>{title}</h2>}
      <p style={{ fontSize: 16, lineHeight: 1.8, color: C.body, margin: 0 }}>{children}</p>
    </div>
  )
}

function PricingCard({ tool }) {
  return (
    <div style={{ flex: '1 1 320px', minWidth: 280, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{tool.name}</div>
      {tool.pricing.map((p, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            padding: '10px 0',
            borderBottom: i === tool.pricing.length - 1 ? 'none' : `1px solid ${C.border}`,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{p.tier}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.5 }}>{p.detail}</div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, whiteSpace: 'nowrap' }}>{p.price}</div>
        </div>
      ))}
    </div>
  )
}

function ProsCons({ tool }) {
  return (
    <div style={{ flex: '1 1 320px', minWidth: 280, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 16 }}>{tool.name}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
        {tool.strengths.map((s, i) => (
          <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: C.body, marginBottom: 8, paddingLeft: 22, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: C.strength, fontWeight: 700 }}>+</span>
            {s}
          </li>
        ))}
      </ul>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
        {tool.weaknesses.map((w, i) => (
          <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: C.muted, marginBottom: 8, paddingLeft: 22, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: C.weakness, fontWeight: 700 }}>−</span>
            {w}
          </li>
        ))}
      </ul>
      <div style={{ fontSize: 13, color: C.muted, borderTop: `1px solid ${C.border}`, paddingTop: 12, lineHeight: 1.6 }}>
        <strong style={{ color: '#fff' }}>Best for:</strong> {tool.bestFor}
      </div>
    </div>
  )
}

function VsFeatureTable({ a, b }) {
  // Union of both tools' feature keys (they share the same set today, but the
  // union keeps this correct if the data ever diverges).
  const keys = [...new Set([...Object.keys(a.features), ...Object.keys(b.features)])]
  return (
    <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
        <thead>
          <tr>
            <th style={thLeft}>Feature</th>
            <th style={th}>{a.name}</th>
            <th style={th}>{b.name}</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => (
            <tr key={k} style={{ borderTop: `1px solid ${C.border}` }}>
              <td style={tdLeft}>{k}</td>
              <td style={tdCenter}><FeatureValue value={a.features[k]} /></td>
              <td style={tdCenter}><FeatureValue value={b.features[k]} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function VsBody({ comparison }) {
  const [a, b] = comparison.tools.map((s) => tools[s])
  return (
    <>
      <SectionHeading>Feature comparison</SectionHeading>
      <VsFeatureTable a={a} b={b} />

      <SectionHeading>Pricing</SectionHeading>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <PricingCard tool={a} />
        <PricingCard tool={b} />
      </div>

      <SectionHeading>Pros &amp; cons</SectionHeading>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <ProsCons tool={a} />
        <ProsCons tool={b} />
      </div>
    </>
  )
}

// Columns for the compact alternatives table. Keys must match the data exactly.
const ALT_FEATURES = ['Free tier', 'Keyword research', 'A/B testing', 'AI strategy / coaching', 'Outlier video discovery']

function AltTable({ list }) {
  return (
    <div style={{ overflowX: 'auto', border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
        <thead>
          <tr>
            <th style={thLeft}>Tool</th>
            {ALT_FEATURES.map((f) => (
              <th key={f} style={th}>{f}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((t) => (
            <tr key={t.slug} style={{ borderTop: `1px solid ${C.border}` }}>
              <td style={{ ...tdLeft, fontWeight: 600, color: '#fff' }}>{t.name}</td>
              {ALT_FEATURES.map((f) => (
                <td key={f} style={tdCenter}><FeatureValue value={t.features[f]} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AlternativeCard({ tool, featured }) {
  const entry = tool.pricing[0]
  const name = tool.isOwn ? (
    <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>{tool.name}</Link>
  ) : (
    tool.name
  )
  return (
    <div
      style={{
        background: C.card,
        border: featured ? '1px solid rgba(255,0,0,0.4)' : `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '24px 28px',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
        <h3 style={{ fontSize: 19, fontWeight: 700, color: '#fff', margin: 0 }}>{name}</h3>
        {featured && (
          <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, background: 'rgba(255,0,0,0.12)', padding: '3px 9px', borderRadius: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Featured
          </span>
        )}
        <span style={{ fontSize: 11, fontWeight: 600, color: C.muted, background: C.subCard, border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 4 }}>
          Category: {tool.category}
        </span>
      </div>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: C.body, marginTop: 0, marginBottom: 14 }}>{tool.tagline}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px' }}>
        {tool.strengths.slice(0, 3).map((s, i) => (
          <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: C.body, marginBottom: 6, paddingLeft: 22, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: C.strength, fontWeight: 700 }}>+</span>
            {s}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.primary, whiteSpace: 'nowrap' }}>from {entry.price}</span>
        <span style={{ fontSize: 13, color: C.muted, flex: '1 1 220px', textAlign: 'right', lineHeight: 1.5 }}>Best for: {tool.bestFor}</span>
      </div>
    </div>
  )
}

function AltBody({ comparison }) {
  const primary = tools[comparison.primary]
  const altTools = comparison.alternatives.map((s) => tools[s])
  // NEXORA's card goes first; the rest keep their data order.
  const nexoraFirst = altTools.filter((t) => t.isOwn)
  const rest = altTools.filter((t) => !t.isOwn)
  const ordered = [...nexoraFirst, ...rest]
  return (
    <>
      <p style={{ fontSize: 15, color: C.muted, marginTop: 8, lineHeight: 1.7 }}>
        Primary tool: <strong style={{ color: '#fff' }}>{primary.name}</strong> — {primary.category}.
      </p>

      <SectionHeading>The alternatives</SectionHeading>
      {ordered.map((t) => (
        <AlternativeCard key={t.slug} tool={t} featured={t.isOwn} />
      ))}

      <SectionHeading>At a glance</SectionHeading>
      <AltTable list={ordered} />
    </>
  )
}

// Featured NEXORA card shown on 'vs' pages where NEXORA is NOT one of the two
// tools. Prominent placement, but framed honestly as a different category.
function NexoraFeaturedCard() {
  const n = tools.nexora
  return (
    <div style={{ marginTop: 24, background: C.card, border: '1px solid rgba(255,0,0,0.35)', borderRadius: 12, padding: '28px 32px' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: C.primary, background: 'rgba(255,0,0,0.12)', padding: '3px 10px', borderRadius: 4, letterSpacing: 0.5, textTransform: 'uppercase' }}>
        Featured alternative
      </span>
      <h3 style={{ fontSize: 21, fontWeight: 700, margin: '14px 0 8px' }}>
        <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>NEXORA</Link>
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: C.body, marginTop: 0, marginBottom: 8 }}>{n.tagline}</p>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: C.muted, marginTop: 0, marginBottom: 16 }}>
        It’s a different category from the two tools above — not another keyword dashboard to read, but an AI agent that works on your own channel analytics. Treat it as a complement, not a like-for-like swap.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
        {n.strengths.slice(0, 3).map((s, i) => (
          <li key={i} style={{ fontSize: 14, lineHeight: 1.6, color: C.body, marginBottom: 6, paddingLeft: 22, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: C.strength, fontWeight: 700 }}>+</span>
            {s}
          </li>
        ))}
      </ul>
      <Link href="/" style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: C.primary, textDecoration: 'none' }}>
        Free during beta — try NEXORA →
      </Link>
    </div>
  )
}

function CtaCard() {
  return (
    <div style={{ marginTop: 56, padding: 32, background: '#111', border: `1px solid ${C.border}`, borderRadius: 12, textAlign: 'center' }}>
      <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Want strategy from your own analytics?</p>
      <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>
        NEXORA is an AI agent you plug into your channel — free during beta.
      </p>
      <Link href="/" style={{ display: 'inline-block', background: C.primary, color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
        Try NEXORA Free
      </Link>
    </div>
  )
}

export default async function ComparePage({ params }) {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) notFound()

  const slugs = toolSlugs(comparison)
  const nexoraInvolved = slugs.includes('nexora')

  // WebPage structured data — invisible metadata, mirrors the visible page.
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    headline: comparison.title,
    description: comparison.seoDescription,
    datePublished: BUILD_DATE,
    dateModified: BUILD_DATE,
    author: ORG,
    publisher: PUBLISHER,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/compare/${comparison.slug}` },
  }

  // FAQPage structured data — same shape and source as the blog's FAQ schema.
  const faqSchema = comparison.faqs && comparison.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comparison.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  // Related comparisons sharing at least one tool with this page (keeps the
  // pSEO cluster internally linked rather than orphaned).
  const related = comparisons
    .filter((c) => c.slug !== comparison.slug && toolSlugs(c).some((t) => slugs.includes(t)))
    .slice(0, 6)

  // One natural blog link — the head-to-head post when this page covers both
  // TubeBuddy and vidIQ, otherwise the broader tools guide.
  const blogLink = slugs.includes('tubebuddy') && slugs.includes('vidiq')
    ? { href: '/blog/tubebuddy-vs-vidiq-vs-nexora', label: 'TubeBuddy vs vidIQ vs NEXORA' }
    : { href: '/blog/best-youtube-analytics-tools-2026', label: 'the best YouTube analytics tools for 2026' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <JsonLd data={webPageSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <article style={{ maxWidth: 860, margin: '0 auto', padding: '60px 20px 80px' }}>
        <Link href="/compare" style={{ color: C.primary, textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }}>
          ← All comparisons
        </Link>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: '32px 0 12px' }}>{comparison.title}</h1>

        <div style={{ fontSize: 13, color: '#555', marginBottom: 36, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
          Last verified June 2026 · pricing may change, check each tool’s site.
        </div>

        <QuickAnswer text={comparison.answer} />

        <p style={{ fontSize: 16, lineHeight: 1.8, color: C.body, marginTop: 0 }}>{comparison.intro}</p>

        {comparison.type === 'vs' ? <VsBody comparison={comparison} /> : <AltBody comparison={comparison} />}

        <SectionHeading>The verdict</SectionHeading>
        <SectionCard>{comparison.verdict}</SectionCard>

        {comparison.type === 'vs' && !nexoraInvolved && <NexoraFeaturedCard />}

        <FAQ items={comparison.faqs} />

        <CtaCard />

        {/* Internal-link cluster: one blog link + related comparison pages */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 15, color: C.body, lineHeight: 1.7, marginBottom: 28 }}>
            Further reading: see our guide to{' '}
            <Link href={blogLink.href} style={{ color: C.primary, textDecoration: 'none', fontWeight: 600 }}>
              {blogLink.label}
            </Link>
            .
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Related comparisons</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                style={{ fontSize: 15, color: C.body, textDecoration: 'none', padding: '12px 16px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

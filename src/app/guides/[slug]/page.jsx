import Link from 'next/link'
import { notFound } from 'next/navigation'
import { guides } from '../data'
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

// Theme tokens — same palette as /compare and the blog.
const C = {
  card: '#161616',
  border: '#222',
  subCard: '#1a1a1a',
  primary: '#FF0000',
  body: '#ccc',
  muted: '#888',
  weakness: '#f87171',
}

// One contextual "further reading" link per guide, pointing at a real existing
// /compare or /blog page where it genuinely fits (keeps guides out of orphan
// status and cross-links the pSEO clusters).
const FURTHER_READING = {
  'why-did-my-youtube-views-drop': { href: '/blog/youtube-studio-analytics-explained-every-metric-2026', label: 'every YouTube Studio metric, explained' },
  'thumbnail-or-video-ctr-vs-retention': { href: '/blog/youtube-watch-time-vs-ctr-vs-apv-2026', label: 'watch time vs CTR vs APV' },
  'find-hidden-gem-videos': { href: '/blog/how-to-analyze-youtube-channel-performance', label: 'how to analyze your channel performance' },
  'why-did-my-video-flop': { href: '/blog/youtube-watch-time-vs-ctr-vs-apv-2026', label: 'watch time vs CTR vs APV' },
  'find-next-video-idea-from-analytics': { href: '/blog/youtube-content-ideas-generator-ai', label: 'the AI content-ideas generator' },
  'find-best-posting-time-from-data': { href: '/blog/best-time-to-post-on-youtube', label: 'the best time to post on YouTube' },
  'spot-a-video-taking-off-early': { href: '/blog/how-youtube-algorithm-works-2026', label: 'how the YouTube algorithm works in 2026' },
  'which-content-format-to-make-more-of': { href: '/blog/youtube-shorts-vs-long-form-2026', label: 'YouTube Shorts vs long-form in 2026' },
  'reverse-engineer-competitor-best-videos': { href: '/compare/social-blade-alternatives', label: 'the best Social Blade alternatives' },
  'set-realistic-youtube-view-goals': { href: '/blog/how-to-analyze-youtube-channel-performance', label: 'how to analyze your channel performance' },
  'audit-your-title-performance': { href: '/blog/youtube-title-formulas-that-get-clicks-2026', label: 'YouTube title formulas that get clicks' },
  'find-which-videos-bring-subscribers': { href: '/blog/how-to-get-first-1000-youtube-subscribers', label: 'how to get your first 1,000 subscribers' },
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}
  const canonical = `${SITE_URL}/guides/${guide.slug}`
  return {
    title: guide.seoTitle || guide.title,
    description: guide.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: guide.seoTitle || guide.title,
      description: guide.seoDescription,
      type: 'article',
      url: canonical,
    },
  }
}

function SectionHeading({ children }) {
  return (
    <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '56px 0 20px', lineHeight: 1.2 }}>
      {children}
    </h2>
  )
}

export default async function GuidePage({ params }) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  // Article structured data — invisible metadata, mirrors the visible page.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.seoDescription,
    datePublished: BUILD_DATE,
    dateModified: BUILD_DATE,
    author: ORG,
    publisher: PUBLISHER,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/guides/${guide.slug}` },
  }

  // HowTo structured data — built from the same steps rendered below. Bonus
  // machine-readable data; not relied on for rich results.
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.answer,
    step: guide.steps.map((s) => ({ '@type': 'HowToStep', name: s.title, text: s.detail })),
  }

  // FAQPage structured data — same shape and source as the blog/compare FAQ schema.
  const faqSchema = guide.faqs && guide.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  // Related guides: same cluster first, then the rest. 4-6 links.
  const related = [
    ...guides.filter((g) => g.slug !== guide.slug && g.cluster === guide.cluster),
    ...guides.filter((g) => g.slug !== guide.slug && g.cluster !== guide.cluster),
  ].slice(0, 6)

  const further = FURTHER_READING[guide.slug]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <JsonLd data={articleSchema} />
      <JsonLd data={howToSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '60px 20px 80px' }}>
        <Link href="/guides" style={{ color: C.primary, textDecoration: 'none', fontSize: 14, fontWeight: 600, letterSpacing: 0.5 }}>
          ← All guides
        </Link>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, margin: '32px 0 12px' }}>{guide.title}</h1>

        <div style={{ fontSize: 13, color: '#555', marginBottom: 36, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
          Last updated June 2026
        </div>

        <QuickAnswer text={guide.answer} />

        <p style={{ fontSize: 16, lineHeight: 1.8, color: C.body, marginTop: 0 }}>{guide.intro}</p>

        {/* What you'll need — compact tag row */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            What you’ll need
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {guide.whatYouNeed.map((w, i) => (
              <span key={i} style={{ fontSize: 13, fontWeight: 500, color: C.body, background: C.subCard, border: `1px solid ${C.border}`, padding: '6px 12px', borderRadius: 6 }}>
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Step by step — numbered list, the core of the page */}
        <SectionHeading>Step by step</SectionHeading>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {guide.steps.map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,0,0,0.12)',
                  color: C.primary,
                  fontWeight: 700,
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i + 1}
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '4px 0 6px', lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: C.body, margin: 0 }}>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Common mistakes — reuses the /compare weakness marker style (#f87171) */}
        <SectionHeading>Common mistakes</SectionHeading>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {guide.mistakes.map((m, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.7, color: C.body, marginBottom: 12, paddingLeft: 26, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: C.weakness, fontWeight: 700 }}>✕</span>
              {m}
            </li>
          ))}
        </ul>

        {/* NEXORA card — honest "it automates this exact task" */}
        <div style={{ marginTop: 40, background: C.card, border: '1px solid rgba(255,0,0,0.35)', borderRadius: 12, padding: '28px 32px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 12 }}>Let NEXORA do this for you</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: C.body, marginTop: 0, marginBottom: 16 }}>{guide.nexoraAngle}</p>
          <Link href="/" style={{ display: 'inline-block', fontSize: 14, fontWeight: 700, color: C.primary, textDecoration: 'none' }}>
            Try NEXORA free →
          </Link>
        </div>

        <FAQ items={guide.faqs} />

        {/* End CTA card — same as /compare */}
        <div style={{ marginTop: 56, padding: 32, background: '#111', border: `1px solid ${C.border}`, borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Want strategy from your own analytics?</p>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>
            NEXORA is an AI agent you plug into your channel — free during beta.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: C.primary, color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Try NEXORA Free
          </Link>
        </div>

        {/* Internal-link cluster: one contextual link + related guides */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
          {further && (
            <p style={{ fontSize: 15, color: C.body, lineHeight: 1.7, marginBottom: 28 }}>
              Further reading: see{' '}
              <Link href={further.href} style={{ color: C.primary, textDecoration: 'none', fontWeight: 600 }}>
                {further.label}
              </Link>
              .
            </p>
          )}
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Related guides</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {related.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                style={{ fontSize: 15, color: C.body, textDecoration: 'none', padding: '12px 16px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8 }}
              >
                {g.title}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}

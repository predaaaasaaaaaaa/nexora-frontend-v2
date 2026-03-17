'use client'

import Link from 'next/link'

const NexoraLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs><linearGradient id="nLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF0000"/><stop offset="100%" stopColor="#CC0000"/></linearGradient></defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nLG)"/>
  </svg>
)

export default function AITransparencyPage() {
  const sections = [
    {
      title: '1. Overview',
      content: 'NEXORA integrates artificial intelligence to provide YouTube creators with personalized coaching, content recommendations, and analytics insights. This page explains how AI is used within the Platform, what data it processes, and how we protect your information.',
    },
    {
      title: '2. AI Service Provider',
      content: 'NEXORA uses Groq (https://groq.com) as its third-party AI inference provider. Groq processes AI requests in real time to power the features described below. Groq does not store, retain, or use your data for any purpose beyond generating the immediate response to your request.',
    },
    {
      title: '3. How AI Is Used in NEXORA',
      subsections: [
        {
          subtitle: '3.1 AI Coach',
          content: 'The AI Coach is a chat-based assistant that provides personalized YouTube growth advice. When you send a message to the AI Coach, the following data may be included as context in the request to Groq:',
          list: [
            'Your YouTube channel statistics (subscriber count, total views, video count).',
            'Video metadata (titles, view counts, likes, comments, publish dates, duration).',
            'AI-detected content patterns (engagement rates, viral outliers, content format performance).',
            'Audience demographics (age, gender, country) if available via YouTube Analytics.',
            'Your conversation history within the current chat session.',
          ],
          after: 'This data is sent to Groq solely to generate a personalized coaching response. It is not stored by Groq after the response is delivered.',
        },
        {
          subtitle: '3.2 Content Ideas Generator',
          content: 'The Content Ideas feature generates video ideas tailored to your niche. When you request ideas, the following is sent to Groq:',
          list: [
            'Your selected niche or content category.',
            'General channel performance context (if YouTube is connected).',
          ],
          after: 'Ideas are generated in real time and returned to you. No data is retained by Groq.',
        },
        {
          subtitle: '3.3 AI Schedule Tips',
          content: 'The Scheduler provides AI-recommended posting times. This feature analyzes your video performance data locally and presents recommendations. Posting time analysis is based on your YouTube analytics data and does not require sending data to external AI services.',
        },
      ],
    },
    {
      title: '4. What Data Is Sent to AI Services',
      content: 'Only the minimum data necessary to generate a helpful response is sent to Groq. Specifically:',
      list: [
        'YouTube channel statistics and video metadata received via Google APIs.',
        'Your chat messages to the AI Coach.',
        'Your selected niche for content idea generation.',
      ],
      after: 'We do not send your email address, password, account credentials, payment information, or any personally identifiable information beyond what is described above.',
    },
    {
      title: '5. What AI Is NOT Used For',
      content: 'NEXORA is committed to responsible AI use. Your data — including all data received via Google APIs — is never used for the following purposes:',
      list: [
        'Training, developing, or improving generalized or non-personalized AI/ML models.',
        'Training, developing, or improving Groq\'s AI models or any third-party AI models.',
        'Targeted, personalized, retargeted, or interest-based advertising.',
        'Selling to data brokers or information resellers.',
        'Determining credit-worthiness or lending decisions.',
        'Creating databases or datasets for any purpose beyond providing your user-facing features.',
        'Any purpose other than providing and improving the NEXORA features you directly interact with.',
      ],
      after: 'This is in full compliance with the Google API Services User Data Policy, including the Limited Use requirements.',
    },
    {
      title: '6. Data Flow Summary',
      content: 'Here is how your data flows through NEXORA\'s AI features:',
      list: [
        'You connect your YouTube channel via Google OAuth (read-only access).',
        'NEXORA fetches your channel data using the YouTube Data API v3 and YouTube Analytics API v2.',
        'When you use the AI Coach or Content Ideas, relevant context is sent to Groq\'s API over an encrypted connection.',
        'Groq generates a response and returns it to NEXORA in real time.',
        'The response is displayed to you. Groq does not store your data after the response is delivered.',
        'Your conversation history is stored in NEXORA\'s database (Supabase) with row-level security so only you can access it.',
      ],
    },
    {
      title: '7. Security Measures',
      content: 'NEXORA implements multiple layers of security around its AI features:',
      list: [
        'All data sent to Groq is transmitted over encrypted HTTPS/TLS connections.',
        'Three-layer prompt injection security protects the AI Coach from malicious inputs (input detection, system prompt hardening, and output sanitization).',
        'Row-Level Security (RLS) in Supabase ensures users can only access their own data and conversations.',
        'API keys and credentials are stored as environment variables and never exposed to the client.',
      ],
    },
    {
      title: '8. Your Control',
      content: 'You have full control over your data and AI interactions:',
      list: [
        'You can disconnect your YouTube account at any time from the Settings page, which removes all stored channel data.',
        'You can delete individual AI Coach conversations at any time.',
        'You can revoke NEXORA\'s access to your Google account at any time via https://myaccount.google.com/permissions.',
        'You can stop using AI features at any time without affecting your account.',
      ],
    },
    {
      title: '9. Changes to This Policy',
      content: 'We may update this AI Transparency page as we add new features or change AI providers. When we do, we will update the "Last updated" date at the top of this page. For significant changes, we will notify you via email or through the Platform.',
    },
    {
      title: '10. Contact Us',
      content: 'If you have any questions about how AI is used in NEXORA, you can contact us:',
      contacts: [
        { label: 'General Support', email: 'support@nexora-ai.org' },
        { label: 'Help & Inquiries', email: 'help@nexora-ai.org' },
        { label: 'Owner/Developer', email: 'samymetref@nexora-ai.org' },
        { label: 'Website', value: 'nexora-ai.org', href: 'https://nexora-ai.org' },
      ],
    },
  ]

  return (
    <div style={{ fontFamily: "'Outfit', -apple-system, sans-serif", background: '#0A0A0A', color: '#F1F1F1', minHeight: '100vh' }}>
      <style>{`
        .legal-link { color: #FF0000; text-decoration: none; transition: opacity 0.15s; }
        .legal-link:hover { opacity: 0.8; text-decoration: underline; }
      `}</style>

      {/* Nav */}
      <nav style={{ padding: '14px 40px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#F1F1F1' }}>
          <NexoraLogo size={28} />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>NEXORA</span>
        </Link>
        <Link href="/" style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back to home</Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 6, background: 'rgba(255,0,0,0.08)', border: '1px solid rgba(255,0,0,0.15)', marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#FF0000' }}>LEGAL</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, marginBottom: 12 }}>AI Transparency</h1>
          <p style={{ fontSize: 15, color: '#888' }}>Last updated: March 17, 2026</p>
          <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
            Website: <a href="https://nexora-ai.org" className="legal-link">nexora-ai.org</a>
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F1F1F1', marginBottom: 12, letterSpacing: -0.3 }}>{section.title}</h2>
            
            {section.content && (
              <p style={{ fontSize: 15, color: '#AAA', lineHeight: 1.8, marginBottom: section.list || section.subsections ? 14 : 0 }}>{section.content}</p>
            )}

            {section.list && (
              <ul style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.list.map((item, li) => (
                  <li key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#999', lineHeight: 1.7 }}>
                    <span style={{ color: '#FF0000', marginTop: 2, flexShrink: 0 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.after && (
              <p style={{ fontSize: 14, color: '#999', lineHeight: 1.8, marginTop: 14 }}>{section.after}</p>
            )}

            {/* Subsections */}
            {section.subsections?.map((sub, si) => (
              <div key={si} style={{ marginTop: si === 0 ? 0 : 24, marginBottom: 20, paddingLeft: 16, borderLeft: '2px solid rgba(255,0,0,0.15)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F1F1F1', marginBottom: 8 }}>{sub.subtitle}</h3>
                {sub.content && (
                  <p style={{ fontSize: 14, color: '#AAA', lineHeight: 1.8, marginBottom: sub.list ? 10 : 0 }}>{sub.content}</p>
                )}
                {sub.list && (
                  <ul style={{ margin: '0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sub.list.map((item, li) => (
                      <li key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#999', lineHeight: 1.7 }}>
                        <span style={{ color: '#FF0000', marginTop: 2, flexShrink: 0 }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sub.after && (
                  <p style={{ fontSize: 13, color: '#888', lineHeight: 1.8, marginTop: 10 }}>{sub.after}</p>
                )}
              </div>
            ))}

            {/* Contacts */}
            {section.contacts && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {section.contacts.map((c, ci) => (
                  <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, color: '#888', minWidth: 140 }}>{c.label}:</span>
                    {c.email ? (
                      <a href={`mailto:${c.email}`} className="legal-link" style={{ fontSize: 14 }}>{c.email}</a>
                    ) : (
                      <a href={c.href} className="legal-link" style={{ fontSize: 14 }}>{c.value}</a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 60, paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>← Back to home</Link>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/privacy" className="legal-link" style={{ fontSize: 13 }}>Privacy Policy</Link>
            <Link href="/terms" className="legal-link" style={{ fontSize: 13 }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
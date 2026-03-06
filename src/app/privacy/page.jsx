'use client'

import Link from 'next/link'

const NexoraLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs><linearGradient id="nLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF0000"/><stop offset="100%" stopColor="#CC0000"/></linearGradient></defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nLG)"/>
  </svg>
)

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: `This Privacy Policy describes how NEXORA ("the Platform," "we," "our," or "us"), available at nexora-ai.org, collects, uses, stores, and protects your personal information when you use our services. By using NEXORA, you agree to the collection and use of information in accordance with this Privacy Policy.`,
    },
    {
      title: '2. Information We Collect',
      subsections: [
        {
          subtitle: '2.1 Account Information',
          content: 'When you create an account, we collect:',
          list: [
            'Email address (used for authentication and email reminders).',
            'Username (used for display purposes within the Platform).',
            'Password (stored securely in hashed form via Supabase Auth — we never store plaintext passwords).',
            'Account creation date.',
          ],
        },
        {
          subtitle: '2.2 YouTube Data',
          content: 'When you connect your YouTube channel via Google OAuth, we access and store:',
          list: [
            'Channel name and profile thumbnail.',
            'Subscriber count, total views, and video count.',
            'Video metadata (titles, publish dates, view counts, likes, comments).',
            'Engagement rate calculations and performance metrics.',
          ],
          after: 'This data is accessed through the YouTube Data API v3 and YouTube Analytics API v2 with read-only permissions. NEXORA does not access, modify, or delete any content on your YouTube channel. We do not access your private YouTube messages, financial data, or Google account credentials beyond what is required for authentication.',
        },
        {
          subtitle: '2.3 AI Coach Conversations',
          content: 'When you use the AI Coach, we store:',
          list: [
            'Your chat messages and the AI responses.',
            'Conversation history and metadata (creation date, last updated).',
            'The platform context selected for each conversation (e.g., YouTube).',
          ],
          after: 'Conversation data is stored to provide continuity across sessions and to improve the quality of AI responses. You can delete individual conversations at any time from the AI Coach interface.',
        },
        {
          subtitle: '2.4 Scheduled Content',
          content: 'When you use the Content Scheduler, we store:',
          list: [
            'Post titles, descriptions, and notes.',
            'Scheduled dates and times.',
            'Platform and content type selections.',
            'Notification preferences (email address and reminder timing).',
          ],
        },
        {
          subtitle: '2.5 Usage Data',
          content: 'We may automatically collect:',
          list: [
            'Pages visited and features used within the Platform.',
            'Browser type and device information.',
            'IP address (for security and abuse prevention).',
            'Timestamps of interactions.',
          ],
        },
      ],
    },
    {
      title: '3. How We Use Your Information',
      content: 'We use your information to:',
      list: [
        'Provide, operate, and maintain the Platform and its features.',
        'Authenticate your identity and manage your account.',
        'Display your YouTube analytics and generate AI-powered insights.',
        'Provide personalized AI coaching based on your channel data.',
        'Generate tailored content ideas based on your niche and performance data.',
        'Send scheduled content reminders via email (only if you opt in).',
        'Improve and develop new features for the Platform.',
        'Detect, prevent, and address security issues and abuse.',
        'Communicate with you about service updates or changes.',
      ],
      after: 'We do not use your personal data for advertising purposes. We do not sell, rent, or trade your personal information to third parties.',
    },
    {
      title: '4. Data Storage and Security',
      content: 'Your data is stored and secured using the following measures:',
      list: [
        'Authentication and database services are provided by Supabase, which uses industry-standard encryption and security practices.',
        'Row-Level Security (RLS) policies are enforced in our database, ensuring users can only access their own data.',
        'All data transmission between your browser and our servers is encrypted using HTTPS/TLS.',
        'Passwords are hashed and salted — we never store or have access to your plaintext password.',
        'The AI Coach implements three-layer prompt injection security (input detection, system prompt hardening, and output sanitization) to protect against malicious inputs.',
        'API keys and sensitive credentials are stored as environment variables and are never exposed to the client.',
      ],
    },
    {
      title: '5. Third-Party Services',
      content: 'NEXORA uses the following third-party services to operate. Each service has its own privacy policy governing how they handle data:',
      list: [
        'Google / YouTube APIs — For YouTube channel data access via OAuth 2.0. Subject to Google\'s Privacy Policy (https://policies.google.com/privacy) and Google API Services User Data Policy.',
        'Supabase — For authentication, database, and user management. Subject to Supabase\'s Privacy Policy (https://supabase.com/privacy).',
        'Groq — For AI language model processing (powers the AI Coach and Content Ideas). Subject to Groq\'s Privacy Policy.',
        'Resend — For sending scheduled content reminder emails. Subject to Resend\'s Privacy Policy.',
      ],
      after: 'We only share the minimum data necessary with each third-party service to provide our features. We do not share your YouTube analytics data or AI conversation history with any third party for marketing or advertising purposes.',
    },
    {
      title: '6. Google API Services User Data Policy Compliance',
      content: `NEXORA's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements (https://developers.google.com/terms/api-services-user-data-policy). Specifically:`,
      list: [
        'We only request access to the data necessary to provide our services (YouTube channel statistics and video analytics).',
        'We do not use Google user data for serving advertisements.',
        'We do not allow humans to read your Google user data unless we have your explicit consent, it is necessary for security purposes, or it is required by law.',
        'We do not transfer Google user data to third parties except as necessary to provide our services, as required by law, or with your explicit consent.',
        'You can revoke NEXORA\'s access to your Google data at any time via https://myaccount.google.com/permissions.',
      ],
    },
    {
      title: '7. Data Retention',
      content: 'We retain your data as follows:',
      list: [
        'Account data — Retained for as long as your account is active. Deleted upon account deletion.',
        'YouTube analytics data — Refreshed periodically and retained for as long as your YouTube account is connected. Deleted when you disconnect your YouTube account.',
        'AI Coach conversations — Retained until you delete them manually or delete your account.',
        'Scheduled content data — Retained until you delete individual posts or your account.',
        'Email notification preferences — Retained until you disable notifications or delete your account.',
      ],
    },
    {
      title: '8. Your Rights',
      content: 'Depending on your location, you may have the following rights regarding your personal data:',
      list: [
        'Access — You can view your personal data through your account dashboard and settings.',
        'Correction — You can update your account information at any time.',
        'Deletion — You can delete your AI Coach conversations individually, disconnect your YouTube account to remove analytics data, or contact us to request full account deletion.',
        'Revoke Consent — You can disconnect your YouTube account or disable email notifications at any time from the Settings page.',
        'Data Portability — You can request a copy of your personal data by contacting us.',
        'Object to Processing — You can contact us to object to specific processing activities.',
      ],
      after: 'To exercise any of these rights, contact us at the email addresses listed below or use the relevant controls within the Platform.',
    },
    {
      title: '9. Cookies and Local Storage',
      content: 'NEXORA uses minimal browser storage:',
      list: [
        'Authentication tokens — Stored securely to keep you signed in (managed by Supabase Auth).',
        'Theme preference — Your dark/light mode preference is stored in localStorage.',
        'Session data — Temporary data necessary for the Platform to function.',
      ],
      after: 'We do not use third-party tracking cookies, advertising cookies, or analytics cookies.',
    },
    {
      title: '10. Children\'s Privacy',
      content: 'NEXORA is not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us and we will promptly delete such information.',
    },
    {
      title: '11. International Data Transfers',
      content: 'Your data may be processed in countries other than your country of residence through our third-party service providers (Supabase, Groq, Resend). These providers maintain appropriate safeguards for data protection. By using NEXORA, you consent to the transfer of your information to these providers.',
    },
    {
      title: '12. Changes to This Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. For significant changes, we will make reasonable efforts to notify you via email or through the Platform. We encourage you to review this Privacy Policy periodically.',
    },
    {
      title: '13. Contact Us',
      content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, you can contact us:',
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
          <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontSize: 15, color: '#888' }}>Last updated: March 6, 2026</p>
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
          <Link href="/terms" className="legal-link" style={{ fontSize: 13 }}>Terms of Service →</Link>
        </div>
      </div>
    </div>
  )
}
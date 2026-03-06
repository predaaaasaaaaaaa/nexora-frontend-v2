'use client'

import Link from 'next/link'

const NexoraLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs><linearGradient id="nLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF0000"/><stop offset="100%" stopColor="#CC0000"/></linearGradient></defs>
    <path d="M25 95V25L55 65V25L95 95H70L55 65V95H25Z" fill="url(#nLG)"/>
  </svg>
)

export default function TermsOfServicePage() {
  const sections = [
    {
      title: '1. Agreement to Terms',
      content: `By accessing or using NEXORA ("the Platform," "we," "our," or "us"), available at nexora-ai.org, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.`,
    },
    {
      title: '2. Description of Service',
      content: `NEXORA is an AI-powered YouTube analytics and growth strategy platform. The Platform provides the following services:`,
      list: [
        'YouTube Analytics Dashboard — Real-time channel analytics by connecting your YouTube account via Google OAuth with read-only access.',
        'AI Coach — An AI-powered chat assistant that analyzes your YouTube data and provides personalized growth strategies, channel audits, competitor analysis, and content recommendations.',
        'Content Scheduler — A calendar-based content planning tool with email reminders for scheduled posts.',
        'Content Ideas Generator — AI-generated content ideas tailored to your niche and channel performance data.',
      ],
      after: 'NEXORA currently supports YouTube as its primary platform. Support for additional platforms (Instagram, TikTok, Threads) is planned for future releases.',
    },
    {
      title: '3. Eligibility',
      content: 'You must be at least 16 years old to use this Platform. By creating an account, you represent that you meet this age requirement and that all information you provide is accurate and complete.',
    },
    {
      title: '4. Account Registration',
      content: 'To use NEXORA, you must create an account using a valid email address and password. You are responsible for:',
      list: [
        'Maintaining the confidentiality of your account credentials.',
        'All activities that occur under your account.',
        'Notifying us immediately of any unauthorized use of your account.',
      ],
    },
    {
      title: '5. YouTube Data Access',
      content: 'When you connect your YouTube channel to NEXORA, you authorize us to access your YouTube data through the YouTube Data API v3 and YouTube Analytics API v2. This access is:',
      list: [
        'Read-only — NEXORA does not post, modify, or delete any content on your YouTube channel.',
        'Revocable — You can disconnect your YouTube account at any time from the Settings page.',
        'Limited — We only access channel statistics, video metadata, and analytics data necessary to provide our services.',
      ],
      after: `NEXORA's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. You can revoke NEXORA's access to your Google account at any time via your Google Account permissions at https://myaccount.google.com/permissions.`,
    },
    {
      title: '6. Acceptable Use',
      content: 'You agree not to:',
      list: [
        'Use the Platform for any unlawful or fraudulent purpose.',
        'Attempt to gain unauthorized access to any part of the Platform or its systems.',
        'Reverse-engineer, decompile, or disassemble any part of the Platform.',
        'Use the Platform to harass, abuse, or harm others.',
        'Attempt to manipulate or abuse the AI Coach through prompt injection or similar techniques.',
        'Share your account credentials with third parties.',
        'Use automated scripts or bots to access the Platform.',
      ],
      after: 'We reserve the right to suspend or terminate accounts that violate these terms without prior notice.',
    },
    {
      title: '7. AI-Generated Content Disclaimer',
      content: 'The AI Coach and Content Ideas Generator provide suggestions and recommendations based on your data and AI analysis. These are provided for informational purposes only. NEXORA does not guarantee:',
      list: [
        'The accuracy, completeness, or reliability of AI-generated advice.',
        'Any specific growth, engagement, or revenue outcomes.',
        'That AI recommendations will be suitable for your specific situation.',
      ],
      after: 'You are solely responsible for the content you create and publish based on recommendations from NEXORA.',
    },
    {
      title: '8. Pricing and Subscriptions',
      content: 'NEXORA is currently available as a free beta. All features are accessible at no charge during the beta period. We reserve the right to introduce paid subscription plans in the future, at which point:',
      list: [
        'Existing users will be notified in advance of any pricing changes.',
        'Payment processing will be handled securely through third-party payment processors.',
        'Subscription details, including pricing and billing cycles, will be clearly communicated before any charges are applied.',
      ],
    },
    {
      title: '9. Intellectual Property',
      content: 'The NEXORA Platform, including its design, code, features, and branding, is owned by NEXORA and protected by intellectual property laws. Your YouTube data and content remain your property. You grant NEXORA a limited license to process your data solely for the purpose of providing the services described in these Terms.',
    },
    {
      title: '10. Limitation of Liability',
      content: 'To the maximum extent permitted by law:',
      list: [
        'NEXORA is provided "as is" and "as available" without warranties of any kind.',
        'We are not responsible for any actions taken on your YouTube channel or other platforms based on recommendations from our AI tools.',
        'We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.',
        'Our total liability shall not exceed the amount you paid for the service in the 12 months prior to the claim.',
        'We are not responsible for any loss of data, revenue, or business opportunities.',
      ],
    },
    {
      title: '11. Third-Party Services',
      content: 'NEXORA integrates with third-party services including Google/YouTube APIs, Supabase (authentication and database), Groq (AI processing), and Resend (email notifications). Your use of these services is subject to their respective terms and privacy policies. We are not responsible for the availability or performance of third-party services.',
    },
    {
      title: '12. Termination',
      content: 'You may stop using NEXORA at any time by disconnecting your accounts and ceasing to use the Platform. We may suspend or terminate your access if you violate these Terms. Upon termination, your right to use the Platform ceases immediately, and we may delete your account data in accordance with our Privacy Policy.',
    },
    {
      title: '13. Modifications to Terms',
      content: 'We may update these Terms of Service at any time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the Platform after changes constitutes acceptance of the updated terms. For significant changes, we will make reasonable efforts to notify you via email or through the Platform.',
    },
    {
      title: '14. Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or your use of the Platform shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the competent courts.',
    },
    {
      title: '15. Contact Us',
      content: 'If you have any questions about these Terms of Service, you can contact us:',
      contacts: [
        { label: 'General Support', email: 'support@nexora-ai.org' },
        { label: 'Help & Inquiries', email: 'help@nexora-ai.org' },
        { label: 'Owner/Developer', email: 'samymetref@nexora-ai.org' },
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
          <h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, marginBottom: 12 }}>Terms of Service</h1>
          <p style={{ fontSize: 15, color: '#888' }}>Last updated: March 6, 2026</p>
          <p style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
            Website: <a href="https://nexora-ai.org" className="legal-link">nexora-ai.org</a>
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F1F1F1', marginBottom: 12, letterSpacing: -0.3 }}>{section.title}</h2>
            {section.content && (
              <p style={{ fontSize: 15, color: '#AAA', lineHeight: 1.8, marginBottom: section.list ? 14 : 0 }}>{section.content}</p>
            )}
            {section.list && (
              <ul style={{ margin: '0 0 0 0', padding: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
            {section.contacts && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {section.contacts.map((c, ci) => (
                  <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, color: '#888', minWidth: 140 }}>{c.label}:</span>
                    <a href={`mailto:${c.email}`} className="legal-link" style={{ fontSize: 14 }}>{c.email}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ marginTop: 60, paddingTop: 30, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: 13, color: '#666', textDecoration: 'none' }}>← Back to home</Link>
          <Link href="/privacy" className="legal-link" style={{ fontSize: 13 }}>Privacy Policy →</Link>
        </div>
      </div>
    </div>
  )
}
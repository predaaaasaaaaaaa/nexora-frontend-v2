import Link from 'next/link'

export default function Post57Content() {
  const h2 = { fontSize: 26, fontWeight: 700, color: '#fff', marginTop: 48, marginBottom: 16, lineHeight: 1.2 }
  const h3 = { fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 36, marginBottom: 12, lineHeight: 1.3 }
  const p = { fontSize: 16, lineHeight: 1.8, color: '#ccc', marginBottom: 16 }
  const strong = { color: '#fff', fontWeight: 600 }
  const inlineLink = { color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }
  const sectionCard = { background: '#161616', border: '1px solid #222', borderRadius: 10, padding: '24px 28px', marginBottom: 24 }
  const stepCard = { background: '#161616', border: '1px solid #222', borderRadius: 10, padding: '20px 24px', marginBottom: 16 }
  const stepNumber = { fontSize: 12, fontWeight: 800, color: '#FF0000', letterSpacing: 1.5, marginBottom: 8, display: 'block' }
  const dataTable = { width: '100%', borderCollapse: 'collapse', marginTop: 16, marginBottom: 24, fontSize: 14 }
  const th = { textAlign: 'left', padding: '12px 16px', background: '#1a1a1a', color: '#fff', fontWeight: 700, fontSize: 13, borderBottom: '1px solid #333' }
  const td = { padding: '10px 16px', borderBottom: '1px solid #1a1a1a', color: '#aaa', fontSize: 13 }
  const tipBox = { background: 'rgba(255,0,0,0.03)', border: '1px solid rgba(255,0,0,0.15)', borderRadius: 10, padding: '20px 24px', marginTop: 24, marginBottom: 24 }
  const tipLabel = { fontSize: 12, fontWeight: 700, color: '#FF0000', letterSpacing: 1, marginBottom: 8, display: 'block' }
  const mistakeCard = { background: 'rgba(248,113,113,0.04)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, padding: '18px 22px', marginBottom: 12 }
  const mistakeLabel = { fontSize: 11, fontWeight: 800, color: '#f87171', letterSpacing: 1.5, marginBottom: 6, display: 'block' }

  return (
    <>
      <p style={p}>
        If your Shorts pull millions of views and the revenue feels strangely small, you are not imagining it. Shorts do not pay like long-form videos, and the reason is a mechanic most creators have never had explained: the Creator Pool. Your Shorts earnings are not calculated from your own ad impressions. They come from a shared pool, split by your share of total views, and then you receive 45% of that allocation.
      </p>

      <p style={p}>
        That model is completely different from long-form, where ads run on your specific video and you take the larger cut. Understanding the pool is what separates creators who build a real Shorts income from those who chase view counts and wonder why the check is thin. It also explains why a viral Short and a viral long-form video with identical view counts can earn wildly different amounts.
      </p>

      <p style={p}>
        Here is exactly how Shorts monetization works in 2026, where the money actually comes from, and what moves your share.
      </p>

      <h2 style={h2}>First: what counts as a Short in 2026</h2>

      <p style={p}>
        A vertical video up to three minutes long is now officially a Short. It is served in the Shorts feed and monetized through the Shorts revenue-share model rather than traditional long-form ad placements. That distinction matters, because the same three-minute idea earns through completely different math depending on whether it lands as a Short or a regular video &mdash; a trade-off explored in <Link href="/blog/youtube-shorts-vs-long-form-2026" style={inlineLink}>the Shorts vs long-form breakdown</Link>.
      </p>

      <h2 style={h2}>How the Creator Pool actually works</h2>

      <p style={p}>
        The mechanic runs in three steps, and each one quietly shrinks the number from the headline view count to the dollars that land in your account.
      </p>

      <div style={stepCard}>
        <span style={stepNumber}>STEP 1 — ADS ARE POOLED, NOT ATTACHED TO YOUR SHORT</span>
        <p style={{ ...p, marginBottom: 0 }}>
          All advertising revenue from the Shorts feed across the whole platform goes into one shared Creator Pool. No ad is tied to your specific Short the way it is on a long-form video. This is the core difference and the source of all the others.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>STEP 2 — THE POOL IS SPLIT BY YOUR SHARE OF VIEWS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Your slice of the pool is based on your share of total Shorts views, with music-licensed views factored in. Before your cut is calculated, the cost of any licensed music in your Shorts is deducted from the pool &mdash; which is why using trending tracks no longer triggers a red dollar sign, but does quietly reduce the pot.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>STEP 3 — YOU RECEIVE 45% OF YOUR ALLOCATION</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Of the revenue allocated to you from the pool, you keep 45% and YouTube keeps the rest. That 45% is fixed whether you use music or not, so the lever you control is your share of views and how efficiently those views convert in your region and niche.
        </p>
      </div>

      <h2 style={h2}>Why Shorts RPM is lower than long-form</h2>

      <p style={p}>
        Put the three steps together and the low Shorts RPM makes sense. The revenue is shared, diluted across billions of daily views, reduced by music licensing, and then cut to 45%. A long-form video runs its own ads, holds attention for minutes instead of seconds, and pays a much higher effective rate per thousand views. This is exactly why the <Link href="/blog/youtube-revenue-streams-ranked-2026" style={inlineLink}>ranked revenue streams</Link> place raw Shorts ad income well below your own products and brand deals.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Factor</th>
            <th style={th}>Shorts</th>
            <th style={th}>Long-form</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Revenue source</td><td style={td}>Shared Creator Pool</td><td style={td}>Ads on your own video</td></tr>
          <tr><td style={td}>Your split</td><td style={td}>45% of allocation</td><td style={td}>55% of ad revenue</td></tr>
          <tr><td style={td}>Music cost</td><td style={td}>Deducted from pool first</td><td style={td}>Separate handling</td></tr>
          <tr><td style={td}>Effective RPM</td><td style={td}>Low</td><td style={td}>Much higher</td></tr>
          <tr><td style={td}>Best use</td><td style={td}>Reach + discovery + funnel</td><td style={td}>Depth + ad income</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>So how should you actually monetize Shorts?</h2>

      <p style={p}>
        Stop treating Shorts ad revenue as the prize. The real value of Shorts is reach &mdash; they are the top of your funnel, the cheapest way to put your face in front of millions of new viewers. Monetize that reach through the higher-value streams: drive viewers to long-form where ad RPM is far better, convert them into fans who fund you through memberships and Super Thanks, and tag products through YouTube Shopping, which in 2026 supports native in-app checkout so viewers buy without ever leaving the app. The Short earns pennies in the pool; the audience it brings you is where the money is.
      </p>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISTAKE: CHASING SHORTS VIEWS FOR AD MONEY</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Optimizing your whole channel around Shorts ad revenue is optimizing for the lowest-paying stream on the platform. Millions of Shorts views can produce a disappointing payout because of the pool math &mdash; and if your long-form checks come in thin too, low Shorts pay is only one of the <Link href="/blog/why-is-my-youtube-rpm-low-2026" style={inlineLink}>reasons your RPM is low</Link>. Use Shorts to win attention, then route that attention to something that actually pays.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>SEE WHAT YOUR SHORTS ARE REALLY WORTH</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). It reads your Shorts performance against your long-form and your funded revenue, so you can see whether your Shorts are actually converting viewers into higher-value income or just burning reach. Ask &quot;are my Shorts driving subscribers and long-form views or just racking up cheap views&quot; and you get the honest answer. The eligibility side is covered in <Link href="/blog/youtube-monetization-requirements-2026" style={inlineLink}>the 2026 monetization requirements</Link>.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> Shorts do not pay like long-form. Your earnings come from a shared Creator Pool split by your share of total views, not from ads on your specific Short.</p>
        <p style={p}><span style={strong}>2.</span> The pool math has three steps: ad revenue is pooled, split by your view share (music-licensed views included), then you receive 45% of your allocation.</p>
        <p style={p}><span style={strong}>3.</span> Licensed music is no longer blocked, but its cost is deducted from the pool before your 45% cut &mdash; trending tracks are allowed but quietly shrink the pot.</p>
        <p style={p}><span style={strong}>4.</span> A vertical video up to 3 minutes is a Short and earns through the Shorts model, so the same idea pays very differently as a Short versus a long-form upload.</p>
        <p style={p}><span style={strong}>5.</span> Shorts RPM is low by design &mdash; shared, diluted, reduced by music, then cut to 45%. Long-form runs its own ads and pays far more per thousand views.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> Monetize the reach, not the Short. Use Shorts to win attention at the top of the funnel, then route viewers to long-form, fan funding, and Shopping (now with in-app checkout) where the real money is.</p>
      </div>
    </>
  )
}
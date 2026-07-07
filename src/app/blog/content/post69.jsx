import Link from 'next/link'

export default function Post69Content() {
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
        Your views are climbing but your earnings are not, or your RPM quietly dropped while nothing about your content changed. It is one of the most frustrating things on YouTube &mdash; and almost never bad luck. A low or falling RPM traces to a short list of specific, identifiable causes, and once you know which one is yours, most are fixable.
      </p>

      <p style={p}>
        Before the causes, one reframe that resolves half the confusion: RPM is supposed to be lower than you expect. It is your revenue per 1,000 views after YouTube&apos;s 45% cut and after every view where no ad ran &mdash; the full mechanics are in <Link href="/blog/how-much-youtube-pays-per-1000-views-2026" style={inlineLink}>how much YouTube pays per 1,000 views</Link>. The question is not why your RPM is lower than your CPM (that is normal); it is why your RPM is lower than others in your niche. Here are the seven reasons.
      </p>

      <h2 style={h2}>The 7 reasons your RPM is low</h2>

      <div style={stepCard}>
        <span style={stepNumber}>1 — YOUR AUDIENCE IS IN LOW-CPM COUNTRIES</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The biggest factor by far. Views from India, Pakistan, Bangladesh, or Nigeria pay a fraction of views from the US, UK, Canada, or Australia &mdash; often 5 to 10 times less. The same content with a different audience geography earns wildly different RPM, and there is no setting that fixes it; it is who is watching.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#f59e0b' }}>2 — YOU&apos;RE POSTING SHORTS, NOT LONG-FORM</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Shorts RPM ($0.03 to $0.08 per 1,000) is roughly 50 to 70% lower than long-form in the same niche, because Shorts ad revenue is pooled and creators take a smaller share. A channel leaning on Shorts will always show a low blended RPM &mdash; that is the format, working as designed.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>3 — YOUR VIDEOS ARE UNDER 8 MINUTES</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Videos over 8 minutes unlock mid-roll ads, which can double or triple ad impressions per view. If your videos are short, you are leaving the highest-impact monetization slot switched off, and your RPM reflects it.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#8b5cf6' }}>4 — IT&apos;S Q1 (THE BUDGET RESET)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          If your RPM dropped 30 to 50% in January with no other change, this is why. Advertiser budgets surge in Q4 for the holidays and reset hard in the new year. It recovers as the year progresses &mdash; a falling RPM in January is a calendar event, not a channel problem.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#f87171' }}>5 — YOUR NICHE IS LOW-CPM</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Entertainment, reaction content, general vlogs, and gaming attract lower advertiser spend than finance, tech, or education, because the audience is further from a purchase decision. A low-CPM niche caps your RPM no matter how well the videos perform.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>6 — YOUR RETENTION IS LOW</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Stronger audience retention means more of the video gets watched, which means more ad impressions and better placements &mdash; so weak retention quietly suppresses RPM. Reading <Link href="/blog/youtube-audience-retention-graph-2026" style={inlineLink}>your audience retention graph</Link> often reveals an earnings problem hiding as an engagement problem.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#FF8C00' }}>7 — YOUR AD SETTINGS ARE LIMITING IT</span>
        <p style={{ ...p, marginBottom: 0 }}>
          If you have disabled ad formats or are not running mid-rolls where appropriate, you are capping your own ceiling. Enabling the full set of ad formats on long-form is the simplest lever most under-earning channels never pull.
        </p>
      </div>

      <h2 style={h2}>Reason, cause, and fix at a glance</h2>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Reason</th>
            <th style={th}>Why RPM drops</th>
            <th style={th}>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Low-CPM audience geography</td><td style={td}>Cheaper ad market</td><td style={td}>Create for higher-CPM regions; can&apos;t toggle</td></tr>
          <tr><td style={td}>Posting Shorts</td><td style={td}>Pooled revenue, smaller share</td><td style={td}>Shift weight to long-form</td></tr>
          <tr><td style={td}>Under 8 minutes</td><td style={td}>No mid-roll ads</td><td style={td}>Make 8+ minute videos</td></tr>
          <tr><td style={td}>Q1 timing</td><td style={td}>Ad budgets reset</td><td style={td}>Wait it out; plan launches for Q4</td></tr>
          <tr><td style={td}>Low-CPM niche</td><td style={td}>Low advertiser intent</td><td style={td}>Target commercial sub-topics</td></tr>
          <tr><td style={td}>Low retention</td><td style={td}>Fewer ad impressions</td><td style={td}>Improve the retention curve</td></tr>
          <tr><td style={td}>Limited ad settings</td><td style={td}>Fewer ad slots filled</td><td style={td}>Enable all ad formats</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>How to tell which one is your problem</h2>

      <p style={p}>
        Compare your RPM to the average for your niche. If you get 200,000 monthly views but earn only $400, and your niche typically runs $7 to $9 RPM while yours sits at $2, the problem is not views &mdash; it is monetization, and it is one of the seven above. That single comparison tells you whether to fix audience geography, video length, or niche selection, and it stops you wasting effort on the wrong variable. Ad income is also only one lever &mdash; once RPM is capped by factors you cannot change, the answer is <Link href="/blog/youtube-revenue-streams-ranked-2026" style={inlineLink}>diversifying your revenue streams</Link>.
      </p>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISTAKE: MAKING MORE VIDEOS TO FIX LOW RPM</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Low RPM is a per-view monetization problem, and more uploads do not fix a per-view problem &mdash; they just produce more low-paying views. A creator with a $2 RPM who doubles output still has a $2 RPM. The fix is to change the variable suppressing the rate (geography, format, length, niche, retention, ad settings), not to push more volume through a leaky rate.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>FIND THE FACTOR HURTING YOUR RPM</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). It compares your RPM against what your content should earn and surfaces which factor is dragging it &mdash; audience geography, format mix, video length, or retention &mdash; so you fix the right variable instead of guessing. Ask &quot;why is my RPM lower than it should be&quot; and you get the specific cause from your own data, plus where to aim next via <Link href="/blog/how-to-make-money-on-youtube-2026" style={inlineLink}>the complete monetization guide</Link>.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> RPM being lower than CPM is normal (45% cut + non-monetized views). The real question is why your RPM is lower than others in your niche &mdash; and that has specific causes.</p>
        <p style={p}><span style={strong}>2.</span> The biggest factor is audience geography: low-CPM countries pay 5 to 10 times less per view than the US, UK, Canada, or Australia.</p>
        <p style={p}><span style={strong}>3.</span> Posting Shorts (pooled, smaller share) and videos under 8 minutes (no mid-roll ads) both structurally suppress RPM.</p>
        <p style={p}><span style={strong}>4.</span> A 30 to 50% drop in January is the Q1 ad-budget reset, not a channel problem &mdash; it recovers through the year.</p>
        <p style={p}><span style={strong}>5.</span> Low-CPM niches, weak retention (fewer ad impressions), and limited ad settings each cap your rate. Enabling all ad formats is the simplest unpulled lever.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> Diagnose by comparing your RPM to your niche average, then fix the variable &mdash; not the volume. More videos at a low RPM just make more low-paying views.</p>
      </div>
    </>
  )
}
import Link from 'next/link'

export default function Post67Content() {
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
        The audience retention graph is the most honest report in YouTube Studio. Every other metric tells you what happened; the retention curve tells you exactly where and why people left &mdash; second by second, on a line you can read like a story. Yet most creators glance at one number, the average view percentage, and miss everything the shape of the curve is screaming at them.
      </p>

      <p style={p}>
        Learning to read that shape is one of the highest-return skills on the platform, because it turns a vague &quot;this video did worse&quot; into a precise &quot;people left at 0:18 when I rambled before the payoff.&quot; That precision is what lets you fix the actual problem instead of guessing. Here is how to read the graph, what each pattern means, and what to do about it.
      </p>

      <h2 style={h2}>Where it is and what the numbers mean</h2>

      <p style={p}>
        In Studio, open a video, go to Analytics, then the Engagement tab. The key number is average view duration (and its percentage), but the gold is the graph beneath it: the horizontal axis is the video&apos;s timeline, the vertical axis is the percentage of viewers still watching at that moment. A flat-ish line means people are staying; every dip is an exit. YouTube also gives you a relative line showing how your retention compares to similar videos &mdash; useful, but your own curve is where the fixes live.
      </p>

      <h2 style={h2}>The four patterns and what each one means</h2>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#f87171' }}>1 — THE INTRO CLIFF (the first 30 seconds)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Almost every video&apos;s steepest drop is at the very start &mdash; this is normal, but its severity is the single most important thing on the graph. Lose 40% in the first 30 seconds and the video is fighting uphill no matter how good the rest is. A sharp intro cliff means your hook is not delivering on the title&apos;s promise fast enough. This is where <Link href="/blog/youtube-hook-formulas-first-30-seconds-2026" style={inlineLink}>your first 30 seconds</Link> decide everything.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>2 — THE GENTLE SLOPE (healthy decline)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          A gradual, steady decline across the video is normal and healthy &mdash; you will never keep 100%, and slowly losing viewers as the video runs is expected. The flatter this slope, the better. A long video that holds a gentle slope is far stronger than a short one that falls off a cliff.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>3 — THE SPIKE UP (a rewatched or shared moment)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          When the line rises instead of falls, viewers are rewatching a section or sharing a clip that brings new people straight to that timestamp. Spikes are gifts: they mark exactly what your audience found most valuable. Study what you did there and do more of it &mdash; and these rewatched moments feed the repeat-view signal behind <Link href="/blog/youtube-satisfaction-vs-watch-time-2026" style={inlineLink}>the satisfaction-era algorithm</Link>.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#f59e0b' }}>4 — THE SUDDEN DROP (a dead spot)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          A sharp cliff in the middle of the video marks a specific moment people fled: a slow tangent, a long unskippable intro to a section, a payoff that arrived too late, or a mid-roll that landed badly. Unlike the gentle slope, this is fixable and specific &mdash; scrub to that exact timestamp and you will usually see immediately what killed it.
        </p>
      </div>

      <h2 style={h2}>Reading the graph at a glance</h2>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Pattern</th>
            <th style={th}>What it means</th>
            <th style={th}>What to do</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Steep intro cliff</td><td style={td}>Hook not paying off the title fast enough</td><td style={td}>Tighten the first 30 seconds; deliver the promise sooner</td></tr>
          <tr><td style={td}>Gentle steady slope</td><td style={td}>Healthy &mdash; normal viewer fall-off</td><td style={td}>Keep it; aim to flatten further</td></tr>
          <tr><td style={td}>Spike up</td><td style={td}>Rewatched / shared high-value moment</td><td style={td}>Identify what worked; do more of it</td></tr>
          <tr><td style={td}>Sudden mid-video drop</td><td style={td}>A specific dead spot or bad tangent</td><td style={td}>Scrub to the timestamp; cut or fix that beat</td></tr>
          <tr><td style={td}>Late mass exit</td><td style={td}>Value delivered; outro dragging</td><td style={td}>End sooner; tighten the close</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>What good retention actually looks like</h2>

      <p style={p}>
        There is no universal pass mark, because it varies by length and format, but useful orientation: holding above roughly 70% in the first 30 seconds is a healthy intro, and an average view percentage in the 40 to 50%+ range is strong for most long-form. Judge against your own channel and against the relative line, not a number from a blog. And remember the funnel &mdash; retention only matters once your packaging earns the click in the first place, which is the <Link href="/blog/youtube-impressions-ctr-explained-2026" style={inlineLink}>impressions and CTR</Link> side of the equation.
      </p>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISTAKE: READING THE NUMBER, NOT THE CURVE</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Two videos can have the identical average view duration and tell completely opposite stories &mdash; one a smooth gentle slope, the other a brutal intro cliff followed by a flat line of die-hards. The average hides the diagnosis; the shape reveals it. Always read the curve, find the exact moments viewers leave, and fix those &mdash; that is the entire point of the report.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>YOUR RETENTION, READ FOR YOU</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). It reads your retention patterns across videos and tells you where viewers consistently drop and which moments they rewatch &mdash; so instead of scrubbing every graph manually, you get the recurring problem and the recurring win in plain language. Ask &quot;where do my viewers keep leaving&quot; and you get the answer across your whole catalog. Once you know where they leave, the fixes are in <Link href="/blog/how-to-improve-youtube-audience-retention-2026" style={inlineLink}>how to improve audience retention</Link>.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> The retention graph (Studio, video, Engagement tab) is the most honest report on YouTube &mdash; it shows exactly where viewers leave, second by second. The shape matters more than the average.</p>
        <p style={p}><span style={strong}>2.</span> The intro cliff in the first 30 seconds is normal, but its severity is the most important thing on the graph &mdash; a steep one means your hook is not paying off the title fast enough.</p>
        <p style={p}><span style={strong}>3.</span> A gentle steady slope is healthy; the flatter the better. A long video with a gentle slope beats a short one that falls off a cliff.</p>
        <p style={p}><span style={strong}>4.</span> Spikes up mark rewatched or shared moments &mdash; your most valuable content. Study them and do more.</p>
        <p style={p}><span style={strong}>5.</span> A sudden mid-video drop is a specific, fixable dead spot &mdash; scrub to that timestamp and you will usually see what killed it.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> Orientation: ~70%+ retention through the first 30 seconds is healthy, and 40 to 50%+ average is strong for most long-form &mdash; but judge against your own channel and the relative line, never a generic number. Read the curve, not just the number.</p>
      </div>
    </>
  )
}
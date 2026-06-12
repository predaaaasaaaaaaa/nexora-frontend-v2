import Link from 'next/link'

export default function Post61Content() {
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
        YouTube quietly retired one of its oldest metrics. The binary &quot;new vs returning viewers&quot; split is gone, replaced by three segments in the Audience tab: <span style={strong}>new</span>, <span style={strong}>casual</span>, and <span style={strong}>regular</span> viewers. It is one of the most useful analytics changes in years, and most creators either have not noticed or are reading it wrong &mdash; usually by panicking at how small their &quot;regular&quot; number is.
      </p>

      <p style={p}>
        The reason this metric deserves your attention is simple: views are a lagging indicator, but viewer loyalty is a leading one. A channel&apos;s return rate predicts subscriber growth, search rankings, and revenue months before the view counts show it. The three-segment split finally lets you see that loyalty forming &mdash; or not &mdash; instead of lumping a die-hard weekly fan and a once-a-year visitor into one &quot;returning&quot; bucket.
      </p>

      <p style={p}>
        Here is what each segment actually means (including the definitions that trip people up), what healthy numbers look like, and the strategy each segment responds to.
      </p>

      <h2 style={h2}>The three segments, precisely defined</h2>

      <p style={p}>
        Find them in Studio under Analytics, in the Audience tab: your monthly audience &mdash; the unique viewers who watched in the last 28 days &mdash; split by watch behavior.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Segment</th>
            <th style={th}>Definition</th>
            <th style={th}>What it tells you</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>New viewers</td><td style={td}>Watched your content for the first time in the period</td><td style={td}>Your reach engine is working &mdash; discovery is bringing fresh people in</td></tr>
          <tr><td style={td}>Casual viewers</td><td style={td}>Have watched your channel in 1&ndash;5 months of the past year</td><td style={td}>Interested but not habitual &mdash; the conversion opportunity</td></tr>
          <tr><td style={td}>Regular viewers</td><td style={td}>Returned in 6+ months of the past 12</td><td style={td}>Your true loyal base &mdash; the people who compound</td></tr>
        </tbody>
      </table>

      <p style={p}>
        Two definition quirks matter before you judge your numbers. First, viewers in a private browser, viewers who deleted their watch history, and anyone who has not watched you in over a year all count as <span style={strong}>new</span> &mdash; so &quot;new&quot; is slightly inflated for everyone. Second, &quot;regular&quot; is a deliberately high standard: six or more separate months in a year. YouTube itself cautions that most channels see a smaller regular percentage than they expect, especially newer channels, channels with a trending spike, and Shorts-heavy channels.
      </p>

      <h2 style={h2}>What healthy actually looks like</h2>

      <p style={p}>
        There is no single perfect mix &mdash; a healthy channel holds a balance. As orientation: a returning share around 20 to 40 percent of your audience signals real loyalty development, and for a young channel even a return rate above 10 percent is a strong leading signal that the channel is compounding. A channel that is almost all new viewers is renting attention from the algorithm each month; a channel that is almost all regulars has loyalty but has stopped growing. The mix is the diagnosis, the same way it is in <Link href="/blog/youtube-traffic-sources-explained-2026" style={inlineLink}>the traffic-sources breakdown</Link>.
      </p>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISREAD: PANICKING AT A SMALL REGULAR NUMBER</span>
        <p style={{ ...p, marginBottom: 0 }}>
          A single-digit regular percentage does not mean your channel is failing &mdash; the bar is six months of return visits in a year, which almost nobody clears early. Track the TREND, not the absolute: regulars slowly rising while new viewers keep flowing is the healthiest pattern on the platform.
        </p>
      </div>

      <h2 style={h2}>The strategy each segment responds to</h2>

      <div style={stepCard}>
        <span style={stepNumber}>GROW NEW — packaging and discovery</span>
        <p style={{ ...p, marginBottom: 0 }}>
          New viewers come from Browse, Suggested, Search, and Shorts. The levers are the discovery fundamentals: clear packaging, strong early retention, topics with search demand. If new viewers have dried up, you have a reach problem, not a loyalty one.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#f59e0b' }}>CONVERT CASUAL — series and schedule</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Casuals liked something once; they need a reason to form a habit. Series content, a consistent schedule they can predict, and end-screens chaining them to the next video are what turn one-month visitors into six-month regulars. This conversion is the highest-leverage move in the whole report &mdash; far cheaper than winning a brand-new viewer.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>KEEP REGULARS — depth and direct connection</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Regulars want depth, recognition, and continuity: community posts, replying to their comments, live sessions, the occasional deeper video just for them. They are also the people who fund you &mdash; memberships and Super Thanks convert from this segment, which is why loyalty links straight to the <Link href="/blog/youtube-monetization-requirements-2026" style={inlineLink}>fan-funding tiers</Link>.
        </p>
      </div>

      <p style={p}>
        Notice the through-line: regulars exist because your videos consistently satisfy &mdash; repeat viewing is one of the strongest signals in the <Link href="/blog/youtube-satisfaction-vs-watch-time-2026" style={inlineLink}>satisfaction-era algorithm</Link>, and the craft that creates it is plain <Link href="/blog/how-to-improve-youtube-audience-retention-2026" style={inlineLink}>retention discipline</Link> applied video after video.
      </p>

      <div style={tipBox}>
        <span style={tipLabel}>WATCHING LOYALTY FORM AUTOMATICALLY</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). It tracks your new/casual/regular mix over time and connects it to causes &mdash; which videos and series actually convert casuals into regulars, and which uploads only rent new viewers for a day. Ask &quot;which of my videos create returning viewers&quot; and you get the list worth doubling down on, pulled from your own data. Pairs with <Link href="/blog/youtube-ask-studio-ai-analytics-2026" style={inlineLink}>Ask Studio</Link> for quick in-Studio reads.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> YouTube replaced binary new-vs-returning with three segments &mdash; new, casual (1&ndash;5 months of the past year), regular (6+ months) &mdash; in the Audience tab, across all formats.</p>
        <p style={p}><span style={strong}>2.</span> Loyalty is a leading indicator; views are a lagging one. The return rate predicts subscriber growth and revenue months before view counts move.</p>
        <p style={p}><span style={strong}>3.</span> Definitions inflate &quot;new&quot;: private-browser viewers, deleted-history viewers, and anyone away over a year all count as new. And &quot;regular&quot; is a deliberately high bar &mdash; expect a smaller number than you hoped.</p>
        <p style={p}><span style={strong}>4.</span> Orientation numbers: 20&ndash;40% returning signals real loyalty; above 10% is already strong for a young channel. Track the trend, not the absolute.</p>
        <p style={p}><span style={strong}>5.</span> Each segment has its own lever: packaging and discovery grow new; series + consistent schedule convert casuals (the highest-leverage move); depth and direct connection keep regulars &mdash; who are also the segment that funds you.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> The healthiest pattern: regulars slowly rising while new viewers keep flowing. All-new means rented attention; all-regular means stalled growth. The mix is the diagnosis.</p>
      </div>
    </>
  )
}
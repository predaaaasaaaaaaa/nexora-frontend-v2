import Link from 'next/link'

export default function Post68Content() {
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
        The internet&apos;s favorite answer to this question &mdash; &quot;about $3 to $5 per 1,000 views&quot; &mdash; is technically a global average and practically useless. It blends a finance channel earning $18 per thousand with a prank channel earning $1.20 into a single number that describes neither. Ask how much YouTube pays per 1,000 views and the honest reply is: it depends on three things you can actually identify, and once you know them you can forecast your income instead of guessing.
      </p>

      <p style={p}>
        YouTube does not pay a fixed rate per view. It pays a share of what advertisers spend against your videos, and that share swings wildly with your niche, your audience&apos;s location, and your format. Here are the real 2026 numbers and the framework to turn them into a revenue target for your specific channel.
      </p>

      <h2 style={h2}>First: RPM is the number that matters, not CPM</h2>

      <p style={p}>
        Two metrics get confused constantly. CPM is what advertisers pay per 1,000 ad impressions &mdash; advertiser spend, not your income. RPM is what you actually receive per 1,000 video views after YouTube takes its 45% cut and after accounting for the many views where no ad ran. RPM is always lower than CPM, typically landing around 25 to 50% of it. A $20 CPM can mean a $5 RPM, and that is completely normal. Track RPM &mdash; it is the only one that reaches your bank account, and the reason it lands lower than you expect is covered in <Link href="/blog/why-is-my-youtube-rpm-low-2026" style={inlineLink}>why your RPM is so low</Link>.
      </p>

      <h2 style={h2}>How much YouTube pays by niche (2026 RPM)</h2>

      <p style={p}>
        Your niche is the single biggest lever, because advertisers pay for buying intent. A finance viewer might open a brokerage account; a comedy viewer is just entertained. That gap is enormous: a finance channel can earn the same from 100,000 views that a gaming channel earns from a million.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Niche</th>
            <th style={th}>Typical long-form RPM (2026)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Finance, insurance, investing</td><td style={td}>$9&ndash;$20</td></tr>
          <tr><td style={td}>Tech, software, business</td><td style={td}>$5&ndash;$12</td></tr>
          <tr><td style={td}>Education, how-to</td><td style={td}>$4&ndash;$10</td></tr>
          <tr><td style={td}>Gaming</td><td style={td}>$2&ndash;$4</td></tr>
          <tr><td style={td}>Comedy, skits, entertainment</td><td style={td}>$1.5&ndash;$3.5</td></tr>
          <tr><td style={td}>Music, vlogs, lifestyle</td><td style={td}>$1.5&ndash;$3</td></tr>
        </tbody>
      </table>

      <h2 style={h2}>Geography often beats niche</h2>

      <p style={p}>
        Where your viewers live can matter more than what you make. The same finance video earns roughly $0.50 to $1.50 RPM with a mostly-Indian audience and $8 to $20 with a mostly-US audience. US, UK, Canada, and Western European views command premium rates &mdash; and Australia&apos;s CPM (around $36 to $40) actually tops the US, so even modest Australian traffic lifts an English-language channel&apos;s RPM. A view is not a view; a US view can be worth five to ten times a view from a low-CPM region.
      </p>

      <h2 style={h2}>Shorts pay a fraction of long-form</h2>

      <p style={p}>
        This is the gap that surprises new creators most. Shorts RPM runs roughly $0.03 to $0.08 per 1,000 views &mdash; because Shorts ad revenue is pooled and creators take a smaller share &mdash; compared to $1.50 to $20 for long-form. A Short with a million views might earn what a long-form video earns from twenty thousand. Use Shorts to grow an audience, then convert that attention to long-form where the money is, exactly as laid out in <Link href="/blog/youtube-shorts-monetization-2026" style={inlineLink}>how Shorts monetization works</Link>.
      </p>

      <h2 style={h2}>Per million views, per subscriber level, per season</h2>

      <p style={p}>
        A million long-form views averages roughly $3,000 to $5,000, but the real range runs from about $1,000 for music and entertainment to $12,000+ for finance and business. By channel size, rough monthly ad income lands near $10 to $100 at 1,000 subscribers, $100 to $1,000 at 10,000, $1,000 to $10,000 at 100,000, and $10,000 to $100,000+ past a million &mdash; always gated by niche and geography. And timing matters: RPM peaks in Q4 as holiday ad budgets surge, then drops 30 to 50% in January when budgets reset. Remember too that videos over 8 minutes unlock mid-roll ads, materially raising earnings per view. These ad numbers are only one stream &mdash; the full picture is in <Link href="/blog/youtube-revenue-streams-ranked-2026" style={inlineLink}>the revenue streams ranked</Link> and <Link href="/blog/how-to-make-money-on-youtube-2026" style={inlineLink}>the complete monetization guide</Link>.
      </p>

      <h2 style={h2}>The formula (and how to run it backwards)</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>Forecast income:</span> RPM &times; views &divide; 1,000. At a $5 RPM, 100,000 views earns about $500.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>Run it backwards:</span> decide the income you want, then solve for the views you need. To earn $1,500 a month, a finance channel at $9 RPM needs ~167,000 monthly views; a gaming channel at $3 RPM needs ~500,000. That gap should shape your entire niche and content strategy before you film anything.</p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISTAKE: CHASING VIEWS INSTEAD OF VALUE-PER-VIEW</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Two channels with identical view counts can earn five to ten times differently. Pouring effort into raw views while ignoring niche, audience geography, and format is how creators rack up millions of views and tiny payouts. The lever is not always more views &mdash; it is more valuable views: a commercially attractive topic, a higher-CPM audience, and long-form that carries mid-roll ads.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>SEE WHAT YOUR VIEWS ARE ACTUALLY WORTH</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). It reads your real RPM and what drives it &mdash; which videos, audiences, and formats earn the most per view &mdash; so you can lean into the content that actually pays instead of the content that merely gets watched. Ask &quot;which of my videos earn the most per view and why&quot; and you get the answer from your own numbers, not a generic chart.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> There is no fixed rate. The &quot;$3 to $5 per 1,000 views&quot; average is practically useless because it blends finance creators at ~$18 RPM with prank channels at ~$1.20.</p>
        <p style={p}><span style={strong}>2.</span> Track RPM, not CPM. RPM is your take per 1,000 views after YouTube&apos;s 45% cut and non-monetized views &mdash; typically 25 to 50% of CPM.</p>
        <p style={p}><span style={strong}>3.</span> Niche is the biggest lever: finance/insurance $9&ndash;$20 RPM, tech $5&ndash;$12, gaming $2&ndash;$4, music/vlogs $1.5&ndash;$3. Advertisers pay for buying intent.</p>
        <p style={p}><span style={strong}>4.</span> Geography often beats niche: the same video earns ~$0.50&ndash;$1.50 with an Indian audience vs $8&ndash;$20 with a US one. Australia tops the US on CPM.</p>
        <p style={p}><span style={strong}>5.</span> Shorts pay a fraction ($0.03&ndash;$0.08 per 1,000) of long-form &mdash; use them for growth, not direct income. A million long-form views averages ~$3,000&ndash;$5,000.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> Use the formula RPM &times; views &divide; 1,000, and run it backwards from your income goal. Chase valuable views &mdash; niche, geography, 8+ minute mid-roll videos &mdash; not raw views.</p>
      </div>
    </>
  )
}
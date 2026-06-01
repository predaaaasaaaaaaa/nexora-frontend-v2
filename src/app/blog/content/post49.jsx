import Link from 'next/link'

export default function Post49Content() {
  const h2 = {
    fontSize: 26,
    fontWeight: 700,
    color: '#fff',
    marginTop: 48,
    marginBottom: 16,
    lineHeight: 1.2,
  }

  const h3 = {
    fontSize: 20,
    fontWeight: 700,
    color: '#fff',
    marginTop: 36,
    marginBottom: 12,
    lineHeight: 1.3,
  }

  const p = {
    fontSize: 16,
    lineHeight: 1.8,
    color: '#ccc',
    marginBottom: 16,
  }

  const strong = {
    color: '#fff',
    fontWeight: 600,
  }

  const inlineLink = {
    color: '#FF4444',
    textDecoration: 'none',
    fontWeight: 500,
    borderBottom: '1px solid rgba(255,68,68,0.3)',
  }

  const sectionCard = {
    background: '#161616',
    border: '1px solid #222',
    borderRadius: 10,
    padding: '24px 28px',
    marginBottom: 24,
  }

  const stepCard = {
    background: '#161616',
    border: '1px solid #222',
    borderRadius: 10,
    padding: '20px 24px',
    marginBottom: 16,
  }

  const stepNumber = {
    fontSize: 12,
    fontWeight: 800,
    color: '#FF0000',
    letterSpacing: 1.5,
    marginBottom: 8,
    display: 'block',
  }

  const dataTable = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 16,
    marginBottom: 24,
    fontSize: 14,
  }

  const th = {
    textAlign: 'left',
    padding: '12px 16px',
    background: '#1a1a1a',
    color: '#fff',
    fontWeight: 700,
    fontSize: 13,
    borderBottom: '1px solid #333',
  }

  const td = {
    padding: '10px 16px',
    borderBottom: '1px solid #1a1a1a',
    color: '#aaa',
    fontSize: 13,
  }

  const tipBox = {
    background: 'rgba(255,0,0,0.03)',
    border: '1px solid rgba(255,0,0,0.15)',
    borderRadius: 10,
    padding: '20px 24px',
    marginTop: 24,
    marginBottom: 24,
  }

  const tipLabel = {
    fontSize: 12,
    fontWeight: 700,
    color: '#FF0000',
    letterSpacing: 1,
    marginBottom: 8,
    display: 'block',
  }

  const mistakeCard = {
    background: 'rgba(248,113,113,0.04)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 10,
    padding: '18px 22px',
    marginBottom: 12,
  }

  const mistakeLabel = {
    fontSize: 11,
    fontWeight: 800,
    color: '#f87171',
    letterSpacing: 1.5,
    marginBottom: 6,
    display: 'block',
  }

  return (
    <>
      <p style={p}>
        Impressions and click-through rate are the two most misread numbers in YouTube Studio. Creators stare at them daily, draw the wrong conclusion, and then change the wrong thing. The confusion comes from not understanding that these two metrics sit at the very front of a funnel: impression, then click, then view, then watch time. Everything downstream depends on the first two steps &mdash; but neither one works the way most people assume.
      </p>

      <p style={p}>
        The biggest misconception is that impressions are something you grow directly. They are not. Impressions are granted to you by the system based on how earlier viewers behaved. CTR is the lever; impressions are largely the reward. Get that relationship backward and you spend weeks chasing a number you cannot touch.
      </p>

      <p style={p}>
        This guide defines exactly what counts as an impression, how CTR is calculated, what a &quot;good&quot; CTR actually means in 2026 (the honest answer is not a single number), and how to read CTR and average view duration together so you fix the real problem instead of the obvious one.
      </p>

      <h2 style={h2}>What actually counts as an impression</h2>

      <p style={p}>
        An impression is counted when your thumbnail is shown to a real viewer on a YouTube surface &mdash; home, Suggested, Search, the subscriptions feed &mdash; and is on screen long enough to be a genuine chance to click (roughly half the thumbnail visible for at least a second). It is a measured opportunity to earn a click, not a raw view of your video page.
      </p>

      <p style={p}>
        Several things deliberately do <span style={strong}>not</span> count as YouTube impressions: thumbnails shown on external sites or embeds, views that arrive without a thumbnail choice (a direct link, an autoplay the viewer did not pick), and impressions on most external surfaces. This is why the report is named &quot;Impressions and how they led to watch time&quot; &mdash; it only measures the thumbnails YouTube itself served, because those are the only ones the click-through rate can fairly be measured against.
      </p>

      <h2 style={h2}>What CTR is, exactly</h2>

      <p style={p}>
        Click-through rate is simple arithmetic: clicks divided by impressions, times 100. If your thumbnail was served 10,000 times and earned 600 clicks, your CTR is 6 percent. Because the denominator is only YouTube-served impressions, CTR measures one specific thing: of the people YouTube gave a chance to click, how many did. It says nothing about whether they stayed. That is the trap.
      </p>

      <div style={sectionCard}>
        <p style={{ ...p, marginBottom: 0 }}>
          The full funnel reads: <span style={strong}>impressions</span> (YouTube offered your thumbnail) &rarr; <span style={strong}>CTR</span> (the click) &rarr; <span style={strong}>views</span> &rarr; <span style={strong}>watch time</span> (the payoff). A weak link anywhere caps everything after it. The mistake is optimizing one stage without checking the next &mdash; which is exactly what the 2026 Quality CTR change punishes, covered in <Link href="/blog/youtube-traffic-sources-explained-2026" style={inlineLink}>the traffic sources guide</Link>.
        </p>
      </div>

      <h2 style={h2}>What is a &quot;good&quot; CTR?</h2>

      <p style={p}>
        Here is the honest answer most guides dodge: there is no universal good CTR. The number that matters is your own historical baseline for similar content. A 4 percent CTR can be excellent on a high-volume Browse-driven video and mediocre on a tightly targeted Search video. Niche, audience, and traffic source all move the goalposts, so absolute benchmarks are a starting reference at best.
      </p>

      <p style={p}>
        With that caveat stated plainly, the rough ranges below are useful for orientation, not as targets to obsess over:
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>CTR band</th>
            <th style={th}>Rough read (relative to your own baseline)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Under 2%</td>
            <td style={td}>Packaging is likely the bottleneck; thumbnail and title need work</td>
          </tr>
          <tr>
            <td style={td}>2&ndash;4%</td>
            <td style={td}>Common middle band; fine for broad Browse traffic, weak for targeted Search</td>
          </tr>
          <tr>
            <td style={td}>4&ndash;10%</td>
            <td style={td}>Healthy for most channels; packaging is doing its job</td>
          </tr>
          <tr>
            <td style={td}>Over 10%</td>
            <td style={td}>Strong &mdash; but only meaningful if retention holds; otherwise it is clickbait risk</td>
          </tr>
        </tbody>
      </table>

      <p style={p}>
        The B2B Browse baseline specifically tends to land around 3.5 to 4.5 percent, with 7 percent or higher as a real performance goal. But notice the recurring condition on every band: the number only counts if viewers stay. In 2026, a high CTR with low early retention is treated as a failure signal, not a win.
      </p>

      <h2 style={h2}>CTR and AVD: the paired signal that tells the truth</h2>

      <p style={p}>
        CTR alone is half a sentence. Read it next to average view duration (AVD) &mdash; how long people actually watched &mdash; and the real diagnosis appears. This single pairing resolves most &quot;why is this video underperforming&quot; questions.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>CTR</th>
            <th style={th}>AVD</th>
            <th style={th}>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>High</td>
            <td style={td}>High</td>
            <td style={td}>The video delivers on its promise. Make more like this.</td>
          </tr>
          <tr>
            <td style={td}>High</td>
            <td style={td}>Low</td>
            <td style={td}>Packaging overpromised. The thumbnail/title wrote a check the content did not cash &mdash; throttled under Quality CTR.</td>
          </tr>
          <tr>
            <td style={td}>Low</td>
            <td style={td}>High</td>
            <td style={td}>The content is strong but the packaging is invisible. A pure thumbnail/title problem.</td>
          </tr>
          <tr>
            <td style={td}>Low</td>
            <td style={td}>Low</td>
            <td style={td}>Both the promise and the payoff are weak. Rework the topic, not just the cover.</td>
          </tr>
        </tbody>
      </table>

      <p style={p}>
        The high-CTR-low-AVD square is where most clickbait dies in 2026, and the low-CTR-high-AVD square is the most fixable problem on the platform &mdash; you already made a good video, you just hid it behind weak packaging. Diagnosing which square you are in is the whole job, and <Link href="/guides/thumbnail-or-video-ctr-vs-retention" style={inlineLink}>this CTR-versus-retention diagnostic</Link> walks the exact decision.
      </p>

      <h2 style={h2}>How to improve CTR (the only stage you control)</h2>

      <div style={stepCard}>
        <span style={stepNumber}>THE THUMBNAIL</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The thumbnail carries most of the click. Clear focal point, readable at the size of a phone thumbnail and a 55-inch TV, one idea not five. The full system is in <Link href="/blog/youtube-thumbnail-guide-ctr-2026" style={inlineLink}>the thumbnail CTR guide</Link>.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>THE TITLE</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The title and thumbnail should not repeat each other &mdash; they should combine into one promise. For Search, the title states the answer; for Browse, it states the payoff. Patterns that work are in <Link href="/blog/youtube-title-formulas-that-get-clicks-2026" style={inlineLink}>the title formulas guide</Link>.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>TEST, DO NOT GUESS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Native Test &amp; Compare lets you run up to three thumbnails against your real audience and keep the winner by measured watch time, not opinion. Use it on every upload that matters. It beats any predictive guess because it runs against the people actually being served your video.
        </p>
      </div>

      <h2 style={h2}>The impressions trap</h2>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISREAD</span>
        <p style={{ ...p, marginBottom: 0 }}>
          &quot;My impressions dropped, how do I get more impressions?&quot; You mostly cannot, directly. Impressions are how widely the system chose to test your thumbnail, and that choice is downstream of CTR and early retention on your recent uploads. Falling impressions are usually a symptom: the system tested you, the clicks or the watch time did not justify wider distribution, so it pulled back.
        </p>
      </div>

      <p style={p}>
        The fix is never &quot;chase impressions.&quot; It is to raise the quality of the click-to-watch handoff so the system has a reason to serve you more. Impressions follow proof. Spend your energy on the thumbnail-title-first-30-seconds promise, and impressions expand on their own. This is the same engagement-over-reach principle that runs through <Link href="/blog/how-to-analyze-youtube-channel-performance" style={inlineLink}>channel-performance analysis</Link>: the metrics you can move are the early-quality signals, not the distribution numbers they unlock.
      </p>

      <div style={tipBox}>
        <span style={tipLabel}>FINDING THE HIDDEN WINNERS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only access). It reads impressions, CTR, and AVD together across your catalog and surfaces the videos stuck in the low-CTR-high-AVD square &mdash; strong videos with weak packaging that are one thumbnail away from a second life. Ask &quot;which of my videos had good retention but a CTR below my average&quot; and it hands you a fix-it list instead of a wall of numbers.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1.</span> Impressions, CTR, views, and watch time are a funnel. An impression is a YouTube-served thumbnail shown long enough to be a real chance to click &mdash; external embeds and choice-less views do not count.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> CTR is clicks divided by impressions. It measures only whether served viewers clicked &mdash; it says nothing about whether they stayed, which is the most common misread.
        </p>
        <p style={p}>
          <span style={strong}>3.</span> There is no universal &quot;good&quot; CTR. Judge against your own baseline for similar content. 4&ndash;10% is healthy for most channels; B2B Browse sits around 3.5&ndash;4.5% with 7%+ as a goal.
        </p>
        <p style={p}>
          <span style={strong}>4.</span> Always read CTR next to AVD. High CTR plus low AVD means packaging overpromised (throttled in 2026). Low CTR plus high AVD is a strong video hidden behind weak packaging &mdash; the most fixable problem there is.
        </p>
        <p style={p}>
          <span style={strong}>5.</span> You control CTR, not impressions. Improve the thumbnail, the title, and the first 30 seconds, and test thumbnails with native Test &amp; Compare against your real audience.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>6.</span> Stop chasing impressions. They are the reward for clicks that turn into watch time. Raise the quality of the click-to-watch handoff and impressions expand on their own.
        </p>
      </div>
    </>
  )
}
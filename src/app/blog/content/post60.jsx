import Link from 'next/link'

export default function Post60Content() {
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
        YouTube put an AI analyst inside Studio, and most creators still have not opened it. Ask Studio is a conversational assistant &mdash; the sparkle icon in the top corner of YouTube Studio &mdash; that answers plain-English questions about your own channel data. Instead of digging through dashboards, you type &quot;why did my last video underperform?&quot; and it answers from your actual analytics. It is free, powered by Gemini, and YouTube has been expanding access to more creators through 2026.
      </p>

      <p style={p}>
        That makes it worth understanding precisely &mdash; both what it genuinely does well and where it stops. Because the honest version is this: Ask Studio is a real time-saver for reading your data, it is not a strategist, and the difference decides whether it helps you or just gives you faster access to numbers you still misread.
      </p>

      <p style={p}>
        Here is exactly what Ask Studio is, the three kinds of data it reads, the questions actually worth asking it, and its current limits.
      </p>

      <h2 style={h2}>What Ask Studio actually is</h2>

      <p style={p}>
        Ask Studio is a chat interface built into YouTube Studio, accessed through the sparkle icon. It analyzes three pillars of your channel data: <span style={strong}>analytics</span> (the same performance metrics already in Studio), <span style={strong}>comments</span> (it can summarize hundreds of viewer messages into themes), and <span style={strong}>past content performance</span> (patterns across what you have published). You can type free-form questions or use the suggested prompts, and you can point it at a specific upload &mdash; &quot;analyze the performance of&quot; plus a video from the picker.
      </p>

      <p style={p}>
        YouTube is careful to distinguish it from the Insights tab: both are grounded in your channel data, but Ask Studio responds in real time, conversationally, to whatever you ask &mdash; a chat with your data rather than a fixed report. It is the same direction the whole platform is moving, from dashboards toward conversation, the consumer side of which is covered in <Link href="/blog/youtube-ai-search-optimization-2026" style={inlineLink}>how YouTube AI search now works</Link>.
      </p>

      <h2 style={h2}>The questions actually worth asking it</h2>

      <div style={stepCard}>
        <span style={stepNumber}>DIAGNOSIS — &quot;WHY DID THIS VIDEO UNDERPERFORM?&quot;</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Its strongest use. It reads the video&apos;s metrics against your channel norms and points at the weak stage &mdash; click-through, early retention, or distribution. You still need to understand what those stages mean, which is exactly the funnel in <Link href="/blog/youtube-impressions-ctr-explained-2026" style={inlineLink}>the impressions and CTR breakdown</Link>, but it gets you to the right report in seconds instead of twenty minutes of tab-hopping.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>COMMENT SUMMARIES — &quot;WHAT ARE VIEWERS SAYING?&quot;</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Ask it to summarize the comments on a video or across recent uploads. It surfaces recurring requests, complaints, and questions you would never find scrolling manually &mdash; which is raw material for your next topics and a direct read on satisfaction.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>PATTERN FINDING — &quot;WHAT DO MY TOP VIDEOS HAVE IN COMMON?&quot;</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Cross-video questions are where a chat interface beats a dashboard: top performers by retention, which topics bring subscribers, when your audience is most active. It also generates content ideas grounded in what has already worked on your channel rather than generic trends.
        </p>
      </div>

      <h2 style={h2}>Where it stops (the honest limits)</h2>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Limit</th>
            <th style={th}>What it means in practice</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Availability</td><td style={td}>US and English only for now, desktop Studio, rolling out gradually &mdash; not every channel has it yet</td></tr>
          <tr><td style={td}>Data scope</td><td style={td}>Your channel only &mdash; it cannot analyze competitors or the wider niche</td></tr>
          <tr><td style={td}>Judgment</td><td style={td}>Accurate on data questions; creative and strategic calls are still yours</td></tr>
          <tr><td style={td}>Reactive by design</td><td style={td}>It answers when asked &mdash; it does not watch your channel and flag what changed</td></tr>
        </tbody>
      </table>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISTAKE: TREATING ITS ANSWERS AS STRATEGY</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Ask Studio tells you what the data says; it does not know your goals, your niche economics, or what you should sacrifice to grow. &quot;Your CTR dropped on the last three uploads&quot; is a fact. What to do about it &mdash; new packaging, new topic lane, or hold course &mdash; is still a judgment call, and outsourcing that judgment to any AI produces generic channels. Use it to read faster, not to think less.
        </p>
      </div>

      <h2 style={h2}>How to fold it into your workflow</h2>

      <p style={p}>
        The efficient pattern: after each upload settles (remember the data delay), ask for a performance analysis of that video; weekly, ask for comment themes and what your audience is requesting; monthly, ask the cross-video pattern questions. Then verify anything surprising against the real reports &mdash; the <Link href="/blog/how-to-analyze-youtube-channel-performance" style={inlineLink}>channel-performance fundamentals</Link> still apply, and the loyalty picture lives in <Link href="/blog/youtube-new-casual-regular-viewers-2026" style={inlineLink}>the new viewer-segments metric</Link>.
      </p>

      <div style={tipBox}>
        <span style={tipLabel}>WHEN YOU WANT AN AGENT, NOT A CHATBOT</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). The honest difference: Ask Studio is a chat inside Studio that answers when you ask; NEXORA is an agent layer on top of your channel &mdash; it reads your analytics and competitors, feeds a coach, a scheduler, and an ideas engine, and works from anywhere, not just US-English desktop Studio. If Ask Studio is a calculator for your data, NEXORA is the co-pilot that uses it. Many creators run both: Ask Studio for quick in-Studio reads, NEXORA for the ongoing strategy loop.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> Ask Studio is YouTube&apos;s free, Gemini-powered AI assistant inside Studio (the sparkle icon). It answers plain-English questions from your own channel data, in real time.</p>
        <p style={p}><span style={strong}>2.</span> It reads three pillars: analytics, comments, and past content performance &mdash; and can analyze a specific video on request.</p>
        <p style={p}><span style={strong}>3.</span> Best uses: diagnosing why a video underperformed, summarizing hundreds of comments into themes, and cross-video pattern questions a dashboard makes painful.</p>
        <p style={p}><span style={strong}>4.</span> Current limits: US and English only, desktop, gradual rollout, your channel&apos;s data only, and it answers only when asked &mdash; it does not monitor.</p>
        <p style={p}><span style={strong}>5.</span> It is accurate on data questions but it is not a strategist &mdash; goals, trade-offs, and creative calls remain yours. Use it to read faster, not to think less.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> Workflow: per-upload performance ask, weekly comment themes, monthly pattern questions &mdash; then verify surprises against the real reports.</p>
      </div>
    </>
  )
}
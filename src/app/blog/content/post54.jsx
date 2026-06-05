import Link from 'next/link'

export default function Post54Content() {
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
        YouTube search just changed shape. At Google I/O in May 2026, the platform rolled out conversational AI search &mdash; often called Ask YouTube &mdash; and the move is exactly what it sounds like: from keywords to conversations. Instead of typing &quot;best budget camera,&quot; viewers now ask &quot;what camera should I buy if I shoot mostly indoors and have 600 dollars?&quot; and get a synthesized answer that pulls from specific videos. The search box became a chat box, and the videos that get surfaced are the ones an AI can actually understand and quote.
      </p>

      <p style={p}>
        This is not a minor feature. YouTube is now the single most-cited domain in Google&apos;s AI Overviews, and a 2026 Ahrefs analysis of 75,000 brands found that YouTube mentions are the strongest predictor of AI-engine visibility in their entire dataset &mdash; correlating at r = 0.737, ahead of backlinks and domain authority. Meanwhile searches for &quot;answer engine optimization&quot; grew roughly 20x in 18 months. The discovery game is moving from ranking blue links to being the source an AI chooses to quote.
      </p>

      <p style={p}>
        The good news: optimizing for AI search is not a new dark art. It is a discipline called Answer Engine Optimization (AEO), and once you understand what the AI is doing, the moves are concrete. Here is how it works and exactly what to change.
      </p>

      <h2 style={h2}>What AI search actually does differently</h2>

      <p style={p}>
        Traditional search matched the words in a query to the words in your metadata. AI search does not match strings &mdash; it understands meaning. When someone asks a question, the engine does not want to return ten links; it wants to synthesize one direct answer and cite the sources behind it. So the entire question changes from &quot;does my title contain the keyword&quot; to &quot;can the AI understand my video well enough to quote it as the answer.&quot;
      </p>

      <p style={p}>
        Two consequences follow immediately. First, queries got longer and more conversational &mdash; full &quot;how do I&quot; and &quot;what is the best&quot; questions instead of two-word fragments. Second, substance and structure now beat keyword density. Titles and thumbnails still matter for the human click, as covered in <Link href="/blog/youtube-title-formulas-that-get-clicks-2026" style={inlineLink}>the title formulas guide</Link>, but whether the AI can extract a clean answer from your video is what decides if you are in the conversation at all.
      </p>

      <h2 style={h2}>The 5 moves that get you cited</h2>

      <div style={stepCard}>
        <span style={stepNumber}>1 — ANSWER THE QUESTION IN THE FIRST LINES (BLUF)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Use the Bottom Line Up Front method: open your description and your video with a crisp, direct answer to the exact question the video targets. AI engines actively seek content already structured as a summary, because a clean abstract is easy to lift and cite. Burying the answer under a 30-second intro or three lines of channel boilerplate makes your content invisible to extraction.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>2 — WRITE IN ENTITIES, NOT KEYWORDS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Modern AI understands semantic relationships. It does not just look for the word &quot;camera&quot; &mdash; it understands the entities around it: lens, aperture, sensor, low-light. If your description and script name the real related concepts, the AI reads expertise; if you repeat one exact phrase ten times, it reads thin content. Cover the topic the way an expert actually talks about it.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>3 — MATCH CONVERSATIONAL, LONG-TAIL QUERIES</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Phrase titles, descriptions, and spoken lines the way people actually ask: &quot;how do I fix low retention on my Shorts&quot; rather than &quot;Shorts retention tips.&quot; Long-tail, specific, question-shaped phrasing matches real intent and faces less competition, and it is exactly what conversational search is parsing.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#f59e0b' }}>4 — GIVE THE AI A CLEAN TRANSCRIPT AND CHAPTERS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          AI systems read and summarize your transcript &mdash; it is the richest signal you control. Speak clearly, say the key terms out loud, and upload accurate captions rather than relying on rough auto-generated ones. Add chapters: they map to specific moments, and chapter-level structure makes individual segments citable for individual questions.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#8b5cf6' }}>5 — STRUCTURE THE DESCRIPTION AS AN ABSTRACT</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Aim for 200 to 300 words that genuinely summarize what the video covers: the direct answer up top, the key points in a scannable structure, related entities woven in naturally, and timestamps. A description that reads like a clear abstract of the video is far more citable than a wall of hashtags and links.
        </p>
      </div>

      <h2 style={h2}>Old SEO vs AI-search AEO</h2>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Old keyword SEO</th>
            <th style={th}>2026 AI-search AEO</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={td}>Exact-match keywords repeated</td><td style={td}>Entities and semantic relationships</td></tr>
          <tr><td style={td}>Short fragment queries</td><td style={td}>Long, conversational questions</td></tr>
          <tr><td style={td}>Metadata stuffing</td><td style={td}>Clean transcript + structured abstract</td></tr>
          <tr><td style={td}>Rank in a list of links</td><td style={td}>Get quoted as the single answer</td></tr>
          <tr><td style={td}>Keyword in title only</td><td style={td}>Answer-first (BLUF) across title, intro, description</td></tr>
        </tbody>
      </table>

      <p style={p}>
        None of this replaces the fundamentals. The click still runs through your packaging and the watch still runs through quality, the same funnel as in <Link href="/blog/youtube-impressions-ctr-explained-2026" style={inlineLink}>the impressions and CTR breakdown</Link>. AEO is a layer on top: it decides whether the AI puts you in front of the human in the first place.
      </p>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE MISTAKE: STUFFING FOR A MACHINE THAT READS MEANING</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Keyword stuffing now actively signals low quality. The AI understands context, so repeating &quot;best camera 2026&quot; eight times reads as thin and manipulative, not relevant. Write for a smart reader who already knows your topic, and the machine that is modeling that reader will follow.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>THE OTHER MISTAKE: NO EXTRACTABLE ANSWER</span>
        <p style={{ ...p, marginBottom: 0 }}>
          If a viewer cannot get the answer from your first lines and your description has no clear summary, there is nothing for the AI to lift. Great content with no extractable structure loses to mediocre content that is cleanly structured. Make the answer easy to quote.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>SEEING WHAT AI SEARCH REWARDS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only). Because it is itself an AI reading your content, it shows you how your titles, descriptions, and topics read to a machine &mdash; which videos answer a clear question and which bury it &mdash; so you can structure for extraction instead of guessing. Ask &quot;which of my videos clearly answer a specific question and which ramble&quot; and you get an AEO to-do list from your own catalog. It also pairs with <Link href="/blog/does-ai-content-hurt-youtube-channel-2026" style={inlineLink}>the honest take on AI-generated content</Link>.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}><span style={strong}>1.</span> YouTube search shifted from keywords to conversations in 2026 (Ask YouTube). The engine now synthesizes one answer and cites sources, instead of returning ten links.</p>
        <p style={p}><span style={strong}>2.</span> This is high-stakes: YouTube is the most-cited domain in Google&apos;s AI Overviews, and YouTube mentions are the strongest single predictor of AI-engine visibility (r = 0.737), ahead of backlinks.</p>
        <p style={p}><span style={strong}>3.</span> Lead with the answer (BLUF). Put a crisp, direct answer in your first lines and description so the AI can lift and cite it.</p>
        <p style={p}><span style={strong}>4.</span> Write in entities, not repeated keywords. Name the real related concepts an expert would; keyword stuffing now signals thin content.</p>
        <p style={p}><span style={strong}>5.</span> Match conversational, long-tail questions, and feed the AI a clean transcript plus chapters &mdash; the transcript is the richest signal you control, and chapters make segments individually citable.</p>
        <p style={{ ...p, marginBottom: 0 }}><span style={strong}>6.</span> AEO is a layer on top of the fundamentals, not a replacement. The click still runs through packaging and the watch through quality &mdash; AEO decides whether the AI surfaces you at all.</p>
      </div>
    </>
  )
}
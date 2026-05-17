import Link from 'next/link'

export default function Post35Content() {
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

  const templateCard = {
    background: '#161616',
    border: '1px solid #222',
    borderRadius: 10,
    padding: '24px 28px',
    marginBottom: 16,
  }

  const templateLabel = {
    fontSize: 11,
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

  return (
    <>
      <p style={p}>
        End screens and cards are the single most under-utilized retention feature in YouTube Studio. Configured properly, they generate <span style={strong}>15-30% more session watch time per video</span> — which, in the 2026 algorithm, is one of the strongest distribution signals available. Most creators leave them empty, or fill them with whatever video comes to mind 30 seconds before publishing.
      </p>

      <p style={p}>
        That gap is one of the highest-leverage fixes available in a 2026 channel optimization audit. End screens are completely free, take 90 seconds per video to set up properly, and compound across your entire back catalog. Once dialed in, they convert exiting viewers into your-next-video viewers — and the algorithm reads that retention signal across the entire session, not just the originating video.
      </p>

      <p style={p}>
        This guide breaks down exactly how end screens and cards work in 2026, the 4 templates that consistently outperform, the placement framework that maximizes session watch time, the mistakes that cost you retention, and the data that should drive your end screen choices on every upload.
      </p>

      <h2 style={h2}>End Screens vs Cards: The Difference That Matters</h2>

      <p style={p}>
        Both features promote additional viewing, but they operate in different windows of the video and serve different strategic purposes:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>End Screens</h3>
        <p style={p}>
          Appear in the final 5-20 seconds of any video over 25 seconds long. Up to 4 elements can be placed: videos/playlists, subscribe button, channel promotion, external links (for eligible channels). End screens are the dedicated retention surface — their entire purpose is to hold viewers in your channel after the current video ends.
        </p>

        <h3 style={{ ...h3, marginBottom: 0 }}>Cards</h3>
        <p style={{ ...p, marginBottom: 0 }}>
          Appear anywhere during the video as small interactive teasers in the top-right corner. Up to 5 cards per video. Cards interrupt active watching, so they have different strategic uses — primarily for cross-referencing specific moments rather than driving session continuation.
        </p>
      </div>

      <h2 style={h2}>Why Session Watch Time Matters More in 2026</h2>

      <p style={p}>
        The 2026 algorithm clusters videos by viewer intent and rewards content that keeps viewers on YouTube longer (the full mechanics are decoded in <Link href="/blog/how-youtube-algorithm-works-2026" style={inlineLink}>how the YouTube algorithm works in 2026</Link>). This means individual video retention is necessary but no longer sufficient — the algorithm is increasingly evaluating <span style={strong}>session retention</span>.
      </p>

      <p style={p}>
        Session watch time is the total time a viewer spends on YouTube after watching your video. If a viewer finishes your video and watches another one of yours (or stays on YouTube via your end screen recommendation), that signals to the algorithm that your video is a strong starting point for keeping viewers on the platform. Strong session contribution = more distribution.
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>The session math</h3>
        <p style={p}>
          A 10-minute video with strong individual retention but no end screen conversion contributes ~8 minutes of session watch time on average. The same video with a well-optimized end screen that converts 20% of viewers to a second video adds another 1.5-2 minutes of session watch time on average — a 20-25% increase in your video's session contribution.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          Across a channel making 4 uploads per month, that delta compounds. Over 12 months, channels with optimized end screens reliably outperform comparable channels with empty end screens on overall distribution by meaningful margins — the algorithm distinctly rewards session-strong videos.
        </p>
      </div>

      <h2 style={h2}>The 4 End Screen Templates That Work</h2>

      <p style={p}>
        Not all end screen configurations are equal. After analyzing what consistently outperforms across categories, four templates emerge as the high-performers. Each is a deliberate combination of the 4 slot types.
      </p>

      <div style={templateCard}>
        <span style={templateLabel}>TEMPLATE 1 — THE BINGE</span>
        <p style={p}>
          <span style={strong}>Configuration:</span> Two video slots, one playlist, one subscribe button.
        </p>
        <p style={p}>
          <span style={strong}>The two video slots are:</span> (a) "Best for Viewer" — YouTube auto-selects your strongest performer for that viewer, and (b) a manually selected specific next video, ideally one that continues the topic of the current video.
        </p>
        <p style={p}>
          <span style={strong}>The playlist slot:</span> Your topical series or "watch next" playlist relevant to the current video's category.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why it works:</span> Maximum surface area for session continuation. The algorithmic recommendation plus the manual pick gives viewers two clear next options, and the playlist offers a longer commitment for the most engaged viewers. The strongest configuration for most channels.
        </p>
      </div>

      <div style={templateCard}>
        <span style={{ ...templateLabel, color: '#4D9EFF' }}>TEMPLATE 2 — THE FUNNEL</span>
        <p style={p}>
          <span style={strong}>Configuration:</span> One specific video, one subscribe button, one channel link.
        </p>
        <p style={p}>
          <span style={strong}>When to use:</span> When you have a specific lead-magnet video (a deep dive, a complete guide, a definitive piece) that's designed to convert casual viewers into committed channel followers.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why it works:</span> Less choice = clearer action. By directing nearly all viewer attention to one specific next video, you maximize click-through on that single recommendation. Best for channels with a small number of "tentpole" videos that disproportionately convert subscribers.
        </p>
      </div>

      <div style={templateCard}>
        <span style={{ ...templateLabel, color: '#FF8C00' }}>TEMPLATE 3 — THE SERIES</span>
        <p style={p}>
          <span style={strong}>Configuration:</span> One specific video (next in sequence), one playlist (the full series), one subscribe button.
        </p>
        <p style={p}>
          <span style={strong}>When to use:</span> For any content that's part of a series, course, or sequential narrative. The end screen explicitly continues the journey rather than redirecting to other topics.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why it works:</span> Viewers who finished a series video are in the strongest possible state to watch the next one. Removing other options keeps them in the series flow. Particularly powerful for educational, tutorial, or narrative channels.
        </p>
      </div>

      <div style={templateCard}>
        <span style={{ ...templateLabel, color: '#3EA651' }}>TEMPLATE 4 — THE PERFORMANCE-DRIVEN</span>
        <p style={p}>
          <span style={strong}>Configuration:</span> Two "Best for Viewer" auto-selected video slots, one subscribe button, one playlist.
        </p>
        <p style={p}>
          <span style={strong}>When to use:</span> When you don't have a clear next-video story to tell, or when your channel's content is too varied to have a logical sequence. Let YouTube's algorithm pick what each viewer is most likely to watch next.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why it works:</span> The algorithm has more data about each individual viewer than you do. For channels with diverse content, the "Best for Viewer" slots typically outperform any manual pick because they adapt to the specific viewer rather than being one-size-fits-all.
        </p>
      </div>

      <h2 style={h2}>Card Strategy: When to Use, When to Skip</h2>

      <p style={p}>
        Cards are tactically different from end screens. They appear during active watching, which means they interrupt rather than continue. Used well, they reinforce trust and surface related content at the right moment. Used carelessly, they break retention and pull viewers off the current video.
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>When cards work</h3>
        <p style={p}>
          <span style={strong}>1. Reference cards:</span> When you mention a previous video, drop a card at that exact moment. The viewer can save it for later, click immediately if highly interested, or ignore. Low-friction, high-utility.
        </p>
        <p style={p}>
          <span style={strong}>2. "More on this topic" cards:</span> Mid-video card pointing to a deeper dive on a specific point you're making. Best placed at a natural pause moment in your delivery.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. Channel/playlist cards:</span> Useful in the last 1-2 minutes as a soft pre-warm before the end screen activates.
        </p>

        <h3 style={h3}>When cards hurt</h3>
        <p style={p}>
          <span style={strong}>1. Cards in the first 30 seconds:</span> The hook window. Anything that distracts here destroys retention. Cards in the opening should be avoided entirely.
        </p>
        <p style={p}>
          <span style={strong}>2. Too many cards (4-5 per video):</span> Visual noise. Viewers tune them out, and the most important card gets ignored alongside the rest.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. Cards during emotional peaks:</span> If your video has a payoff moment, a story climax, or a key insight delivery — no cards during that window. Don't break attention when it's most engaged.
        </p>
      </div>

      <h2 style={h2}>The Strategic Placement Framework</h2>

      <p style={p}>
        Where you place end screen elements within the final 20 seconds matters as much as which elements you choose. The placement framework most creators ignore:
      </p>

      <div style={stepCard}>
        <span style={stepNumber}>STAGE 1 — LAST 60 SECONDS OF VIDEO (BEFORE END SCREEN)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Verbally tease the next video. "If you found this useful, the next video goes deeper on [specific aspect]." This pre-frames the end screen so viewers know what to click on. End screens without verbal setup convert at roughly 40% of properly pre-framed ones.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>STAGE 2 — END SCREEN ACTIVATES (LAST 20 SECONDS)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Your end screen elements appear. The visual layout matters: place the most important video slot in the upper-left or center (the strongest eye-tracking zones). Subscribe button typically performs best in the lower-right corner.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#FF8C00' }}>STAGE 3 — VERBAL CTA DURING END SCREEN</span>
        <p style={{ ...p, marginBottom: 0 }}>
          During the actual end screen window, explicitly tell viewers what to do. "Click on the video on the left for the deep dive." This drives click-through rates 2-3x higher than silent end screens. Silent end screens function as decoration; verbal CTAs function as direct calls to action.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>STAGE 4 — VISUAL CONTINUATION</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Your final shot during the end screen should reinforce continuity — your face on camera while the elements appear, or a custom end-card background that feels like a natural extension of the video. Sharp visual cuts to a static "OUTRO" slate kill conversion because they break the momentum the video built.
        </p>
      </div>

      <h2 style={h2}>The 5 Mistakes That Cost You Watch Time</h2>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 1 — LEAVING END SCREENS EMPTY</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The single most common mistake. Videos with no end screen send viewers off-platform or to YouTube's home page. You captured their attention for 8-10 minutes; not redirecting that energy is leaving 15-30% session watch time uncaptured on every video.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 2 — USING THE SAME END SCREEN FOR EVERY VIDEO</span>
        <p style={{ ...p, marginBottom: 0 }}>
          A blanket "watch my channel trailer" or generic playlist on every upload, regardless of the video's specific topic. End screens should pair contextually with the current video — viewers who watched a productivity tutorial want a productivity follow-up, not your most recent vlog.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 3 — STATIC OUTRO SLATE THAT KILLS MOMENTUM</span>
        <p style={{ ...p, marginBottom: 0 }}>
          When the end screen activates, the visual cuts to a generic "thanks for watching!" graphic with the end screen elements pasted on top. The energy collapses. End screens convert better when the video continues with the host on camera or the topic still being discussed during the final 20 seconds.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 4 — NO VERBAL CTA DURING THE END SCREEN</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The elements appear but the host says nothing about them. Silent end screens convert at a fraction of verbally-prompted ones. The voice direction is what turns "decorative options" into "specific next action."
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 5 — PROMOTING EXTERNAL LINKS WHEN A VIDEO WOULD CONVERT BETTER</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Using an end screen slot for an external link to your website when a video slot would generate more session watch time. External links are valuable for specific funnels (newsletter signups, course pages), but for most videos, more on-platform watching outperforms off-platform conversion for both the algorithm and long-term channel growth.
        </p>
      </div>

      <h2 style={h2}>A/B Testing End Screens</h2>

      <p style={p}>
        Unlike titles and thumbnails, YouTube doesn't currently have native A/B testing for end screens. But there are three practical approaches that produce real data:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>Method 1 — Sequential testing across uploads</h3>
        <p style={p}>
          Pick one variable (template, video slot choice, verbal CTA) and test two variants across the next 4 uploads — 2 with version A, 2 with version B. Compare end screen click-through rates in Studio's analytics. Best for measuring template impact.
        </p>

        <h3 style={h3}>Method 2 — Retrofit testing on evergreen videos</h3>
        <p style={p}>
          For videos that have been live for 6+ months with steady ongoing traffic, change the end screen and watch click-through rates shift over the following 30-60 days. The volume of traffic on evergreen videos generates clean data.
        </p>

        <h3 style={{ ...h3, marginBottom: 0 }}>Method 3 — End screen impressions vs CTR analysis</h3>
        <p style={{ ...p, marginBottom: 0 }}>
          In YouTube Studio's "End Screens" report, you'll see impressions (how many viewers reached the end screen) and click-through rate per element. A strong end screen click rate is 8-15% for video slots; below 4% suggests either weak pre-framing, weak element choice, or poor template fit. The metric framework is part of <Link href="/blog/youtube-studio-analytics-explained-every-metric-2026" style={inlineLink}>the complete YouTube Studio analytics guide</Link>.
        </p>
      </div>

      <h2 style={h2}>Real Math: How End Screens Compound Across a Channel</h2>

      <p style={p}>
        Most creators evaluate end screens video-by-video. The bigger story is the compounding effect across the whole channel.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Scenario</th>
            <th style={th}>Per-Video Session Time</th>
            <th style={th}>Monthly Across 4 Uploads</th>
            <th style={th}>Yearly Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>No end screens</td>
            <td style={td}>8 min (single video AVD)</td>
            <td style={td}>32 min × view count</td>
            <td style={td}>Baseline</td>
          </tr>
          <tr>
            <td style={td}>Basic end screens (no CTA)</td>
            <td style={td}>~9.2 min (+15%)</td>
            <td style={td}>+4.8 min × view count</td>
            <td style={td}>~57 min × view count</td>
          </tr>
          <tr>
            <td style={td}>Optimized end screens + verbal CTA</td>
            <td style={td}>~10.5 min (+31%)</td>
            <td style={td}>+10 min × view count</td>
            <td style={td}>~120 min × view count</td>
          </tr>
        </tbody>
      </table>

      <p style={p}>
        Multiply that delta by your actual view counts and the compounding effect becomes significant. For a channel doing 100K monthly views, optimized end screens versus empty end screens adds roughly 10 million additional minutes of session watch time per year — the kind of signal the 2026 algorithm distinctly rewards with more distribution. For broader retention strategy that pairs with this, see <Link href="/blog/improve-youtube-audience-retention-2026" style={inlineLink}>our complete retention guide</Link>.
      </p>

      <h2 style={h2}>The 5-Minute Setup For Every Upload</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1.</span> Pick the right template (Binge, Funnel, Series, or Performance-Driven) based on the video's category and your channel's content structure.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> Select the manual video slot — the specific next video most contextually relevant to the one just watched.
        </p>
        <p style={p}>
          <span style={strong}>3.</span> Set the playlist slot to your most relevant topical playlist or series.
        </p>
        <p style={p}>
          <span style={strong}>4.</span> Add a verbal tease in the final 60 seconds before the end screen activates ("if you want to go deeper on this, the video on the left covers exactly that").
        </p>
        <p style={p}>
          <span style={strong}>5.</span> Add a verbal CTA during the end screen window itself ("click the video on the left to keep going").
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>6.</span> Keep the visual energy alive during the end screen — don't cut to a static outro card.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>HOW NEXORA HELPS WITH END SCREEN DECISIONS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The hardest part of end screens isn't the setup — it's picking the right next-video to link to. NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only access). It analyzes which of your videos have the strongest session-continuation patterns, identifies the topic-pair combinations that drive the highest end screen click-through rates on your channel, and suggests the optimal next-video for each upload based on your actual audience flow data. Just ask: "Which video should I link from my new productivity tutorial's end screen to maximize session watch time?" The AI gives you a data-backed answer based on your channel's actual session patterns.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1.</span> End screens and cards are the most under-utilized retention feature in YouTube Studio. Properly configured end screens generate 15-30% more session watch time per video — one of the strongest distribution signals in the 2026 algorithm.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> Four end screen templates consistently outperform: The Binge (max session continuation), The Funnel (single tentpole video focus), The Series (sequential continuation), The Performance-Driven (algorithm-picked slots for diverse channels).
        </p>
        <p style={p}>
          <span style={strong}>3.</span> Cards are tactically different — they interrupt active watching. Use them for references, "more on this topic" callouts, and late-video soft channel promotion. Avoid them in the first 30 seconds, during emotional peaks, or in volumes of 4-5 per video.
        </p>
        <p style={p}>
          <span style={strong}>4.</span> Verbal pre-framing (last 60 seconds) and verbal CTA (during the end screen) drive 2-3x higher click-through than silent end screens. The voice direction is what turns decorative options into specific next actions.
        </p>
        <p style={p}>
          <span style={strong}>5.</span> The 5 mistakes that kill end screen performance: empty end screens, same end screen for every video, static outro slates that kill momentum, no verbal CTA, and using external link slots when video slots would generate more session watch time.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>6.</span> A strong end screen click rate is 8-15% for video slots; below 4% signals weak template fit or pre-framing. Compounded across a channel's annual upload volume, optimized end screens versus empty end screens generate millions of additional minutes of session watch time per year on a mid-size channel.
        </p>
      </div>
    </>
  )
}
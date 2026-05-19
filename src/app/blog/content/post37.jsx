import Link from 'next/link'

export default function Post37Content() {
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

  const templateBox = {
    background: '#0d0d0d',
    border: '1px solid #1a1a1a',
    borderRadius: 8,
    padding: '20px 24px',
    marginTop: 16,
    marginBottom: 24,
    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
    fontSize: 13,
    lineHeight: 1.7,
    color: '#bbb',
    whiteSpace: 'pre-wrap',
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
        Most YouTube creators in 2026 treat the description box as an afterthought. They paste a generic two-line summary, drop a few hashtags, and move on. That habit costs them — sometimes significantly. The description is one of the three signals YouTube uses to understand what your video is about (the other two being the title and the audio transcript), and it's the only one with 5,000 characters of space to work with.
      </p>

      <p style={p}>
        The rules changed in 2026. The shift to viewer-intent clustering in the algorithm (covered in <Link href="/blog/how-youtube-algorithm-works-2026" style={inlineLink}>how the YouTube algorithm works in 2026</Link>) means literal keyword matching matters less than it used to — but contextual relevance, semantic depth, and search-result clickability all matter more. Most "YouTube description SEO" advice still floating around is from 2022. It's actively wrong in 2026.
      </p>

      <p style={p}>
        This guide breaks down what description SEO actually looks like now: the "above the fold" 200 characters, the 7-section description anatomy, the keyword strategy that works under viewer-intent clustering, the timestamp and chapters mechanic most creators underuse, the link strategy, and the 7-paragraph template that fits any video. Plus the common mistakes that quietly hurt your ranking without you realizing.
      </p>

      <h2 style={h2}>Why Descriptions Still Matter in 2026</h2>

      <p style={p}>
        Three reasons descriptions are not dead — they're just less brute-force keyword-driven than they used to be:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>Reason 1 — Search visibility</h3>
        <p style={p}>
          YouTube search and Google search both still index video descriptions. For evergreen content (how-to videos, tutorials, reviews), search traffic remains a meaningful portion of long-term views. The description directly influences which queries your video can appear for, and it's the strongest place to introduce semantic context the title can't fit.
        </p>

        <h3 style={h3}>Reason 2 — Algorithm context for clustering</h3>
        <p style={p}>
          The 2026 algorithm clusters videos by viewer intent rather than exact-match keywords. To cluster correctly, the system needs strong semantic understanding of what your video is about. A thin description starves the system of signal. A rich, well-structured description gives it the context to place your video in the right viewer-intent cluster.
        </p>

        <h3 style={{ ...h3, marginBottom: 0 }}>Reason 3 — Click-through from search results</h3>
        <p style={{ ...p, marginBottom: 0 }}>
          When your video appears in search results, the first ~150 characters of your description are visible alongside the title. That snippet acts as a mini sales pitch for the click. A weak first sentence costs you CTR exactly when CTR matters most.
        </p>
      </div>

      <h2 style={h2}>The "Above the Fold" 200 Characters</h2>

      <p style={p}>
        On the YouTube watch page, only the first ~200 characters of the description are visible before viewers have to click "Show more." On mobile, it's even less — closer to 100 characters. This is the highest-value real estate in the description box, and most creators waste it.
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>What to put above the fold</h3>
        <p style={p}>
          <span style={strong}>1.</span> A one-sentence framing of what the video delivers — including the primary keyword phrase naturally placed.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> Your single most important link — newsletter signup, primary product, your free tool, or member-only content.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3.</span> A reason to keep reading — a teaser to the chapters or resources further down.
        </p>

        <h3 style={h3}>What NOT to put above the fold</h3>
        <p style={p}>
          <span style={strong}>1.</span> Generic "Subscribe for more videos!" text — it converts at almost zero in 2026.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> Long disclaimers or housekeeping notes — push these to the bottom.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3.</span> Affiliate disclosures (legally required, but they belong below your primary value props — your audience is sophisticated enough to expect them in any modern video).
        </p>
      </div>

      <h2 style={h2}>The 7-Section Description Anatomy</h2>

      <p style={p}>
        A complete 2026 description has 7 functional sections, each doing different work. Not every video needs all 7, but understanding the full structure lets you pick the right subset for each upload.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Section</th>
            <th style={th}>Position</th>
            <th style={th}>Primary Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>1. Hook sentence</td>
            <td style={td}>Above the fold</td>
            <td style={td}>SEO + search CTR</td>
          </tr>
          <tr>
            <td style={td}>2. Primary link</td>
            <td style={td}>Above the fold</td>
            <td style={td}>Conversion to owned channels</td>
          </tr>
          <tr>
            <td style={td}>3. Video summary (2-4 sentences)</td>
            <td style={td}>Lines 3-6</td>
            <td style={td}>Semantic context for algorithm</td>
          </tr>
          <tr>
            <td style={td}>4. Chapters / timestamps</td>
            <td style={td}>Mid-description</td>
            <td style={td}>Retention + navigation</td>
          </tr>
          <tr>
            <td style={td}>5. Related videos (internal links)</td>
            <td style={td}>Mid-description</td>
            <td style={td}>Cross-channel SEO + session time</td>
          </tr>
          <tr>
            <td style={td}>6. Resources / affiliate / product links</td>
            <td style={td}>Mid-to-lower</td>
            <td style={td}>Monetization</td>
          </tr>
          <tr>
            <td style={td}>7. Hashtags + housekeeping</td>
            <td style={td}>Bottom</td>
            <td style={td}>Discovery + disclosures</td>
          </tr>
        </tbody>
      </table>

      <h2 style={h2}>Keyword Strategy Under Viewer-Intent Clustering</h2>

      <p style={p}>
        The 2026 algorithm shift away from exact-match keywords changed keyword strategy fundamentally. The old playbook — "stuff your primary keyword 4-7 times in the description" — is now actively harmful. The system reads keyword stuffing as low-quality content and penalizes accordingly.
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>What replaces keyword density</h3>
        <p style={p}>
          <span style={strong}>1. Semantic coverage:</span> Use the primary keyword once or twice, then use related terms, synonyms, and contextual phrases. A video about "YouTube channel growth" should also reference subscribers, audience, retention, distribution, algorithm — the constellation of words that describe the topic from different angles.
        </p>
        <p style={p}>
          <span style={strong}>2. Natural language flow:</span> Write descriptions in plain English sentences, not lists of keywords. The 2026 algorithm parses semantic meaning, not keyword frequency. Natural prose with embedded keywords outperforms keyword lists every time.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. Topic clustering signal:</span> Reference related videos on your channel and the broader topic cluster. The algorithm uses these references to confirm what cluster your channel belongs to — which influences how widely your videos get distributed inside that cluster.
        </p>
      </div>

      <p style={p}>
        The relationship between description SEO and title work is symbiotic. Strong descriptions amplify what good titles set up. The full title-side strategy is in <Link href="/blog/youtube-title-formulas-that-get-clicks-2026" style={inlineLink}>our 2026 title formulas guide</Link> — the description's job is to confirm and expand the topical signal the title introduces.
      </p>

      <h2 style={h2}>Chapters and Timestamps: The Underused Multiplier</h2>

      <p style={p}>
        Adding chapter timestamps to your description does four things at once:
      </p>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1. Improves retention.</span> Viewers who would have clicked away when bored skip to the section they care about instead. This converts what would have been a drop into continued watch time.
        </p>
        <p style={p}>
          <span style={strong}>2. Unlocks search result enhancement.</span> YouTube can display individual chapters as their own search results — meaning one well-chaptered video can appear in search for multiple distinct queries.
        </p>
        <p style={p}>
          <span style={strong}>3. Provides semantic structure to the algorithm.</span> Chapter titles are essentially section headers that tell the system what topics the video covers in what order. Strong semantic signal.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>4. Improves perceived value.</span> Viewers who see chapter structure perceive the video as more professional and information-dense — even before watching. Higher CTR from chapters alone.
        </p>
      </div>

      <h3 style={h3}>How to format chapters correctly</h3>

      <div style={sectionCard}>
        <p style={p}>
          YouTube requires three things for chapters to activate: (1) the first timestamp must be 00:00, (2) you need at least 3 timestamps total, (3) each chapter must be at least 10 seconds long. Format: timestamp, space, dash, space, chapter title — like this:
        </p>
        <p style={{ ...p, marginBottom: 0, fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: 14, color: '#aaa' }}>
          00:00 - Introduction<br/>
          00:45 - The First Mistake<br/>
          03:20 - The Real Solution<br/>
          06:10 - Common Variations<br/>
          09:30 - Wrapping Up
        </p>
      </div>

      <h2 style={h2}>Internal Link Strategy</h2>

      <p style={p}>
        Linking from your description to other videos on your channel is the most underused SEO move available in 2026. Internal links to your own videos do three things:
      </p>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1. Build topical authority signal.</span> When the algorithm sees video A linking to video B linking to video C — all on related topics — it strengthens the case that your channel is an authority on that topic cluster. This is the same cluster-authority logic that compounds blog SEO.
        </p>
        <p style={p}>
          <span style={strong}>2. Drive session watch time.</span> Viewers who click an internal link in your description stay on YouTube — and stay watching your content specifically. Session continuation is one of the strongest signals the 2026 algorithm rewards (paired with end screen strategy, covered in <Link href="/blog/youtube-end-screens-cards-session-watch-time-2026" style={inlineLink}>our end screens guide</Link>).
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. Rescue underperforming videos.</span> When you have a stronger newer video that ranks well, linking to an older underperforming video from the description can revive its traffic via referral views.
        </p>
      </div>

      <h3 style={h3}>The 2-3 internal link rule</h3>

      <p style={p}>
        Include 2-3 internal links per description, with specific anchor context. Not just "watch my other video" — "if you want the deeper breakdown on retention, that's covered in this video: [link]." Specific, contextual, useful. Random link dumps in descriptions hurt instead of help.
      </p>

      <h2 style={h2}>External Links: When They Help, When They Hurt</h2>

      <p style={p}>
        Different external links serve different purposes. The hierarchy of what to include:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>High-value external links (keep)</h3>
        <p style={p}>
          <span style={strong}>1. Your owned channels:</span> newsletter signup, primary website, your free tool. These convert engaged viewers into long-term audience members.
        </p>
        <p style={p}>
          <span style={strong}>2. Resources mentioned in the video:</span> tools, books, articles you specifically referenced. Viewers who came for the topic will click these.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. Affiliate / shopping links:</span> products you authentically recommended. The 2026 YouTube Shopping infrastructure (covered in <Link href="/blog/youtube-shopping-2026-complete-guide" style={inlineLink}>our YouTube Shopping guide</Link>) makes these higher-converting than ever — especially when paired with in-video product tags.
        </p>

        <h3 style={h3}>Low-value external links (cut or move to the bottom)</h3>
        <p style={p}>
          <span style={strong}>1. All your social media handles in a long block:</span> viewers who want to follow you elsewhere will look for one or two. Listing 8 platforms creates visual clutter and dilutes attention.
        </p>
        <p style={p}>
          <span style={strong}>2. Generic "subscribe to my podcast / Discord / Patreon" lines:</span> push these to the housekeeping section at the bottom.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. Equipment lists for non-tech channels:</span> nobody reading a finance tutorial cares about your microphone. Move to a separate gear page on your site.
        </p>
      </div>

      <h2 style={h2}>The 7-Paragraph Description Template</h2>

      <p style={p}>
        This is the structure that works across niches. Adapt the wording, but keep the section order — the algorithm reads top-down, and so do viewers.
      </p>

      <div style={templateBox}>
{`[1. ONE-SENTENCE HOOK + PRIMARY KEYWORD]
In this video, [specific outcome the viewer will get from watching, with primary keyword naturally placed].

[2. PRIMARY CTA LINK]
👉 [Your most important link with clear value prop]

[3. VIDEO SUMMARY — 2-4 SENTENCES]
[Expand on what the video covers, mentioning 3-5 related concepts and the specific angle you take. This is where semantic coverage happens.]

[4. CHAPTERS]
00:00 - Introduction
01:15 - [First chapter]
03:30 - [Second chapter]
06:00 - [Third chapter]
09:15 - [Closing]

[5. RELATED VIDEOS ON THIS CHANNEL]
🔗 [Contextual phrase] → [Link to related video 1]
🔗 [Contextual phrase] → [Link to related video 2]
🔗 [Contextual phrase] → [Link to related video 3]

[6. RESOURCES / TOOLS / AFFILIATE LINKS]
[Tools and products mentioned in the video, with clear labeling. Disclose affiliates simply.]

[7. HOUSEKEEPING]
[Subscribe link, social handles in one compact block, disclosures, hashtags at the very bottom.]

#hashtag1 #hashtag2 #hashtag3`}
      </div>

      <h2 style={h2}>Common Description Mistakes That Hurt SEO</h2>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 1 — KEYWORD STUFFING</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Listing 15 variations of your main keyword. The 2026 algorithm reads this as low-quality content and de-prioritizes accordingly. Use the primary keyword once or twice, then semantic relatives — natural language, not robot SEO.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 2 — GENERIC FIRST SENTENCE</span>
        <p style={{ ...p, marginBottom: 0 }}>
          "Hey guys, welcome back to the channel! In this video..." — wastes the highest-value real estate. Search snippets show this; CTR drops accordingly. Replace with a specific value proposition that mentions the topic.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 3 — NO CHAPTERS ON 5+ MINUTE VIDEOS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Any video over 5 minutes should have chapters. Skipping them costs retention, search visibility, and perceived quality. The setup takes 60 seconds; the return compounds across the video's lifetime.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 4 — 20+ HASHTAGS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          YouTube only counts the first 3 hashtags meaningfully — and displaying more than 15 hashtags actually causes YouTube to ignore all of them entirely. The optimal range is 3-5 specific, relevant hashtags. More = worse.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 5 — COPYING THE SAME DESCRIPTION ACROSS VIDEOS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The template above is structure — not literal copy-paste content. Every video needs unique semantic content in sections 1, 3, 4, and 5 (hook, summary, chapters, related videos). Identical descriptions across videos signals templated content to the algorithm.
        </p>
      </div>

      <div style={mistakeCard}>
        <span style={mistakeLabel}>MISTAKE 6 — IGNORING THE DESCRIPTION ENTIRELY ON SHORTS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Shorts have shorter descriptions but the principles are the same. The first 100 characters above the fold matter, semantic context still helps clustering, and 2-3 hashtags still work. Shorts creators who treat the description as optional miss meaningful discovery.
        </p>
      </div>

      <h2 style={h2}>Measuring Description Performance</h2>

      <p style={p}>
        You can't optimize what you don't measure. YouTube Studio exposes specific data points for description performance:
      </p>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1. Search source traffic %.</span> The percentage of your views coming from YouTube search. Higher = better description SEO. Track over time per video. The full measurement framework is in <Link href="/blog/youtube-studio-analytics-explained-every-metric-2026" style={inlineLink}>the YouTube Studio analytics guide</Link>.
        </p>
        <p style={p}>
          <span style={strong}>2. Card and end-screen click-through rates.</span> If you're using internal links in descriptions, watch click-through on those compared to your card click-through — they should perform similarly for similar contextual relevance.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>3. External link clicks.</span> Studio's "Conversion" report shows clicks to external links. Use this to confirm your primary CTA placement is working — if your above-the-fold link has weak click-through, restructure the first 200 characters.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>HOW NEXORA HELPS WITH DESCRIPTION STRATEGY</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The hardest part of description SEO isn't following the template — it's knowing which semantic terms to include and which related videos from your channel make the strongest internal-link choices. NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only access). It analyzes which terms appear in search queries leading to your channel, identifies semantic clusters across your video catalog, and suggests the optimal 2-3 internal links per video based on actual audience flow patterns. Just ask: "What semantic terms should I include in this video's description, and which 3 of my past videos should I link to?" Data-backed answer based on your real search and traffic data.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1.</span> The 2026 algorithm shifted from exact-match keywords to viewer-intent clustering — which means description SEO is now about semantic coverage and natural language, not keyword density. Most pre-2024 description advice is actively harmful in 2026.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> The first 200 characters (above the fold) are the highest-value real estate. Use them for a specific value proposition with the primary keyword, your most important link, and a reason to keep reading. Don't waste them on generic "welcome back" copy.
        </p>
        <p style={p}>
          <span style={strong}>3.</span> The 7-section anatomy: hook sentence, primary CTA link, video summary, chapters/timestamps, related videos (internal links), resources/affiliate links, housekeeping/hashtags. Not every video needs all 7, but the order matters.
        </p>
        <p style={p}>
          <span style={strong}>4.</span> Chapters do four things at once: improve retention, unlock search result enhancement (individual chapters can rank separately), provide semantic structure for the algorithm, and increase perceived quality. Mandatory for videos over 5 minutes.
        </p>
        <p style={p}>
          <span style={strong}>5.</span> Include 2-3 internal links per description with specific contextual anchor text. This builds topical authority signal across your channel, drives session watch time, and can revive underperforming evergreen videos.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>6.</span> The 6 mistakes that hurt SEO: keyword stuffing, generic first sentence, no chapters on 5+ minute videos, 20+ hashtags (use 3-5 max), identical descriptions across videos, and ignoring the description entirely on Shorts. Most of these are fixable in under 5 minutes per video — and they compound across your entire catalog.
        </p>
      </div>
    </>
  )
}
import Link from 'next/link'

export default function Post22Content() {
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
      padding: '22px 26px',
      marginBottom: 20,
    }
  
    const stepNumber = {
      fontSize: 12,
      fontWeight: 800,
      color: '#FF0000',
      letterSpacing: 1.5,
      marginBottom: 8,
      display: 'block',
    }
  
    const stepTitle = {
      fontSize: 19,
      fontWeight: 700,
      color: '#fff',
      marginBottom: 12,
    }
  
    const factorCard = {
      background: '#161616',
      border: '1px solid #222',
      borderRadius: 10,
      padding: '20px 24px',
      marginBottom: 16,
    }
  
    const factorRank = {
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: 1.5,
      marginBottom: 6,
      display: 'block',
    }
  
    const factorName = {
      fontSize: 18,
      fontWeight: 700,
      color: '#fff',
      marginBottom: 8,
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
  
    const checkBox = {
      background: '#1a1a1a',
      borderLeft: '3px solid #3EA651',
      borderRadius: '0 8px 8px 0',
      padding: '12px 16px',
      marginTop: 12,
      marginBottom: 12,
    }
  
    const checkLabel = {
      fontSize: 11,
      fontWeight: 700,
      color: '#3EA651',
      letterSpacing: 1,
      marginBottom: 6,
      display: 'block',
    }
  
    return (
      <>
        <p style={p}>
          YouTube is the second-largest search engine in the world, processing over 3 billion daily searches. Over 70% of YouTube views come from algorithmic recommendations and search — not from subscribers. This means that <span style={strong}>your visibility on YouTube depends almost entirely on SEO</span>.
        </p>
  
        <p style={p}>
          But YouTube SEO isn't the same as Google SEO. The ranking factors are different, the competition works differently, and the optimization tactics that worked in 2022 are partially obsolete in 2026. The algorithm has fundamentally evolved — and most YouTube SEO advice you'll find online is outdated.
        </p>
  
        <p style={p}>
          This guide covers everything you need to rank on YouTube in 2026: the actual ranking factors today, the keyword research process that works, on-page optimization, and the post-publish moves that move videos from page 3 to page 1.
        </p>
  
        <h2 style={h2}>How YouTube Search Actually Works in 2026</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            When someone searches a query on YouTube, the algorithm filters billions of videos in milliseconds using two main signals: <span style={strong}>relevance</span> (how well your metadata matches the query) and <span style={strong}>performance</span> (how viewers respond to your video).
          </p>
          <p style={p}>
            Relevance is determined by your title, description, captions, spoken content, and historical channel topics. Performance is determined by CTR, retention rate, watch time, and engagement signals from real viewers.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The 2026 evolution: YouTube's AI now indexes your spoken audio and visual content alongside your metadata. You can rank for queries you didn't explicitly target if your video clearly covers the topic. This shifted the game away from keyword stuffing toward genuine topical relevance. The fundamentals here still apply, but <Link href="/blog/ask-youtube-conversational-search-creators-2026" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>the shift to conversational search</Link> with Ask YouTube is changing how discovery works — worth understanding alongside classic SEO.
          </p>
        </div>
  
        <h2 style={h2}>The 6 YouTube Ranking Factors That Matter in 2026</h2>
  
        <div style={factorCard}>
          <span style={{ ...factorRank, color: '#FF0000' }}>RANK FACTOR #1</span>
          <div style={factorName}>Click-Through Rate (CTR)</div>
          <p style={{ ...p, marginBottom: 0 }}>
            The percentage of people who click your thumbnail after seeing it. The single most important ranking factor on YouTube. Your video's first test — if no one clicks, nothing else matters. CTR is determined primarily by your thumbnail and title working together. Healthy CTR ranges from 4-10% depending on traffic source and niche. Below 3% means YouTube stops promoting your video.
          </p>
        </div>
  
        <div style={factorCard}>
          <span style={{ ...factorRank, color: '#FF0000' }}>RANK FACTOR #2</span>
          <div style={factorName}>Audience Retention Rate</div>
          <p style={{ ...p, marginBottom: 0 }}>
            The percentage of viewers who keep watching throughout your video. Weighted heavily because it signals content quality. A video with 60% retention will outrank one with 30% retention even if the second has more views. The first 30 seconds matter most — that's where most drop-off happens.
          </p>
        </div>
  
        <div style={factorCard}>
          <span style={{ ...factorRank, color: '#FF8C00' }}>RANK FACTOR #3</span>
          <div style={factorName}>Metadata Relevance (Title, Description, Captions)</div>
          <p style={{ ...p, marginBottom: 0 }}>
            How well your video's text content matches the search query. Title carries the most weight, followed by description (especially the first 150 characters), captions, and spoken content. In 2026, exact keyword matching matters less than semantic relevance — YouTube's AI understands meaning, not just keywords.
          </p>
        </div>
  
        <div style={factorCard}>
          <span style={{ ...factorRank, color: '#FF8C00' }}>RANK FACTOR #4</span>
          <div style={factorName}>Engagement Signals</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Likes, comments, shares, and saves. These signal viewer satisfaction and social proof. High engagement rates relative to view count indicate strong audience response. Comments with substantive creator replies carry extra weight in 2026 — they signal active community.
          </p>
        </div>
  
        <div style={factorCard}>
          <span style={{ ...factorRank, color: '#4D9EFF' }}>RANK FACTOR #5</span>
          <div style={factorName}>Session Watch Time</div>
          <p style={{ ...p, marginBottom: 0 }}>
            How long viewers stay on YouTube after watching your video. If they watch your video and continue watching more YouTube content, that's a positive signal. If they leave the platform after your video, that hurts your ranking. End screens pointing to your next video help here.
          </p>
        </div>
  
        <div style={factorCard}>
          <span style={{ ...factorRank, color: '#4D9EFF' }}>RANK FACTOR #6</span>
          <div style={factorName}>Channel Authority and Topic Consistency</div>
          <p style={{ ...p, marginBottom: 0 }}>
            YouTube ranks videos higher when they come from channels with consistent topical focus. A channel that has uploaded 50 videos about personal finance will rank a new finance video higher than a random new channel covering the same topic. Niche down to build topical authority — it compounds.
          </p>
        </div>
  
        <h2 style={h2}>YouTube Keyword Research (The 2026 Process)</h2>
  
        <div style={stepCard}>
          <span style={stepNumber}>STEP 1 — START WITH YOUTUBE AUTOCOMPLETE</span>
          <div style={stepTitle}>The most accurate free keyword tool</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Type your topic into the YouTube search bar and look at the autocomplete suggestions. These are real queries from real users, ranked by frequency. Use the alphabet method: type your main keyword followed by each letter ("how to edit videos a", "how to edit videos b") to discover dozens of long-tail variations. Each suggestion represents validated search demand. This is more accurate than any third-party keyword tool because it pulls directly from YouTube's actual search data.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>STEP 2 — USE GOOGLE TRENDS WITH YOUTUBE FILTER</span>
          <div style={stepTitle}>Validate that demand is growing, not declining</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Once you have keyword candidates, check Google Trends with the YouTube search filter (not Web search). This shows you whether interest in the topic is rising, stable, or declining specifically on YouTube. A rising trend means growing opportunity. A declining trend means you'll fight an uphill battle. Compare 3-5 keyword candidates side-by-side and pick the strongest trending option.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>STEP 3 — CHECK COMPETITION LEVEL</span>
          <div style={stepTitle}>Look for keyword gaps</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Search your keyword on YouTube. Look at the top 10 results. Are they all from massive channels with millions of subscribers? Then competition is too high for a small channel. Are there results from channels with 1K-50K subscribers? That means smaller channels can rank — your keyword is workable. Bonus opportunity: if no top result is from the last 6 months, the keyword is "stale" and a fresh, well-optimized video can quickly take the top spot.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>STEP 4 — TARGET LONG-TAIL FIRST</span>
          <div style={stepTitle}>Specific beats broad for new channels</div>
          <p style={{ ...p, marginBottom: 0 }}>
            "How to grow on YouTube" is competitive. "How to grow a faceless YouTube channel in 2026" is much less competitive. Long-tail keywords have lower volume but higher intent and dramatically lower competition. A video ranking #1 for a 5,000-search/month long-tail keyword will outperform a video at #15 for a 50,000-search/month broad keyword. Start with long-tail and expand to broader keywords as your channel authority grows. Long-tail phrasing also maps cleanly onto the conversational questions AI search now parses, which is its own optimization layer worth learning &mdash; see <Link href="/blog/youtube-ai-search-optimization-2026" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>how to optimize for YouTube AI search</Link>.
          </p>
        </div>
  
        <div style={tipBox}>
          <span style={tipLabel}>AI SHORTCUT</span>
          <p style={{ ...p, marginBottom: 0 }}>
            NEXORA's AI Coach can help with keyword research by analyzing your channel's existing search traffic data through Search Console-like reporting. Ask it "what queries are driving views to my channel right now?" and it will surface the search terms that are already partially working — these are your easiest paths to ranking improvements. You're already showing up for them; a focused video on those exact queries can dominate them.
          </p>
        </div>
  
        <h2 style={h2}>On-Page YouTube SEO (Title, Description, Tags)</h2>
  
        <div style={stepCard}>
          <span style={stepNumber}>TITLE OPTIMIZATION</span>
          <div style={stepTitle}>Your single most important SEO element</div>
          <p style={p}>
            Your title is the strongest ranking signal AND the biggest CTR driver. It must satisfy both at once.
          </p>
          <div style={checkBox}>
            <span style={checkLabel}>RULES</span>
            <p style={{ ...p, fontSize: 14, marginBottom: 0 }}>
              • Primary keyword in the first 5 words<br/>
              • 50-65 characters total (longer gets truncated on mobile)<br/>
              • Add a curiosity hook AFTER the keyword<br/>
              • Don't keyword-stuff (one primary, maybe one secondary keyword)<br/>
              • Match search intent (educational title for how-to searches, comparison for vs searches)
            </p>
          </div>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>DESCRIPTION OPTIMIZATION</span>
          <div style={stepTitle}>Underused by most creators</div>
          <p style={p}>
            The description is more important than most creators think. The first 150 characters appear in search results and impact click decisions. The full description (up to 5000 characters) provides keyword signals to YouTube's algorithm. For a full breakdown of the 7-section description anatomy, the chapters strategy, and the 6 mistakes that hurt SEO, see <Link href="/blog/youtube-description-seo-2026" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>the complete description SEO breakdown</Link>.
          </p>
          <div style={checkBox}>
            <span style={checkLabel}>STRUCTURE</span>
            <p style={{ ...p, fontSize: 14, marginBottom: 0 }}>
              • First sentence: include primary keyword + value proposition<br/>
              • Lines 2-4: expand on what the video covers (with secondary keywords)<br/>
              • Add timestamps/chapters (Google can rank individual chapters as rich results)<br/>
              • Include 3-5 relevant hashtags at the bottom<br/>
              • Add links to related content on your channel<br/>
              • Total length: 200-500 words for important videos
            </p>
          </div>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>CAPTIONS & TRANSCRIPTS</span>
          <div style={stepTitle}>The hidden SEO multiplier</div>
          <p style={p}>
            YouTube indexes every word spoken in your video through auto-captions. This dramatically expands the keywords you can rank for — your spoken content matters as much as your metadata for SEO.
          </p>
          <div style={checkBox}>
            <span style={checkLabel}>OPTIMIZATION</span>
            <p style={{ ...p, fontSize: 14, marginBottom: 0 }}>
              • Say your primary keyword naturally in the first 30 seconds<br/>
              • Mention secondary keywords throughout the video<br/>
              • Edit auto-captions for accuracy (auto-captions miss 5-15% of words)<br/>
              • For important videos, upload a corrected transcript<br/>
              • Speak clearly — mumbled audio gets indexed incorrectly
            </p>
          </div>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>TAGS (LOWER PRIORITY IN 2026)</span>
          <div style={stepTitle}>Still useful but de-emphasized</div>
          <p style={{ ...p, marginBottom: 0 }}>
            YouTube has officially stated that tags carry minimal ranking weight in 2026 compared to title, description, and content. They're useful for clarifying topic ambiguity (helping YouTube understand whether your "Python" video is about coding or snakes) but they won't move rankings significantly. Add 5-10 relevant tags including your primary keyword and variations — but don't spend more than 2 minutes on tags. Your time is better invested in title and description optimization. One common question deserves its own answer — <Link href="/blog/youtube-tags-2026-do-they-matter" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>whether YouTube tags still matter</Link> in 2026, and where to spend optimization time instead.
          </p>
        </div>
  
        <h2 style={h2}>The Thumbnail Factor (Half of Your Ranking Power)</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            Thumbnails determine your CTR, and CTR is the #1 ranking factor. This means your thumbnail effectively contributes to ~50% of your video's ranking potential. A great video with a bad thumbnail will never rank because it'll never get enough clicks to prove itself.
          </p>
          <p style={p}>
            Custom thumbnails outperform auto-generated screenshots by 60-70% in CTR on average. This isn't a marginal difference — it's the difference between a video that gets 5,000 views and one that gets 50,000.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            Use YouTube's built-in A/B testing (Test & Compare) to test multiple thumbnail variations on every important video. The data will show you which performs best for your specific audience.
          </p>
        </div>
  
        <h2 style={h2}>Post-Publish SEO Moves That Most Creators Skip</h2>
  
        <div style={stepCard}>
          <span style={stepNumber}>FIRST 24 HOURS — THE CRITICAL WINDOW</span>
          <div style={stepTitle}>Where YouTube decides whether to promote your video</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Engage actively in comments for the first 60-90 minutes after publishing. Reply substantively to every comment. This sends strong engagement signals during the algorithm's initial test phase. Share the video on relevant external platforms (your social media, niche communities, email list). External traffic in the first 24 hours can boost the algorithm's confidence in your video.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>48-HOUR REVIEW</span>
          <div style={stepTitle}>The optimization window before YouTube locks in</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Check CTR after 48 hours. If below 3%, your thumbnail/title is failing — swap to your backup version immediately. The first 48 hours determine the algorithm's initial assessment, but you have a window to course-correct. After 7 days, changes have less impact because YouTube has already classified the video's performance tier.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>MONTHLY OPTIMIZATION ROUND</span>
          <div style={stepTitle}>Mining your back catalog for free growth</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Once a month, sort your videos by impressions in the last 28 days. Find the videos with the most impressions but lowest CTR — YouTube is showing them to people but no one's clicking. Update those thumbnails. This is the single highest-ROI activity in YouTube SEO. A 2% CTR improvement on a video with 50,000 monthly impressions is 1,000 extra views per month — from work you've already done.
          </p>
        </div>
  
        <h2 style={h2}>Common YouTube SEO Mistakes</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Mistake 1: Keyword stuffing.</span> Cramming keywords into your title and description used to work. In 2026, it actively hurts you — YouTube's AI detects unnatural keyword density and reduces rankings for spammy metadata. Use keywords naturally, once or twice maximum.
          </p>
          <p style={p}>
            <span style={strong}>Mistake 2: Targeting overly broad keywords.</span> A new channel targeting "fitness" or "investing" is fighting impossible competition. Long-tail keywords with specific angles win for small channels.
          </p>
          <p style={p}>
            <span style={strong}>Mistake 3: Ignoring CTR.</span> Most creators check views but never check CTR. CTR is the leading indicator — a video with low CTR will never get views. Check CTR after every upload and optimize thumbnails when it underperforms.
          </p>
          <p style={p}>
            <span style={strong}>Mistake 4: Using auto-generated captions without editing.</span> YouTube indexes captions for search. Auto-captions have errors that mean YouTube might not understand what your video is about. Edit captions on important videos — it directly impacts your ranking power.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Mistake 5: Treating videos as one-time uploads.</span> Your back catalog is an SEO asset. Update thumbnails, refresh descriptions, fix titles — older videos can be revived with simple optimization. Most creators publish and forget. The smart ones publish and iterate.
          </p>
        </div>
  
        <h2 style={h2}>How AI Speeds Up YouTube SEO</h2>
  
        <div style={{
          ...sectionCard,
          border: '1px solid rgba(255,0,0,0.3)',
          background: 'rgba(255,0,0,0.03)',
        }}>
          <p style={p}>
            Manual SEO analysis takes hours per video. AI agents connected to your channel can compress this dramatically by surfacing the specific videos and metrics that need attention.
          </p>
          <p style={p}>
            NEXORA's AI Coach can identify which videos have high impressions but low CTR (your thumbnail update priorities), find which search queries are already driving traffic to your channel (your keyword opportunities), analyze why specific videos underperformed (relevance vs performance issues), and generate content ideas based on what your audience actually searches for.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The pattern detection is what humans miss. An AI agent can identify that your videos with titles under 55 characters perform 34% better, or that your audience clicks your videos 2.3x more often when you mention specific topics in your title's first half. These insights take hours of manual analysis but seconds for an AI agent with access to your full data.
          </p>
        </div>
  
        <h2 style={h2}>The 30-Day YouTube SEO Action Plan</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Week 1:</span> Run keyword research using YouTube Autocomplete and Google Trends. Identify 10 long-tail keywords with proven demand and manageable competition. Pick the top 4 for your first month of videos.
          </p>
          <p style={p}>
            <span style={strong}>Week 2:</span> Optimize all existing videos in your library. Update titles to include primary keywords in the first 5 words. Rewrite descriptions with proper structure. Edit auto-captions on your top 5 videos.
          </p>
          <p style={p}>
            <span style={strong}>Week 3:</span> Audit thumbnails. Find the 5 videos with highest impressions and lowest CTR. Create new thumbnails for them using YouTube's A/B testing feature. Track CTR changes after 48 hours.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Week 4:</span> Analyze results. Which videos improved most? Which patterns worked? Lock in the optimization habits that delivered results. Plan next month's content using the keyword research from week 1.
          </p>
        </div>
  
        <h2 style={h2}>Key Takeaways</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1.</span> The 6 ranking factors that matter in 2026: CTR (most important), retention rate, metadata relevance, engagement signals, session watch time, and channel topical authority.
          </p>
          <p style={p}>
            <span style={strong}>2.</span> YouTube Autocomplete is the most accurate free keyword tool. Use the alphabet method to find long-tail variations with validated demand.
          </p>
          <p style={p}>
            <span style={strong}>3.</span> Long-tail keywords beat broad keywords for new channels. Target specific phrases first, expand to broader topics as authority builds.
          </p>
          <p style={p}>
            <span style={strong}>4.</span> Thumbnails contribute to ~50% of your ranking power through CTR. Custom thumbnails outperform auto-generated by 60-70%. Use YouTube's A/B testing on every important video.
          </p>
          <p style={p}>
            <span style={strong}>5.</span> The first 48 hours are critical. Engage actively in comments. Check CTR. Swap thumbnails if needed. After 7 days, changes have diminishing returns.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>6.</span> Monthly thumbnail audits on your back catalog deliver the highest ROI. Improving CTR on existing videos creates free views from work you've already done.
          </p>
        </div>
      </>
    )
  }
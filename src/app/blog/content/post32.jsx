import Link from 'next/link'

export default function Post32Content() {
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

  const metricCard = {
    background: '#161616',
    border: '1px solid #222',
    borderRadius: 10,
    padding: '24px 28px',
    marginBottom: 20,
  }

  const metricLabel = {
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

  const noiseBox = {
    background: 'rgba(248,113,113,0.04)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 10,
    padding: '20px 24px',
    marginBottom: 16,
  }

  const noiseLabel = {
    fontSize: 11,
    fontWeight: 800,
    color: '#f87171',
    letterSpacing: 1.5,
    marginBottom: 8,
    display: 'block',
  }

  const signalBox = {
    background: 'rgba(62,166,81,0.04)',
    border: '1px solid rgba(62,166,81,0.2)',
    borderRadius: 10,
    padding: '20px 24px',
    marginBottom: 16,
  }

  const signalLabel = {
    fontSize: 11,
    fontWeight: 800,
    color: '#3EA651',
    letterSpacing: 1.5,
    marginBottom: 8,
    display: 'block',
  }

  return (
    <>
      <p style={p}>
        YouTube Studio shows you over 80 distinct metrics across analytics dashboards. Most creators look at 4 or 5 of them. Of those 4 or 5, roughly half are the wrong ones to be optimizing for in 2026.
      </p>

      <p style={p}>
        This is the definitive guide to YouTube Studio analytics in 2026: every metric that matters, what each one actually measures, which metrics drive growth versus which are vanity noise, the metric pairings that reveal what single numbers can't, and the framework to audit your dashboard like a professional analyst would. By the end of this guide, you'll know exactly what to look at, in what order, and what to ignore entirely.
      </p>

      <p style={p}>
        This is the pillar for our analytics cluster — everything else we've published on <Link href="/blog/best-youtube-analytics-tools-2026" style={inlineLink}>analytics tools</Link>, <Link href="/blog/how-to-analyze-your-youtube-channel-performance" style={inlineLink}>channel performance analysis</Link>, <Link href="/blog/improve-youtube-audience-retention-2026" style={inlineLink}>retention</Link>, <Link href="/blog/best-time-to-post-on-youtube" style={inlineLink}>posting times</Link>, and <Link href="/blog/how-to-analyze-youtube-competitors" style={inlineLink}>competitor analysis</Link> ladders up to this metric foundation.
      </p>

      <h2 style={h2}>The 2026 Studio Analytics Landscape</h2>

      <p style={p}>
        YouTube Studio's analytics surface has evolved significantly in 2025-2026. Three structural changes shape how creators should approach metrics now:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>Change 1 — Ask Studio (conversational analytics)</h3>
        <p style={p}>
          The AI chatbot built directly into Studio answers questions about your analytics in natural language. "Why did my last video underperform?" or "Which thumbnail style works best for my channel?" return data-backed responses without dashboard navigation. The catch: Ask Studio only sees your own data — it doesn't cross-reference competitors or category benchmarks.
        </p>

        <h3 style={h3}>Change 2 — Real-time activity surface</h3>
        <p style={p}>
          The 48-hour and 60-minute real-time analytics views are now more prominent. This is where you spot a video that's about to break out before the algorithm has fully decided whether to push it.
        </p>

        <h3 style={{ ...h3, marginBottom: 0 }}>Change 3 — Viewer-intent clustering</h3>
        <p style={{ ...p, marginBottom: 0 }}>
          The 2026 algorithm clusters videos by viewer intent rather than keyword match (covered in <Link href="/blog/how-youtube-algorithm-works-2026" style={inlineLink}>how the YouTube algorithm works in 2026</Link>). This changes which metrics signal "the algorithm is serving this widely" — particularly making impressions-source and traffic-source data more strategically important than absolute view counts.
        </p>
      </div>

      <h2 style={h2}>The Signal-to-Noise Map</h2>

      <p style={p}>
        Before listing metrics one by one, here's the 30-second mental model: of the 80+ metrics in Studio, roughly 20 are signal and 60 are noise (or signal already implied by other metrics). The signal metrics divide into five functional categories: Reach, Engagement, Conversion, Revenue, and Discovery.
      </p>

      <table style={dataTable}>
        <thead>
          <tr>
            <th style={th}>Category</th>
            <th style={th}>What It Measures</th>
            <th style={th}>Core Metrics (Signal)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Reach</td>
            <td style={td}>How many people saw it</td>
            <td style={td}>Impressions, CTR, traffic sources</td>
          </tr>
          <tr>
            <td style={td}>Engagement</td>
            <td style={td}>How long they watched</td>
            <td style={td}>Watch time, average view duration, retention curve</td>
          </tr>
          <tr>
            <td style={td}>Conversion</td>
            <td style={td}>What they did after watching</td>
            <td style={td}>Subscribers gained, returning viewers, engagement rate</td>
          </tr>
          <tr>
            <td style={td}>Revenue</td>
            <td style={td}>What it earned</td>
            <td style={td}>RPM, CPM, monetized playbacks</td>
          </tr>
          <tr>
            <td style={td}>Discovery</td>
            <td style={td}>How the algorithm is serving it</td>
            <td style={td}>Browse/Suggested mix, search source, External</td>
          </tr>
        </tbody>
      </table>

      <h2 style={h2}>Category 1 — Reach Metrics</h2>

      <div style={metricCard}>
        <span style={metricLabel}>METRIC 1 — IMPRESSIONS</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> The number of times your video thumbnail was shown to a viewer on YouTube. Counts only when the thumbnail is at least 50% visible for at least 1 second.
        </p>
        <p style={p}>
          <span style={strong}>What it doesn't count:</span> Embeds on external sites, autoplay loops, your own views, or content shown to viewers who recently watched the same video.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>How to read it:</span> Impressions are the algorithm's "vote of confidence." Rising impressions across a 7-day window means the algorithm is testing your video with more audiences. Flat impressions means the algorithm has decided how to serve your video and is holding steady.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#4D9EFF' }}>METRIC 2 — IMPRESSIONS CLICK-THROUGH RATE (CTR)</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> The percentage of impressions that resulted in a click. CTR = (clicks / impressions) × 100.
        </p>
        <p style={p}>
          <span style={strong}>Benchmark ranges in 2026:</span> 2-4% is below average. 4-7% is good. 7-12% is strong. 12%+ is exceptional. These are averages — niche varies significantly (tech reviews often hit 8-12%, vlogs typically 3-5%).
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Critical insight:</span> CTR is meaningful only relative to your own historical baseline, not absolute benchmarks. Your channel's "good CTR" depends on your niche, audience composition, and how the algorithm tests your content. A 4% CTR can be strong for one channel and weak for another.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#FF8C00' }}>METRIC 3 — TRAFFIC SOURCES</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> Where viewers came from before clicking your video. The major sources: Browse features (home page, subscriptions feed), Suggested videos (sidebar), YouTube search, External (other websites), Direct, Playlist, Channel pages.
        </p>
        <p style={p}>
          <span style={strong}>Why it matters in 2026:</span> Traffic sources reveal whether the algorithm is treating your video as discovery-worthy. Videos with high Browse and Suggested percentages are being actively pushed to new viewers. Videos with high Direct or Channel-page traffic are being watched only by your existing audience — the algorithm isn't sharing them widely.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The signal pattern:</span> A new upload should hit at least 40-50% Browse + Suggested combined within the first 72 hours to indicate the algorithm is testing it with new audiences. Below 25% Browse + Suggested in week 1 means the video has been classified as audience-only.
        </p>
      </div>

      <h2 style={h2}>Category 2 — Engagement Metrics</h2>

      <div style={metricCard}>
        <span style={metricLabel}>METRIC 4 — WATCH TIME</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> Total minutes viewers spent watching your content. Measured at channel level and per-video.
        </p>
        <p style={p}>
          <span style={strong}>Why it dominates:</span> Watch time is the single most important metric YouTube optimizes for. The platform's business model depends on maximizing time-on-site. Videos that generate high watch time get distribution; videos that don't, don't.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The distinction that matters:</span> Total watch time grows mechanically with views. Per-view watch time (Average View Duration) is the actual quality signal. A 10K-view video with 2-minute AVD is performing better than a 50K-view video with 30-second AVD on virtually every algorithmic axis.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#4D9EFF' }}>METRIC 5 — AVERAGE VIEW DURATION (AVD) & AVERAGE PERCENTAGE VIEWED (APV)</span>
        <p style={p}>
          <span style={strong}>AVD:</span> The average time (in minutes:seconds) viewers spent watching your video. A 10-minute video with 4:30 AVD has viewers staying through 45% of the content.
        </p>
        <p style={p}>
          <span style={strong}>APV:</span> The same data expressed as a percentage. The 10-minute video with 4:30 AVD has 45% APV.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Which to use when:</span> APV is better for comparing videos of different lengths on the same channel. AVD is better for comparing your video to other videos at the same length. Most strong-performing videos have APV between 35% and 55%. Below 30% APV signals the content lost viewers early; above 60% suggests either exceptional content or video length too short for the topic depth.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#FF8C00' }}>METRIC 6 — AUDIENCE RETENTION CURVE</span>
        <p style={p}>
          <span style={strong}>What it shows:</span> Second-by-second retention plotted as a curve. The single most diagnostic chart in YouTube Studio.
        </p>
        <p style={p}>
          <span style={strong}>What to read:</span> The opening curve (first 30 seconds), the shape across the body, and any sharp drops mid-video. The opening dictates distribution (covered in <Link href="/blog/youtube-hook-formulas-first-30-seconds-2026" style={inlineLink}>our first 30 seconds hook formulas guide</Link>). Mid-video drops reveal specific moments where viewers lost interest — moments you can edit out or restructure on your next video.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Three curve shapes to recognize:</span> Cliff drop (failure, retention falls under 60% in 30s), plateau (acceptable, holds 75-85%), slow drop (winning, stays above 88% through 30s with gradual decline). Detailed retention work is covered in <Link href="/blog/improve-youtube-audience-retention-2026" style={inlineLink}>our complete retention guide</Link>.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#3EA651' }}>METRIC 7 — RETURNING VIEWERS VS NEW VIEWERS</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> The split between viewers who have previously watched your channel and viewers seeing you for the first time.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The strategic read:</span> A healthy growing channel typically has 50-70% returning viewers (loyalty) and 30-50% new viewers (acquisition). Channels with under 20% new viewers are stagnating — they're preaching to the converted. Channels with under 30% returning viewers have audience-loyalty problems — they're getting discovered but not retained.
        </p>
      </div>

      <h2 style={h2}>Category 3 — Conversion Metrics</h2>

      <div style={metricCard}>
        <span style={metricLabel}>METRIC 8 — SUBSCRIBERS GAINED / LOST PER VIDEO</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> Net subscriber change attributed to specific videos. Studio splits this into subscribers gained and lost from that video specifically.
        </p>
        <p style={p}>
          <span style={strong}>Why it matters more than total subscribers:</span> Total subscriber count is a vanity metric in 2026 — the algorithm largely doesn't care about it. Per-video subscriber conversion reveals which content actually persuades viewers to commit to your channel.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The benchmark:</span> A subscribe rate of 1-3% of unique viewers per video is solid for a growing channel. Below 0.5% suggests the content isn't differentiated enough to convert. Above 5% suggests exceptional content-audience fit.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#4D9EFF' }}>METRIC 9 — ENGAGEMENT RATE</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> (Likes + comments + shares) / views, expressed as a percentage.
        </p>
        <p style={p}>
          <span style={strong}>Benchmark in 2026:</span> 3%+ engagement rate beats almost any subscriber count for sponsorship economics (covered in <Link href="/blog/how-to-get-youtube-sponsorships-2026" style={inlineLink}>our sponsorships guide</Link>). For algorithm signaling, 4-6% is strong, 6-10% is exceptional.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The trap:</span> Engagement-bait tactics (forced like-and-subscribe spam, controversy farming) inflate this metric short-term but tank audience trust and returning-viewer rates over time. Optimize for genuine engagement, not raw numbers.
        </p>
      </div>

      <h2 style={h2}>Category 4 — Revenue Metrics</h2>

      <div style={metricCard}>
        <span style={metricLabel}>METRIC 10 — RPM (REVENUE PER MILLE)</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> Your actual earnings per 1,000 views, after YouTube's revenue split. RPM is what hits your bank account.
        </p>
        <p style={p}>
          <span style={strong}>The calculation:</span> RPM = (your earnings / total views) × 1,000. Note: this counts all views, including non-monetized ones.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why creators confuse it with CPM:</span> Many creators say "my CPM is $5" when they mean "my RPM is $5." See the CPM entry below for the difference. Detailed niche RPM benchmarks are in <Link href="/blog/youtube-cpm-rates-2026" style={inlineLink}>our 2026 CPM rates guide</Link>.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#4D9EFF' }}>METRIC 11 — CPM (COST PER MILLE)</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> What advertisers pay per 1,000 monetized impressions, before YouTube's revenue split.
        </p>
        <p style={p}>
          <span style={strong}>The split:</span> YouTube keeps 45% of long-form ad revenue, 55% goes to the creator. So if your CPM is $10, your effective creator RPM from that ad inventory is approximately $5.50.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why it varies wildly:</span> CPM depends on viewer geography, viewer demographics, content category, season, and ad inventory supply-demand. B2B SaaS and finance niches command $50-$120 CPM; gaming and entertainment $10-$25. Same video, same effort, dramatically different revenue.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#FF8C00' }}>METRIC 12 — MONETIZED PLAYBACKS</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> The number of views where an ad was actually served. Not all views are monetized — some viewers use ad blockers, some are children, some content is limited.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The hidden insight:</span> Two videos with the same view count can have wildly different earnings depending on monetized playback percentage. If only 60% of your views see an ad, you're earning roughly 40% less than the same video with 100% monetized playbacks.
        </p>
      </div>

      <h2 style={h2}>Category 5 — Discovery Metrics</h2>

      <div style={metricCard}>
        <span style={metricLabel}>METRIC 13 — BROWSE FEATURES TRAFFIC %</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> The percentage of your video's traffic coming from YouTube's home page, subscription feed, and other browse surfaces.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Why it's strategically important:</span> Browse traffic is the algorithm actively pushing your video to viewers who didn't search for it. High Browse % means broad distribution. For most channels, sustainable growth correlates with rising Browse % over time as the algorithm learns to trust the channel.
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#4D9EFF' }}>METRIC 14 — SUGGESTED VIDEOS TRAFFIC %</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> Traffic from the sidebar of other YouTube videos.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The strategic read:</span> Suggested traffic indicates the algorithm sees your video as a logical continuation from related content. High Suggested % usually correlates with strong session watch time (viewers staying on YouTube longer because of your video).
        </p>
      </div>

      <div style={metricCard}>
        <span style={{ ...metricLabel, color: '#FF8C00' }}>METRIC 15 — YOUTUBE SEARCH TRAFFIC %</span>
        <p style={p}>
          <span style={strong}>What it measures:</span> Traffic from viewers searching for specific terms on YouTube.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>The 2026 nuance:</span> Search remains important for evergreen content (how-to videos, tutorials, reviews), but the 2026 algorithm clusters by viewer intent rather than exact-match keywords. This means your video can rank for search queries that don't include your exact keyword — and miss queries that do.
        </p>
      </div>

      <h2 style={h2}>Metric Pairings That Reveal More Than Single Metrics</h2>

      <p style={p}>
        Single metrics lie. Metric pairs tell the truth. If you're deciding where to focus, we break down <Link href="/blog/youtube-watch-time-vs-ctr-vs-apv-2026" style={inlineLink}>which of these three metrics matters most</Link> and how they chain together in a dedicated guide. The 5 pairings every creator should learn:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>Pairing 1 — CTR + AVD = Quality Signal</h3>
        <p style={p}>
          High CTR + high AVD = the video delivers on its promise. Algorithm pushes hard. High CTR + low AVD = the thumbnail/title overpromised and the content disappointed. Algorithm pulls back fast.
        </p>

        <h3 style={h3}>Pairing 2 — Impressions + Traffic Source = Distribution Health</h3>
        <p style={p}>
          Rising impressions with Browse/Suggested above 50% = active algorithm push. Rising impressions with Direct above 50% = your existing audience finding it, not distribution growth.
        </p>

        <h3 style={h3}>Pairing 3 — Subscribers Gained + Returning Viewers = Loyalty Trajectory</h3>
        <p style={p}>
          Subscribers gained per video tells you who's converting now. Returning viewer % tells you whether they're sticking around 30+ days later. Both should grow together; gains without retention is leaky audience-building.
        </p>

        <h3 style={h3}>Pairing 4 — RPM + Monetized Playbacks = Revenue Diagnostic</h3>
        <p style={p}>
          Falling RPM with stable monetized playbacks = ad rates declining. Stable RPM with falling monetized playbacks = your audience is increasingly on ad blockers or in non-monetizable demographics.
        </p>

        <h3 style={{ ...h3, marginBottom: 0 }}>Pairing 5 — Engagement Rate + Comments Sentiment = Community Health</h3>
        <p style={{ ...p, marginBottom: 0 }}>
          High engagement rate with predominantly positive comments = engaged loyal community. High engagement rate with controversy-driven comments = volatile audience that often leaves as quickly as it arrives.
        </p>
      </div>

      <h2 style={h2}>The Noise Metrics (What to Ignore)</h2>

      <div style={noiseBox}>
        <span style={noiseLabel}>IGNORE — TOTAL VIEWS (LIFETIME)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Lifetime view counts are vanity. They tell you nothing about current channel health. A channel with 50M lifetime views averaging 200 views per new upload is in worse shape than a channel with 200K lifetime views averaging 8K per upload.
        </p>
      </div>

      <div style={noiseBox}>
        <span style={noiseLabel}>IGNORE — SUBSCRIBER COUNT (ABSOLUTE)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The 2026 algorithm largely ignores subscriber count when distributing videos. A 50K-sub channel with consistently high engagement out-distributes a 500K-sub channel with weak retention. Subscriber count matters for sponsorship pricing and social proof — not for algorithm performance.
        </p>
      </div>

      <div style={noiseBox}>
        <span style={noiseLabel}>IGNORE — LIKES AS A STANDALONE METRIC</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Likes correlate with engagement rate but provide no extra information when you already have engagement rate. Looking at likes separately adds noise.
        </p>
      </div>

      <div style={noiseBox}>
        <span style={noiseLabel}>IGNORE — VIDEO LENGTH (AS A METRIC TO OPTIMIZE)</span>
        <p style={{ ...p, marginBottom: 0 }}>
          "Make videos longer" or "make videos shorter" is meaningless advice. Optimize for APV — let video length follow what holds attention.
        </p>
      </div>

      <h2 style={h2}>The Signal Metrics (The 10 You Actually Use)</h2>

      <div style={signalBox}>
        <span style={signalLabel}>THE 10 METRICS TO CHECK WEEKLY</span>
        <p style={p}>
          <span style={strong}>1.</span> Impressions trend (last 28 days)<br/>
          <span style={strong}>2.</span> CTR (per video and 28-day average)<br/>
          <span style={strong}>3.</span> Average View Duration / APV<br/>
          <span style={strong}>4.</span> Retention curve shape (first 30s especially)<br/>
          <span style={strong}>5.</span> Traffic sources (Browse + Suggested combined)<br/>
          <span style={strong}>6.</span> Subscribers gained per video<br/>
          <span style={strong}>7.</span> Returning viewer %<br/>
          <span style={strong}>8.</span> RPM (28-day)<br/>
          <span style={strong}>9.</span> Monetized playback %
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>10.</span> Engagement rate per video
        </p>
      </div>

      <h2 style={h2}>The 7-Question Weekly Audit Framework</h2>

      <p style={p}>
        Once a week, sit with your YouTube Studio dashboard and answer these 7 questions. Honest answers point directly to next-week action items.
      </p>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>Q1.</span> Is my CTR trending up, flat, or down over the last 28 days? Down by more than 1 percentage point = thumbnail and title problem.
        </p>
        <p style={p}>
          <span style={strong}>Q2.</span> Is my APV trending up, flat, or down? Down means the content body is losing viewers — work on retention, structure, or pacing.
        </p>
        <p style={p}>
          <span style={strong}>Q3.</span> Is my Browse + Suggested % above 40% on recent videos? Below means the algorithm is restricting distribution — diagnose with the retention curve.
        </p>
        <p style={p}>
          <span style={strong}>Q4.</span> Is my returning viewer % between 50% and 70%? Outside that range, either acquisition or retention is broken.
        </p>
        <p style={p}>
          <span style={strong}>Q5.</span> Are my subscribers gained per video at least 1% of unique viewers? Below means the channel isn't differentiated enough to convert.
        </p>
        <p style={p}>
          <span style={strong}>Q6.</span> Is my RPM stable, rising, or falling? Falling RPM with stable views means it's time to look at <Link href="/blog/youtube-cpm-rates-2026" style={inlineLink}>niche CPM</Link> and consider category shifts.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Q7.</span> Which single video this week has the strongest retention curve? Study its hook, structure, and topic — that's your channel's current winning formula.
        </p>
      </div>

      <h2 style={h2}>The 2026 Frontier: Cross-Channel Metric Context</h2>

      <p style={p}>
        Every metric covered above is your own channel's data. YouTube Studio (including Ask Studio) doesn't show you how your numbers compare to competitors in your niche. That gap — the lack of category benchmarking inside Studio — is the single biggest blind spot in YouTube's analytics surface in 2026.
      </p>

      <p style={p}>
        Without category context, a 4% CTR can feel terrible (it's bad for tech reviews) or great (it's strong for vlogs). The same number tells opposite stories. The work of cross-referencing your metrics against competitor patterns has to happen outside Studio — and it's the highest-leverage analytical move available to a creator in 2026.
      </p>

      <div style={tipBox}>
        <span style={tipLabel}>HOW NEXORA CLOSES THE GAP</span>
        <p style={{ ...p, marginBottom: 0 }}>
          NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only access). It pulls your real Studio analytics and contextualizes them against your category, your direct competitors, and your audience patterns — answering exactly the questions Ask Studio can't. "Is my 4% CTR good for my niche?" "How does my retention curve compare to top channels in my category?" "Which of my metrics are below the category 75th percentile?" That cross-channel context is what turns raw metrics into actionable strategy.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1.</span> YouTube Studio shows 80+ metrics; only about 20 are signal. The 10 to check weekly: impressions, CTR, AVD/APV, retention curve, traffic sources, subscribers gained, returning viewer %, RPM, monetized playback %, engagement rate.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> The five metric categories — Reach, Engagement, Conversion, Revenue, Discovery — divide the dashboard into functional zones. Most creators over-index on Reach (impressions, views) and under-index on Engagement (AVD, retention curve), which is the inverse of what the algorithm rewards.
        </p>
        <p style={p}>
          <span style={strong}>3.</span> Metric pairs reveal more than single metrics. CTR + AVD is the quality signal. Impressions + Traffic Source is the distribution health signal. RPM + Monetized Playback % is the revenue diagnostic.
        </p>
        <p style={p}>
          <span style={strong}>4.</span> Noise to ignore: total lifetime views, absolute subscriber count, likes as a standalone, and video length as a target. These are vanity metrics or already implied by other signal metrics.
        </p>
        <p style={p}>
          <span style={strong}>5.</span> The 2026 algorithm clusters by viewer intent, which makes traffic source data more strategically important. New uploads should hit 40-50% Browse + Suggested combined within 72 hours to indicate algorithmic distribution.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>6.</span> YouTube Studio's biggest blind spot is category context — how your metrics compare to competitors in your niche. This is the highest-leverage analytical work in 2026, and it has to happen outside Studio.
        </p>
      </div>
    </>
  )
}
import Link from 'next/link'

export default function Post23Content() {
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
  
    const emailBox = {
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
  
    return (
      <>
        <p style={p}>
          Sponsorships are the single highest-leverage revenue stream on YouTube — and they sit near the top of <Link href="/blog/youtube-revenue-streams-ranked-2026" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>all nine YouTube revenue streams ranked</Link>. A creator with 30,000 subscribers in the right niche can earn more from <span style={strong}>one</span> sponsored video than they make from ad revenue in three months. Yet most small creators never pursue brand deals — they assume sponsorships are reserved for channels with 500K+ subs.
        </p>
  
        <p style={p}>
          That assumption is outdated. In 2026, the YouTube sponsorship market has shifted decisively toward small and mid-size creators. Brands have noticed what their data shows: a 25,000-subscriber finance channel often delivers better conversion than a 1M-subscriber lifestyle vlog, at a fraction of the cost.
        </p>
  
        <p style={p}>
          This guide breaks down exactly how to land your first (and tenth) YouTube sponsorship in 2026 — the real subscriber thresholds, current market rates, deal types, where to find brand opportunities, how to write a cold outreach email that gets opened, and the negotiation moves that double your rate.
        </p>
  
        <h2 style={h2}>The 2026 Sponsorship Landscape</h2>
  
        <p style={p}>
          The YouTube sponsorship market exploded in 2025-2026. Tracked sponsored videos grew over 50% year-over-year, generating roughly 19 billion views in the first half of 2025 alone. More importantly, the type of deals being signed has changed.
        </p>
  
        <p style={p}>
          Five years ago, brand deals were dominated by big-budget campaigns with macro creators. Brands paid huge fees, got broad reach, and accepted weak conversion. By 2026, that model has flipped. Most sponsorship budgets now go to <span style={strong}>micro creators (10K-100K subscribers)</span> because the ROI math finally caught up with what creators always knew: trust converts, scale doesn't.
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>What changed in 2026</h3>
          <p style={p}>
            <span style={strong}>Brand Partners Suite:</span> YouTube launched a dedicated discovery and contracting interface for brand-creator deals at the 2026 NewFronts. It consolidates briefs, contracts, and measurement in one place — replacing the email-and-spreadsheet chaos that defined creator marketing for a decade.
          </p>
          <p style={p}>
            <span style={strong}>Open Calls:</span> Brands can now post briefs directly inside YouTube. Creators submit pitches; brands review and pick. This is a discovery channel that didn't exist 18 months ago, and it strongly favors smaller creators who are hungrier and more responsive.
          </p>
          <p style={p}>
            <span style={strong}>Collaborations feature:</span> A single video can now credit up to five channels. This makes co-sponsored deals much easier to execute — multiple small creators can package their audiences together for a single brand campaign.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Shorts sponsorship boom:</span> Roughly 62% of brands planned to increase Shorts sponsorship budgets in 2026, according to recent industry surveys. Shorts have become a separate sponsorship product priced at 25-60% of a long-form integration.
          </p>
        </div>
  
        <h2 style={h2}>When You're Actually Ready (The Real Thresholds)</h2>
  
        <p style={p}>
          Forget "100K subscribers before sponsorships." That advice is wrong in 2026. Here's the actual readiness checklist:
        </p>
  
        <div style={stepCard}>
          <span style={stepNumber}>SUBSCRIBER FLOOR</span>
          <p style={{ ...p, marginBottom: 0 }}>
            You can pursue sponsorships at <span style={strong}>5,000 subscribers</span> if your niche commands premium CPMs (finance, B2B SaaS, software tools, productivity, health). At 1,000-5,000, you can land product-gifted deals — small but useful for building your portfolio.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#4D9EFF' }}>VIEW CONSISTENCY</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Your last 10 videos should average <span style={strong}>at least 1,000 views</span>. Brands evaluate recent average views, not lifetime totals or peak performance. A channel with one viral 500K-view video and a 200-view average is harder to sell than a channel that consistently does 3K per video.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#FF8C00' }}>NICHE CLARITY</span>
          <p style={{ ...p, marginBottom: 0 }}>
            A clear niche is non-negotiable. "Lifestyle" is not a niche. "Productivity tools for remote knowledge workers" is. Brands want to know exactly who they're reaching. The clearer your niche, the higher your rate.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#3EA651' }}>ENGAGEMENT</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Engagement rate (likes + comments / views) of <span style={strong}>3% or higher</span> beats almost any subscriber count. Brands track this religiously now. A 25K channel with 6% engagement outprices a 100K channel with 1% engagement.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#8b5cf6' }}>AUDIENCE GEOGRAPHY</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Most premium brands pay for US, UK, Canada, and Australia audiences. If 70%+ of your viewers are in tier-1 countries, you're sponsorship-ready earlier. International audiences aren't a dealbreaker, but they do affect pricing.
          </p>
        </div>
  
        <h2 style={h2}>The 4 Main Sponsorship Deal Types</h2>
  
        <p style={p}>
          Not all sponsorships are equal. Understanding the format matters because each has different production demands, different rates, and different brand expectations.
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>1. Dedicated video</h3>
          <p style={p}>
            The entire video is built around the brand or product. You write the concept, film the use case, and tell a complete story featuring the sponsor. Highest production effort, highest pay. Typically 2-3x the rate of a standard integration. Brands love these because they own the full narrative.
          </p>
  
          <h3 style={h3}>2. Integrated mention (mid-roll, 60-90 seconds)</h3>
          <p style={p}>
            The most common deal type. You drop a 60-90 second segment about the product into the middle of an organic video. The sponsor gets focused attention without owning the full creative. This is the sweet spot for both creators and brands — it's repeatable, scalable, and respects audience trust.
          </p>
  
          <h3 style={h3}>3. Pre-roll or end-card mention</h3>
          <p style={p}>
            Quick 15-30 second mention at the start or end of the video. Lower production effort, lower rate (typically 30-50% of an integrated mention). Useful for fast-moving brand campaigns or when you have a heavy upload schedule.
          </p>
  
          <h3 style={{ ...h3, marginBottom: 0 }}>4. Sponsored Shorts</h3>
          <p style={{ ...p, marginBottom: 0 }}>
            A standalone Short featuring the brand. Priced at 25-60% of a long-form integration rate. Shorts have higher reach (74% of Shorts views come from non-subscribers, making them YouTube's primary discovery surface), so brands increasingly bundle them with long-form deals to extend campaign reach.
          </p>
        </div>
  
        <h2 style={h2}>How to Calculate Your Rate</h2>
  
        <p style={p}>
          Most creators undercharge because they have no framework for pricing. Here's the actual professional method, used by agencies and verified across the largest brand databases.
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>The CPM formula</h3>
          <p style={p}>
            <span style={strong}>Rate = (Average views ÷ 1,000) × Niche CPM × Format multiplier</span>
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            Pull your average views from the last 10-15 uploads. Apply a niche CPM. Multiply by a format multiplier. The result is your floor rate — never go below it.
          </p>
        </div>
  
        <h3 style={h3}>2026 niche CPM benchmarks</h3>
  
        <table style={dataTable}>
          <thead>
            <tr>
              <th style={th}>Niche</th>
              <th style={th}>CPM Range (USD)</th>
              <th style={th}>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>B2B SaaS / Software</td>
              <td style={td}>$60 – $120</td>
              <td style={td}>High LTV customers, big ad budgets</td>
            </tr>
            <tr>
              <td style={td}>Personal Finance / Investing</td>
              <td style={td}>$50 – $100</td>
              <td style={td}>High-intent buyers, financial products</td>
            </tr>
            <tr>
              <td style={td}>Tech Reviews / Hardware</td>
              <td style={td}>$40 – $80</td>
              <td style={td}>Pre-purchase research audience</td>
            </tr>
            <tr>
              <td style={td}>Productivity / Business</td>
              <td style={td}>$35 – $70</td>
              <td style={td}>Tool buyers, professionals</td>
            </tr>
            <tr>
              <td style={td}>Health / Fitness</td>
              <td style={td}>$25 – $55</td>
              <td style={td}>Strong conversion, supplement market</td>
            </tr>
            <tr>
              <td style={td}>Gaming</td>
              <td style={td}>$20 – $40</td>
              <td style={td}>Younger audience, lower purchase power</td>
            </tr>
            <tr>
              <td style={td}>Lifestyle / Vlogs</td>
              <td style={td}>$15 – $30</td>
              <td style={td}>Broad audience, weaker intent</td>
            </tr>
            <tr>
              <td style={td}>Entertainment</td>
              <td style={td}>$10 – $25</td>
              <td style={td}>Mass reach but low purchase intent</td>
            </tr>
          </tbody>
        </table>
  
        <h3 style={h3}>Concrete example</h3>
  
        <div style={sectionCard}>
          <p style={p}>
            You run a productivity channel with 28,000 subscribers. Your last 12 videos average 8,500 views. You've been asked to do an integrated mid-roll for a note-taking app.
          </p>
          <p style={p}>
            <span style={strong}>The math:</span> 8.5 × $50 (productivity niche) × 1.0 (standard integration) = <span style={strong}>$425</span> floor rate.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            You should ask for <span style={strong}>$1,200-$1,800</span>. Why? You include 90-day exclusivity (no competing apps), one round of revisions, and 12-month usage rights. These add 60-80% to the base rate. Most micro creators leave this money on the table because they don't know to ask for it.
          </p>
        </div>
  
        <h2 style={h2}>Where to Find Sponsorship Opportunities</h2>
  
        <p style={p}>
          There are four reliable channels for landing deals in 2026. Most successful creators run all four in parallel.
        </p>
  
        <div style={stepCard}>
          <span style={stepNumber}>CHANNEL 1 — DIRECT COLD OUTREACH</span>
          <p style={{ ...p, marginBottom: 0 }}>
            The highest-converting channel for small creators. You make a list of 20-30 brands you'd actually use, find the marketing/partnerships email, and pitch. Conversion rate is typically 5-10% if your pitch is good. We'll cover the email template below.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#4D9EFF' }}>CHANNEL 2 — YOUTUBE BRANDCONNECT & OPEN CALLS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            YouTube's native marketplace. With Open Calls launching in 2026, brands post briefs directly and creators submit pitches. Lower competition than Aspire or Grin because it's still new. Set up a profile early.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#FF8C00' }}>CHANNEL 3 — INFLUENCER MARKETPLACES</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Aspire, Grin, GRIN.com, Modash, Influence.co. Brands browse creators, you respond to briefs. Marketplace deals tend to pay 20-40% less than direct outreach because the platforms take a cut, but the volume can be high.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={{ ...stepNumber, color: '#3EA651' }}>CHANNEL 4 — INBOUND</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Brands reach out to you. Requires a clear "for business inquiries" email in your channel description, a public media kit, and consistent content quality. Inbound is the slowest channel to start but compounds heavily — by the time you hit 50K subs in a strong niche, brands will find you.
          </p>
        </div>
  
        <h2 style={h2}>Building a Media Kit That Closes Deals</h2>
  
        <p style={p}>
          A media kit is a 1-3 page PDF (or simple landing page) that brands review when deciding whether to work with you. It's the single most important sales asset for a creator. Most small creators don't have one, which is why they lose to creators with 30% smaller audiences who do.
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>What to include</h3>
          <p style={p}>
            <span style={strong}>Channel summary:</span> Niche in one sentence. Subscriber count. Average views per video over the last 30 days. Total monthly views.
          </p>
          <p style={p}>
            <span style={strong}>Audience demographics:</span> Top 5 countries with %. Age and gender breakdown. Top device (mobile vs desktop vs TV). All of this comes directly from YouTube Analytics.
          </p>
          <p style={p}>
            <span style={strong}>Engagement metrics:</span> Average watch time. CTR. Engagement rate. Subscriber growth trend (last 90 days). Comment-to-view ratio.
          </p>
          <p style={p}>
            <span style={strong}>Content pillars:</span> The 3-5 recurring topic clusters on your channel. Helps brands quickly identify if you fit their target audience.
          </p>
          <p style={p}>
            <span style={strong}>Past partnerships (if any):</span> Logos of past sponsors. If you've done integrations, include performance data — view counts, click-through, conversion if available.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Rate card or "starting at" pricing:</span> Optional. Some creators include rates; others negotiate per deal. If you include rates, frame them as starting points, not ceilings.
          </p>
        </div>
  
        <div style={tipBox}>
          <span style={tipLabel}>FASTER WITH AI</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Pulling all this data manually from YouTube Studio takes hours. NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only access). The AI Coach pulls your real analytics on demand — average views, engagement rate, top countries, subscriber growth, content pillars — and generates the exact data you need for a media kit in minutes. Just ask: "Give me my media kit numbers for the last 30 days." Done.
          </p>
        </div>
  
        <h2 style={h2}>The Cold Outreach Email That Actually Works</h2>
  
        <p style={p}>
          Most creator outreach emails fail because they read like generic templates. Brand managers see hundreds of pitches a month — yours has 6-8 seconds to earn a reply. Here's the structure that consistently outperforms:
        </p>
  
        <div style={emailBox}>
  {`Subject: 28K productivity creator — partnership idea for [Brand]
  
  Hi [First Name],
  
  I run [Channel Name] — a YouTube channel with 28,000 subscribers focused on productivity systems for remote knowledge workers. Last 30 days: 245K views, 4.8% engagement, 71% US/UK/Canada audience.
  
  I've been using [Product] for the last 6 months and it's the cleanest [category] tool I've tried. I'd love to do an integrated 90-second mid-roll in my next video, "[Specific video idea that fits the brand]."
  
  Three reasons this works:
  1. My audience is exactly your ICP — knowledge workers, ages 25-40, tier-1 countries
  2. The video idea naturally features [Product] without feeling forced
  3. My last 3 sponsored videos averaged 4.2% CTR to sponsor (above benchmark)
  
  Media kit: [link]
  Recent integration example: [link]
  
  Open to a 15-minute call this week if there's interest?
  
  Best,
  [Your name]`}
        </div>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>Why this works</h3>
          <p style={p}>
            <span style={strong}>Subject line is specific:</span> Not "partnership opportunity" — it includes the channel size, niche, and brand name. Specificity beats curiosity in B2B outreach.
          </p>
          <p style={p}>
            <span style={strong}>Real numbers in line 1:</span> Views, engagement, geography. Brands need this data to decide if it's worth a meeting. Don't make them ask.
          </p>
          <p style={p}>
            <span style={strong}>Genuine product use:</span> "I've been using [Product] for 6 months" only works if it's true. Brands check. But authentic usage dramatically increases response rate.
          </p>
          <p style={p}>
            <span style={strong}>Specific video idea:</span> Showing you've thought about how the integration would actually work signals professionalism and reduces friction for the brand.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Past performance data:</span> If you have it, include it. Brands buy on conversion potential, not vibes.
          </p>
        </div>
  
        <h2 style={h2}>Negotiation Tactics That Double Your Rate</h2>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>Always counter the first offer</h3>
          <p style={p}>
            Brands almost always offer 50-70% of their actual budget on the first message. Counter at 1.5-2x their offer with a clear justification ("based on my average views and engagement, my standard rate for this format is X"). The deal usually settles 20-30% above their initial offer.
          </p>
  
          <h3 style={h3}>Charge for usage rights separately</h3>
          <p style={p}>
            If a brand wants to use your video clip in paid ads, landing pages, or other marketing, that's a separate deliverable. Charge 30-50% extra for 6-month usage rights, 50-100% extra for 12-month rights. Never give "perpetual" rights — that's worth 2-3x your base rate minimum.
          </p>
  
          <h3 style={h3}>Charge for exclusivity</h3>
          <p style={p}>
            If the brand asks you not to work with competitors for a period, that's lost income. 90-day exclusivity adds $500-$2,000 to a deal depending on your size and category. Don't accept exclusivity for free.
          </p>
  
          <h3 style={h3}>Limit revisions</h3>
          <p style={p}>
            Cap revisions at 2 rounds. More than that should cost extra or be rejected. Some brands try to get unlimited revisions baked into the base rate — this is how a $2,000 deal becomes $400/hour of frustrating rework.
          </p>
  
          <h3 style={{ ...h3, marginBottom: 0 }}>Bundle long-form + Shorts</h3>
          <p style={{ ...p, marginBottom: 0 }}>
            When a brand wants both a long-form integration and a Short, offer a bundle at 10-20% off the combined rate. You earn more (two deliverables instead of one), and the brand feels they got a deal. Win-win.
          </p>
        </div>
  
        <h2 style={h2}>Mistakes That Get You Blacklisted</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1. Missing the FTC disclosure.</span> Sponsored content must be clearly labeled — verbally in the video and in the description. Skipping this is illegal in the US, and it kills audience trust. Every reputable brand requires it now.
          </p>
          <p style={p}>
            <span style={strong}>2. Promoting a product you've never used.</span> Audiences detect this immediately. One bad sponsorship kills the conversion rate of the next ten. Always test the product first.
          </p>
          <p style={p}>
            <span style={strong}>3. Missing deadlines.</span> Brand campaigns have launch dates. If you say you'll deliver by April 15, deliver by April 15. Repeat offenders get quietly removed from agency rosters.
          </p>
          <p style={p}>
            <span style={strong}>4. Inflating metrics.</span> Brands run audience verification through tools like SocialBlade and HypeAuditor. If your stated 50K views average is actually 12K, the deal dies and the brand warns their network.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>5. Talking down a competitor.</span> Don't trash competing products in sponsored content unless explicitly briefed. It looks unprofessional, audiences smell it, and other brands in the category will refuse to work with you afterward.
          </p>
        </div>
  
        <h2 style={h2}>The 90-Day Plan to Land Your First Sponsorship</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Days 1-15:</span> Build your media kit. Pull last-30-day analytics. Define your niche in one sentence. Write a 1-page PDF or Notion page. Add a "for business inquiries" email to your channel description.
          </p>
          <p style={p}>
            <span style={strong}>Days 16-30:</span> Make a list of 25 brands you genuinely use or could authentically endorse. Find their marketing email or Partnerships contact (LinkedIn, RocketReach, Hunter, or just emailing partnerships@brand.com).
          </p>
          <p style={p}>
            <span style={strong}>Days 31-60:</span> Send 3-5 personalized cold emails per week. Track replies in a spreadsheet. Iterate on subject lines. Set up profiles on YouTube BrandConnect and at least one marketplace.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Days 61-90:</span> Follow up with non-responders once. Convert any inbound interest into actual deals. By day 90, most creators in a clear niche running this process have closed at least one paid sponsorship — even at the 5K-25K subscriber range.
          </p>
        </div>
  
        <h2 style={h2}>Key Takeaways</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1.</span> The 100K-subscriber threshold is a myth. In the right niche (B2B SaaS, finance, productivity, tech), creators can land paid sponsorships at 5,000-10,000 subscribers in 2026.
          </p>
          <p style={p}>
            <span style={strong}>2.</span> Niche beats size. A 25K finance channel will out-earn a 250K lifestyle channel. Brand budgets follow audience purchase intent, not raw subscriber counts.
          </p>
          <p style={p}>
            <span style={strong}>3.</span> Use the CPM formula to price: (average views ÷ 1,000) × niche CPM × format multiplier. This gives you a defensible floor rate in negotiations.
          </p>
          <p style={p}>
            <span style={strong}>4.</span> Direct cold outreach to brands you actually use is the highest-converting channel for small creators — 5-10% reply rate when the email is specific and personalized.
          </p>
          <p style={p}>
            <span style={strong}>5.</span> A media kit with real analytics (views, engagement, demographics, geography) doubles your close rate. Most small creators don't have one — being the 1 in 10 who does is a massive advantage.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>6.</span> Always counter the first offer, charge separately for usage rights and exclusivity, and limit revisions. These four moves alone can double the value of your deals without changing your audience or content.
          </p>
        </div>
      </>
    )
  }
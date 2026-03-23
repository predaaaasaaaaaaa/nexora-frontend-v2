export default function Post6Content() {
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
  
    const toolCard = {
      background: '#161616',
      border: '1px solid #222',
      borderRadius: 10,
      padding: '20px 24px',
      marginBottom: 16,
    }
  
    const toolName = {
      fontSize: 16,
      fontWeight: 700,
      color: '#fff',
      marginBottom: 4,
    }
  
    const toolTag = {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: 0.3,
      marginBottom: 10,
      display: 'block',
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
  
    return (
      <>
        <p style={p}>
          Every successful YouTuber studies their competition. Not to copy them — but to understand what's working in their niche, find gaps nobody is filling, and learn from experiments other creators are already running.
        </p>
  
        <p style={p}>
          Competitor analysis is one of the highest-leverage activities you can do for your channel. A single insight — like noticing a competitor's tutorial format gets 5x more views than their vlogs — can reshape your entire content strategy.
        </p>
  
        <p style={p}>
          In this guide, we'll walk through how to find the right competitors to analyze, what to look for, which free tools to use, and how AI is making this process faster and more insightful.
        </p>
  
        <h2 style={h2}>Step 1: Identify the Right Competitors</h2>
  
        <p style={p}>
          Most creators make the mistake of comparing themselves to the biggest channels in their niche. If you have 2,000 subscribers, studying MrBeast's strategy won't help you — his content operates under completely different rules (massive budgets, teams of 50+, brand deals driving production).
        </p>
  
        <p style={p}>
          Instead, focus on three types of competitors:
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>Peer competitors (most important)</h3>
          <p style={p}>
            Channels in your niche with a similar subscriber count — within 2-3x of yours. If you have 5K subs, study channels with 2K-15K subs. These channels face the same algorithmic challenges you do, target similar audiences, and their successes are actually replicable at your scale.
          </p>
  
          <h3 style={h3}>Aspirational competitors</h3>
          <p style={p}>
            Channels 5-10x your size that you want to grow into. A 50K channel if you're at 5K. Study their content strategy broadly — what formats do they use, how often do they upload, what's their thumbnail style — but don't try to match their production quality or topic scope yet.
          </p>
  
          <h3 style={h3}>Indirect competitors</h3>
          <p style={{ ...p, marginBottom: 0 }}>
            Channels outside your exact niche but competing for the same audience's attention. If you make coding tutorials, a tech review channel might be an indirect competitor because the same viewers watch both. These channels can reveal content angles you haven't considered.
          </p>
        </div>
  
        <div style={tipBox}>
          <span style={tipLabel}>HOW TO FIND THEM</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Search your main topic on YouTube and filter by "This month" or "This week." The channels showing up in search results for your keywords are your competitors. Also check the "Channels" tab in search results. Another method: look at who appears in the "Suggested" sidebar when your videos play — YouTube already considers those channels related to yours.
          </p>
        </div>
  
        <h2 style={h2}>Step 2: What to Analyze (The Competitor Audit Framework)</h2>
  
        <p style={p}>
          Once you've identified 3-5 competitors, here's exactly what to look at for each one. This framework works whether you're doing it manually or using tools.
        </p>
  
        <div style={stepCard}>
          <span style={stepNumber}>CONTENT STRATEGY</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Look at their last 20-30 videos. What topics do they cover? What formats do they use (tutorials, lists, reviews, vlogs, Shorts)? How long are their videos? How often do they upload? Are they consistent or sporadic? You're looking for patterns, not individual videos. If 70% of their content is tutorials and 30% is vlogs, that tells you their audience prefers educational content.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>OUTLIER DETECTION</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Find their videos that got significantly more views than their channel average. If a channel typically gets 5K views per video but one got 50K, that's a 10x outlier. Something about that video — the topic, the title, the thumbnail, the timing — resonated unusually well. This is the most valuable data point in competitor analysis. Outlier topics often indicate untapped demand in your niche.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>THUMBNAIL & TITLE PATTERNS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Screenshot their top 10 thumbnails. What visual patterns do you see? Do they use faces? Bold text? Specific color schemes? Contrast? Do the same for titles — are they using numbers, questions, how-to format, curiosity gaps? Compare their best-performing titles with their worst-performing ones. The difference reveals what packaging works for your shared audience.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>ENGAGEMENT SIGNALS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Check the like-to-view ratio and comment count on their videos. A video with 10K views and 500 comments is driving more engagement than one with 50K views and 100 comments. High-comment videos indicate topics that provoke discussion — these are goldmine topics for building community on your own channel.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>UPLOAD FREQUENCY & TIMING</span>
          <p style={{ ...p, marginBottom: 0 }}>
            When do they upload? How many videos per week? Is there a pattern (e.g., every Tuesday and Friday)? If a competitor uploads twice a week and is growing steadily, that cadence is sustainable in your niche. If they upload daily but their views are declining, that might signal audience fatigue in your space.
          </p>
        </div>
  
        <div style={stepCard}>
          <span style={stepNumber}>AUDIENCE OVERLAP</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Read their comments. What are viewers asking for? What are they praising? What are they complaining about? Viewer complaints on competitor channels are direct opportunities for you — if people keep asking a competitor for a specific type of content they're not making, you can make it.
          </p>
        </div>
  
        <h2 style={h2}>Step 3: Free Tools for Competitor Analysis</h2>
  
        <div style={toolCard}>
          <div style={toolName}>YouTube Search + Manual Browsing</div>
          <div style={{ ...toolTag, color: '#3EA651' }}>FREE — NO TOOL NEEDED</div>
          <p style={{ ...p, marginBottom: 0 }}>
            The simplest and most underrated method. Go to a competitor's channel, click "Videos" and sort by "Most Popular." This instantly shows you their all-time best performers. Then switch to "Recently Uploaded" and manually note view counts to spot recent outliers. Check their Community tab for polls and questions — competitors often reveal their strategy through community posts. This takes 15-20 minutes per competitor but gives you solid qualitative insights.
          </p>
        </div>
  
        <div style={toolCard}>
          <div style={toolName}>Social Blade</div>
          <div style={{ ...toolTag, color: '#3EA651' }}>FREE — WEB TOOL</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Enter any channel name and get subscriber count history, estimated monthly views, estimated earnings, upload frequency, and growth grade. The most useful feature for competitor analysis is the growth trend — is the channel gaining or losing momentum? Compare your growth rate to theirs. If they're growing faster with similar content, study what's different. Social Blade data is estimated, not exact, but the trends are directionally useful.
          </p>
        </div>
  
        <div style={toolCard}>
          <div style={toolName}>vidIQ Browser Extension (Free Tier)</div>
          <div style={{ ...toolTag, color: '#3EA651' }}>FREE — CHROME EXTENSION</div>
          <p style={{ ...p, marginBottom: 0 }}>
            Install the vidIQ Chrome extension and you'll see extra data overlaid on every YouTube video page: views per hour (velocity), engagement rate, tags used, SEO score, and more. This is incredibly useful for competitor analysis because you can see exactly which tags a competitor is ranking for, how fast their videos gain views relative to their channel norm, and what keywords they're targeting. The free tier has limitations but the basic overlay works well.
          </p>
        </div>
  
        <div style={toolCard}>
          <div style={toolName}>TubeBuddy Competitor Scorecard</div>
          <div style={{ ...toolTag, color: '#FF8C00' }}>PAID — BROWSER EXTENSION</div>
          <p style={{ ...p, marginBottom: 0 }}>
            TubeBuddy's Competitor Scorecard (Legend plan) lets you compare your channel against up to 10 competitors across views, subscriber growth, uploads, comments, likes, and engagement over specific time periods. It's the most structured competitor comparison tool available, but it's locked behind the highest pricing tier. Useful if you want systematic tracking over time rather than one-off analysis.
          </p>
        </div>
  
        <div style={toolCard}>
          <div style={toolName}>Google Trends (YouTube Filter)</div>
          <div style={{ ...toolTag, color: '#3EA651' }}>FREE — WEB TOOL</div>
          <p style={{ ...p, marginBottom: 0 }}>
            While not a direct competitor analysis tool, Google Trends with the YouTube Search filter shows you whether topics your competitors cover are growing or declining in search demand. If a competitor is getting lots of views on a topic with declining search interest, those views are likely from browse/suggested — not search. If the topic is rising, there's room for you to capture search traffic too.
          </p>
        </div>
  
        <h2 style={h2}>Step 4: AI-Powered Competitor Analysis</h2>
  
        <p style={p}>
          Manual competitor analysis works but takes 1-2 hours per competitor when done thoroughly. AI tools can compress this significantly by automatically pulling data and identifying patterns.
        </p>
  
        <div style={{
          ...sectionCard,
          border: '1px solid rgba(255,0,0,0.3)',
          background: 'rgba(255,0,0,0.03)',
        }}>
          <h3 style={{ ...h3, marginTop: 0 }}>How NEXORA Handles Competitor Analysis</h3>
          <p style={p}>
            NEXORA takes a conversational approach to competitor analysis. Instead of navigating dashboards, you simply tell the AI Coach which channel you want to analyze — using their @handle or channel name.
          </p>
          <p style={p}>
            Ask "analyze @channelname" and the AI fetches their public data and provides a strategic breakdown: their content patterns, top-performing videos, upload frequency, engagement metrics, and what you can learn from their strategy relative to your own channel.
          </p>
          <p style={p}>
            Ask "compare my channel with @channelname" and NEXORA runs a side-by-side comparison using both their public data and your private analytics. It highlights where you're outperforming them, where they have an edge, and specific actions you can take to close the gap.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The key advantage is context. When NEXORA analyzes a competitor, it already knows your channel — your content style, your audience, your performance history. So instead of generic observations like "this channel gets 10K views per video," it gives you contextual insights like "this channel's tutorial format gets 3x more views than your tutorials — their titles are more specific and they use numbered lists."
          </p>
        </div>
  
        <h2 style={h2}>Step 5: Turn Insights Into Action</h2>
  
        <p style={p}>
          Analysis without action is just entertainment. Here's how to convert competitor insights into actual growth for your channel.
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>Action 1: Build an outlier-inspired content list</h3>
          <p style={p}>
            From each competitor, identify 2-3 outlier videos. For each one, write down the topic and your own unique angle on it. You're not copying — you're covering proven-demand topics with your own perspective, expertise, and style. If a competitor's "5 Mistakes Beginners Make in [niche]" got 10x their average views, that topic has validated demand. Make your version with different mistakes, more depth, or a fresh take.
          </p>
  
          <h3 style={h3}>Action 2: Adopt proven packaging patterns</h3>
          <p style={p}>
            If all top-performing videos in your niche use face close-ups with bold text overlays in their thumbnails, and your thumbnails are landscape screenshots with no text, you have a clear optimization opportunity. This isn't about copying — it's about understanding what your shared audience responds to visually.
          </p>
  
          <h3 style={h3}>Action 3: Fill the gaps</h3>
          <p style={p}>
            The most valuable competitor insight is what they're NOT doing. If every competitor in your niche makes 15-minute videos but nobody makes Shorts on those topics, that's a gap. If everyone covers beginner content but nobody serves intermediate-advanced creators, that's a gap. Gaps are your differentiation.
          </p>
  
          <h3 style={h3}>Action 4: Set realistic benchmarks</h3>
          <p style={{ ...p, marginBottom: 0 }}>
            Compare your metrics against peer competitors (similar size channels), not aspirational ones. If peer channels average 5% CTR and you're at 3%, you know your thumbnails and titles need work. If they average 500 views per video and you're at 300, you're not far off. Realistic benchmarks prevent both complacency and discouragement.
          </p>
        </div>
  
        <h2 style={h2}>How Often to Run Competitor Analysis</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Monthly (30 minutes):</span> Quick check on 3-5 competitors. What did they upload? Any outlier videos? Any changes in their strategy (new format, different upload schedule, rebrand)? Note any insights in your content ideas list.
          </p>
          <p style={p}>
            <span style={strong}>Quarterly (1-2 hours):</span> Deep analysis. Update your competitor list (channels rise and fall — someone new might have emerged in your niche). Do the full audit framework on each one. Update your content strategy based on what you find.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>When you plateau:</span> If your channel growth stalls, a competitor deep-dive is often the fastest way to find the unlock. Something in your niche has changed — competitors can show you what.
          </p>
        </div>
  
        <h2 style={h2}>Common Competitor Analysis Mistakes</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Copying instead of learning.</span> The goal is never to recreate someone else's video. It's to understand demand signals and audience preferences. Your unique voice and perspective is what builds YOUR audience.
          </p>
          <p style={p}>
            <span style={strong}>Only studying channels bigger than yours.</span> A 500K-sub channel's strategy won't apply to your 5K-sub channel. Their algorithm dynamics, audience size, and resources are completely different. Peer competitors give you actionable insights.
          </p>
          <p style={p}>
            <span style={strong}>Analyzing too many competitors.</span> You don't need to track 20 channels. Pick 3-5 and know them well. Quality of analysis beats quantity of competitors every time.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Ignoring what's NOT working.</span> Competitor failures are as valuable as their successes. If a competitor tried a new format and it bombed, that's information. If they covered a topic and got unusually low views, that topic might have less demand than it seems.
          </p>
        </div>
  
        <h2 style={h2}>Key Takeaways</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1.</span> Focus on peer competitors (similar subscriber count) — their successes are the most replicable for your channel.
          </p>
          <p style={p}>
            <span style={strong}>2.</span> Outlier detection is the highest-value analysis you can do. Find videos that dramatically outperformed a competitor's average and understand why.
          </p>
          <p style={p}>
            <span style={strong}>3.</span> Use free tools (Social Blade, vidIQ free tier, manual browsing) for solid analysis without spending money.
          </p>
          <p style={p}>
            <span style={strong}>4.</span> AI tools like NEXORA can run contextual competitor analysis in seconds by comparing competitor data against your own channel metrics.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>5.</span> Always convert insights into action — outlier-inspired content, proven packaging patterns, gap-filling, and realistic benchmarks.
          </p>
        </div>
      </>
    )
  }
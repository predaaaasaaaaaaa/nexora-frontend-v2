export default function Post5Content() {
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
  
    const methodCard = {
      background: '#161616',
      border: '1px solid #222',
      borderRadius: 10,
      padding: '20px 24px',
      marginBottom: 16,
    }
  
    const methodLabel = {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 1.5,
      marginBottom: 8,
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
          Every creator hits the wall. You sit down to plan your next video and… nothing. The ideas feel stale, the topics feel overdone, and you can't figure out what your audience actually wants to watch next.
        </p>
  
        <p style={p}>
          Content ideation is one of the biggest time sinks for YouTubers. Research from creator surveys consistently shows that planning and research consume as much time as filming and editing combined. Many creators spend 4-6 hours per video just on topic research, trend analysis, and title brainstorming.
        </p>
  
        <p style={p}>
          In 2026, AI tools are changing this equation. Instead of guessing what might work, creators can now use AI to analyze what's actually performing — both on their channel and across their niche — and generate ideas backed by real data. Here's how.
        </p>
  
        <h2 style={h2}>Why Most Content Ideas Fail</h2>
  
        <p style={p}>
          Before we talk about generating better ideas, it helps to understand why most video ideas underperform. The problem usually falls into one of three categories:
        </p>
  
        <div style={sectionCard}>
          <h3 style={{ ...h3, marginTop: 0 }}>No demand</h3>
          <p style={p}>
            The creator is passionate about the topic, but nobody is searching for it and the algorithm has no reason to recommend it. This is the most common mistake — creating content you want to make rather than content your audience wants to watch. Passion matters, but demand determines distribution.
          </p>
  
          <h3 style={h3}>Too competitive</h3>
          <p style={p}>
            The topic is popular, but massive channels already dominate the search results. A 1,000-subscriber channel creating a "Best Laptops 2026" video is competing against channels with millions of subscribers and production budgets. The video might be great, but it won't surface.
          </p>
  
          <h3 style={h3}>Wrong format for the topic</h3>
          <p style={{ ...p, marginBottom: 0 }}>
            Some topics work better as Shorts, some as 15-minute deep dives, some as live streams. A complex tutorial crammed into 60 seconds won't satisfy the viewer. A simple tip stretched to 20 minutes will lose them. Matching format to topic is critical and often overlooked.
          </p>
        </div>
  
        <h2 style={h2}>Method 1: Mine Your Own Analytics</h2>
  
        <p style={p}>
          The best source of content ideas is your existing data. Your audience has already told you what they want — through their watch time, clicks, and engagement.
        </p>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#4D9EFF' }}>YOUR TOP PERFORMERS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Look at your top 10 videos by views in the last 6 months. What topics did they cover? Can you make a follow-up, a deeper dive, an updated version, or a different angle on the same topic? If your "5 Editing Tips for Beginners" got 50K views, there's clear demand for "5 Advanced Editing Tips" or "Editing Tips for Shorts" or "Editing Mistakes Beginners Make."
          </p>
        </div>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#FF8C00' }}>YOUR HIDDEN GEMS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Find videos with high engagement rate (likes + comments relative to views) but low view counts. These are topics your audience loved but YouTube didn't distribute widely. The content resonated — it just needs better packaging. Consider remaking the video with a stronger thumbnail and title, or covering the topic from a fresh angle.
          </p>
        </div>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#3EA651' }}>YOUR SEARCH TERMS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            YouTube Studio → Analytics → Traffic Sources → YouTube Search → "Search Terms" shows exactly what people typed to find your videos. This is gold. If viewers are finding your channel through searches you haven't specifically targeted, make a dedicated video for that search term. You already rank for it partially — a focused video could dominate it.
          </p>
        </div>
  
        <h2 style={h2}>Method 2: Competitor Research</h2>
  
        <p style={p}>
          Your competitors are running experiments for you every time they upload. Learn from their results.
        </p>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#4D9EFF' }}>FIND OUTLIER VIDEOS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Look at channels similar in size to yours. Find videos that got significantly more views than their channel average — these are "outliers" that hit a nerve. The topic had high demand, the packaging was effective, or the timing was perfect. You don't need to copy the video — analyze why it worked and apply those principles to your own content.
          </p>
        </div>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#FF8C00' }}>CHECK THEIR COMMENTS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Read the comments on competitor videos in your niche. Viewers constantly request specific content in comments — "can you make a video about X?" or "I wish someone would explain Y." These are direct content requests from your target audience. If multiple people are asking for the same thing, that's a validated idea.
          </p>
        </div>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#3EA651' }}>FIND GAPS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            What topics in your niche are underserved? Maybe every competitor covers the basics but nobody goes deep. Maybe everyone makes long-form but nobody does Shorts on those topics. Maybe the existing videos are outdated. Gaps = opportunity.
          </p>
        </div>
  
        <h2 style={h2}>Method 3: Keyword and Trend Research</h2>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#4D9EFF' }}>YOUTUBE AUTOCOMPLETE</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Type your niche keyword into YouTube's search bar and look at the autocomplete suggestions. These are real queries from real users, ranked by popularity. For example, typing "how to edit videos" might suggest "how to edit videos on iPhone," "how to edit videos for YouTube," "how to edit videos with CapCut." Each suggestion is a potential video idea with proven search demand.
          </p>
        </div>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#FF8C00' }}>GOOGLE TRENDS (YOUTUBE FILTER)</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Go to Google Trends, enter a topic, and filter by "YouTube Search." This shows you whether interest is rising, stable, or declining — and when seasonal peaks happen. A rising trend means increasing demand. Combine this with autocomplete to find specific angles on trending topics.
          </p>
        </div>
  
        <div style={methodCard}>
          <span style={{ ...methodLabel, color: '#3EA651' }}>ANSWERTHEPUBLIC</span>
          <p style={{ ...p, marginBottom: 0 }}>
            This free tool shows you the questions people ask about any topic. Enter your niche keyword and it generates hundreds of "how," "what," "why," "when," and "which" questions. Each question is a potential video idea — especially the "how to" and "why" questions, which tend to perform well on YouTube.
          </p>
        </div>
  
        <h2 style={h2}>Method 4: AI-Powered Content Ideas</h2>
  
        <p style={p}>
          The methods above all work, but they're time-consuming. You need to manually pull data from YouTube Studio, browse competitor channels, check trends, and then synthesize everything into actionable ideas. AI tools can compress this process significantly.
        </p>
  
        <div style={{
          ...sectionCard,
          border: '1px solid rgba(255,0,0,0.3)',
          background: 'rgba(255,0,0,0.03)',
        }}>
          <h3 style={{ ...h3, marginTop: 0 }}>How NEXORA Generates Content Ideas</h3>
          <p style={p}>
            NEXORA's Content Ideas feature takes a different approach from generic AI idea generators. Instead of producing random suggestions based on your niche keyword, it analyzes your actual channel data first.
          </p>
          <p style={p}>
            Here's what happens when you generate ideas in NEXORA: the AI looks at your top-performing videos and identifies what topics and formats resonate with your audience. It checks your engagement patterns to understand what type of content drives comments, likes, and shares. It considers your niche and current trends. Then it generates video ideas that are specifically tailored to what's likely to work for YOUR channel.
          </p>
          <p style={p}>
            Each generated idea includes the video title suggestion, an explanation of why the AI thinks it would work for your channel (backed by your data), a difficulty rating (easy, medium, hard based on production complexity), estimated viral potential, suggested video duration, and relevant hashtags.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The difference between this and asking ChatGPT for video ideas is context. ChatGPT doesn't know your channel. It doesn't know that your tutorials get 5x more views than your vlogs, or that your audience engages more with "versus" style content, or that your Shorts underperform your long-form. NEXORA knows all of this because it has your real data.
          </p>
        </div>
  
        <h2 style={h2}>Building a Content Pipeline (Never Run Out of Ideas Again)</h2>
  
        <p style={p}>
          The real secret to never running out of content ideas isn't finding one great tool — it's building a system that continuously feeds you validated ideas. Here's a simple pipeline that works:
        </p>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Step 1: Capture constantly.</span> Keep a running list (Google Sheets, Notion, even a notes app) where you dump every potential video idea the moment it comes to you. Comments from viewers, trending topics you notice, questions people ask you, things you see competitors doing — everything goes in the list. Don't judge ideas at this stage.
          </p>
          <p style={p}>
            <span style={strong}>Step 2: Validate weekly.</span> Once a week, spend 30 minutes reviewing your idea list. For each idea, quickly check: is there search demand (YouTube autocomplete)? Is the competition manageable? Does it fit a format my audience engages with? Score each idea as high, medium, or low potential.
          </p>
          <p style={p}>
            <span style={strong}>Step 3: Plan monthly.</span> At the start of each month, pick your top 4-8 ideas (depending on upload frequency) and slot them into your content calendar. Mix formats — some search-driven videos, some trend-based, some community-requested.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Step 4: Review and iterate.</span> After each video, check its performance against expectations. Did the "high potential" idea actually perform well? Update your scoring criteria based on what the data tells you. Over time, your ability to predict which ideas will work improves dramatically.
          </p>
        </div>
  
        <div style={tipBox}>
          <span style={tipLabel}>AI SHORTCUT</span>
          <p style={{ ...p, marginBottom: 0 }}>
            If you use NEXORA, steps 2 and 3 get compressed. Instead of manually validating each idea, you can ask the AI Coach: "I have these 5 video ideas — which one should I make next?" The AI will rank them based on your channel data, current trends, and historical performance patterns. It doesn't replace your creative instinct, but it adds a data layer to your decision-making.
          </p>
        </div>
  
        <h2 style={h2}>What Makes a Great YouTube Video Idea</h2>
  
        <p style={p}>
          After analyzing thousands of videos across niches, the ideas that consistently perform share these traits:
        </p>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Clear value proposition in the title.</span> The viewer knows exactly what they'll get. "How to Edit Videos 3x Faster" is better than "My Editing Workflow." The first promises a specific outcome. The second is a diary entry.
          </p>
          <p style={p}>
            <span style={strong}>Targets a specific audience.</span> "Python Tutorial for Complete Beginners" will outperform "Python Tutorial" because the viewer immediately knows if it's for them.
          </p>
          <p style={p}>
            <span style={strong}>Has a built-in curiosity gap.</span> The best ideas make people think "I need to know this." Numbers ("7 mistakes"), contrasts ("What $50 vs $5000 looks like"), and challenges ("I tried X for 30 days") naturally create curiosity.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Is searchable AND browsable.</span> The best ideas work both for people searching (they use keywords people type) AND for people browsing (the thumbnail and title are interesting enough to click on the homepage). If an idea only works for search, it caps your views. If it only works for browse, it has no long-tail.
          </p>
        </div>
  
        <h2 style={h2}>Key Takeaways</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1.</span> Your best content ideas come from your own data — mine your analytics for top performers, hidden gems, and search terms.
          </p>
          <p style={p}>
            <span style={strong}>2.</span> Competitor outlier analysis shows you what topics have proven demand in your niche.
          </p>
          <p style={p}>
            <span style={strong}>3.</span> Use YouTube autocomplete and Google Trends to validate demand before committing to a video.
          </p>
          <p style={p}>
            <span style={strong}>4.</span> AI tools like NEXORA can generate ideas tailored to your channel using your real performance data — not generic suggestions.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>5.</span> Build a content pipeline system: capture ideas constantly, validate weekly, plan monthly, review after each video.
          </p>
        </div>
      </>
    )
  }
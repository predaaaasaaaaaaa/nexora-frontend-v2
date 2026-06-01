import Link from 'next/link'

export default function Post16Content() {
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
  
    const formulaCard = {
      background: '#161616',
      border: '1px solid #222',
      borderRadius: 10,
      padding: '24px 28px',
      marginBottom: 24,
    }
  
    const formulaHeader = {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 16,
    }
  
    const formulaNumber = {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'rgba(255,0,0,0.15)',
      color: '#FF0000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      fontWeight: 800,
      flexShrink: 0,
    }
  
    const formulaName = {
      fontSize: 20,
      fontWeight: 700,
      color: '#fff',
    }
  
    const exampleBox = {
      background: '#1a1a1a',
      borderLeft: '3px solid #FF0000',
      borderRadius: '0 8px 8px 0',
      padding: '12px 18px',
      marginTop: 12,
      marginBottom: 12,
    }
  
    const exampleText = {
      fontSize: 15,
      color: '#fff',
      fontWeight: 600,
      fontStyle: 'italic',
    }
  
    const sectionCard = {
      background: '#161616',
      border: '1px solid #222',
      borderRadius: 10,
      padding: '24px 28px',
      marginBottom: 24,
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
  
    const ruleCard = {
      background: '#1a1a1a',
      border: '1px solid #222',
      borderRadius: 8,
      padding: '14px 18px',
      marginBottom: 10,
    }
  
    return (
      <>
        <p style={p}>
          Your title is responsible for roughly 50% of your video's click-through rate. The thumbnail handles the other 50%. Together, they decide whether your video lives or dies — no matter how good the content is. If CTR is still a fuzzy number to you, start with <Link href="/blog/youtube-impressions-ctr-explained-2026" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>how impressions and CTR actually work</Link>.
        </p>
  
        <p style={p}>
          But here's what most creators get wrong: they write titles based on instinct instead of proven formulas. The highest-performing YouTubers don't brainstorm titles from scratch — they apply structural patterns that consistently trigger clicks, then customize those patterns for their specific topic.
        </p>
  
        <p style={p}>
          This guide breaks down the 10 title formulas that consistently outperform generic titles in 2026 — with real examples, the psychology behind why they work, and rules for combining them with SEO. Titles are one half of the metadata system — <Link href="/blog/youtube-description-seo-2026" style={{ color: '#FF4444', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid rgba(255,68,68,0.3)' }}>the companion description SEO guide</Link> covers what to do in the 5,000-character box below the title.
        </p>
  
        <h2 style={h2}>The Rules Before the Formulas</h2>
  
        <p style={p}>
          Before applying any formula, every title should follow these technical rules:
        </p>
  
        <div style={ruleCard}>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>40-65 characters maximum.</span> Anything longer gets truncated on mobile, cutting off the most important part. Check how your title looks on a phone screen before publishing.
          </p>
        </div>
  
        <div style={ruleCard}>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Front-load your keyword in the first 5 words.</span> YouTube weights early-title keywords more heavily for search ranking. "How to Edit Videos Faster" is better than "The Secret to Faster Video Editing" for SEO.
          </p>
        </div>
  
        <div style={ruleCard}>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Don't duplicate your thumbnail text.</span> Your title and thumbnail should work as a team, not say the same thing twice. If your thumbnail says "GAME CHANGER," your title should provide context — not repeat "Game Changer."
          </p>
        </div>
  
        <div style={ruleCard}>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Write the title before the script.</span> If you can't write a compelling title, the video idea might not be clickable enough. A strong title also focuses your script — you know exactly what promise to deliver.
          </p>
        </div>
  
        <div style={ruleCard}>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Write 5-10 variations, pick the strongest.</span> Never commit to your first draft. Professional creators write multiple options using different formulas and select the one with the strongest emotional pull.
          </p>
        </div>
  
        <h2 style={h2}>The 10 Title Formulas</h2>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>1</div>
            <div style={formulaName}>The Specific Number</div>
          </div>
          <p style={p}>
            Numbers signal structure, credibility, and predictability. Viewers know exactly what they're getting. Specific numbers outperform rounded ones because they feel more researched and authentic. Odd numbers (7, 9, 13) tend to slightly outperform even numbers in testing.
          </p>
          <div style={exampleBox}><div style={exampleText}>"7 Editing Tricks That Made My Videos 3x Better"</div></div>
          <div style={exampleBox}><div style={exampleText}>"I Tested 15 AI Tools — Only 3 Are Worth It"</div></div>
          <div style={exampleBox}><div style={exampleText}>"$0 to $10,000/Month on YouTube: The 5-Step System"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Numbers set clear expectations, signal value density, and make the content feel actionable. "Some tips" feels vague. "7 tips" feels concrete.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>2</div>
            <div style={formulaName}>The Curiosity Gap</div>
          </div>
          <p style={p}>
            Create an information void that the viewer can only fill by watching. The brain physically cannot resist an open loop — it creates a psychological itch that demands resolution. The key is revealing enough to create interest but withholding enough to require the click.
          </p>
          <div style={exampleBox}><div style={exampleText}>"The YouTube Feature Nobody Is Using (But Should)"</div></div>
          <div style={exampleBox}><div style={exampleText}>"I Found Out Why My Videos Stopped Getting Views"</div></div>
          <div style={exampleBox}><div style={exampleText}>"This One Change Doubled My Watch Time Overnight"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Curiosity is one of the strongest psychological drivers of human behavior. An open question demands an answer. But be careful — your video must actually close the loop, or you'll trigger YouTube's anti-clickbait quality CTR system.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>3</div>
            <div style={formulaName}>The Challenge / "I Tried"</div>
          </div>
          <p style={p}>
            Personal challenges and experiments are irresistible because viewers get to experience the result without the effort. The "I Tested/Tried" framing also adds credibility — someone actually did it, they're not just theorizing.
          </p>
          <div style={exampleBox}><div style={exampleText}>"I Posted YouTube Shorts Every Day for 90 Days — Here's What Happened"</div></div>
          <div style={exampleBox}><div style={exampleText}>"I Tried Every Free Editing Software So You Don't Have To"</div></div>
          <div style={exampleBox}><div style={exampleText}>"I Followed YouTube's Own Advice for 30 Days"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Combines personal story (relatability) with curiosity (what happened?) and implied value (so you don't have to). The time element (30 days, 90 days) adds commitment credibility.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>4</div>
            <div style={formulaName}>The Transformation / Before-After</div>
          </div>
          <p style={p}>
            Show a clear before-and-after state. Humans are drawn to transformation because it implies a system they could apply to themselves. The more specific the transformation, the more compelling the click.
          </p>
          <div style={exampleBox}><div style={exampleText}>"How I Went From 0 to 10K Subscribers in 6 Months"</div></div>
          <div style={exampleBox}><div style={exampleText}>"My Channel Was Dying — Then I Changed One Thing"</div></div>
          <div style={exampleBox}><div style={exampleText}>"How a 2-Minute Fix Saved My YouTube Channel"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Implies a journey with a positive outcome. Viewers self-project — "if they could do it, maybe I can too." Specific numbers in the transformation make it more believable.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>5</div>
            <div style={formulaName}>The Warning / Mistakes</div>
          </div>
          <p style={p}>
            Loss aversion is twice as powerful as gain motivation. Telling someone they're making a mistake that costs them views is more compelling than telling them a tip that might get them more views. Fear of doing something wrong drives clicks faster than desire for improvement.
          </p>
          <div style={exampleBox}><div style={exampleText}>"5 YouTube Mistakes That Are Killing Your Views (Fix These Now)"</div></div>
          <div style={exampleBox}><div style={exampleText}>"Stop Doing This With Your Thumbnails"</div></div>
          <div style={exampleBox}><div style={exampleText}>"The #1 Reason Your YouTube Channel Isn't Growing"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Nobody wants to be making a mistake without knowing it. The implication is "you're probably doing this wrong" — which creates an immediate need to check.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>6</div>
            <div style={formulaName}>The Versus / Comparison</div>
          </div>
          <p style={p}>
            Direct comparisons tap into the human need to make the right choice. When two popular options exist, viewers want someone to settle the debate for them. Comparison titles also perform well in search because people literally search "[A] vs [B]."
          </p>
          <div style={exampleBox}><div style={exampleText}>"TubeBuddy vs vidIQ: Which One Actually Helps You Grow?"</div></div>
          <div style={exampleBox}><div style={exampleText}>"YouTube Shorts vs Long-Form: Which Makes More Money?"</div></div>
          <div style={exampleBox}><div style={exampleText}>"$100 Camera vs $3,000 Camera — Can You Tell the Difference?"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Comparison implies a definitive answer, which creates curiosity. It also targets high-intent search traffic from people actively choosing between options.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>7</div>
            <div style={formulaName}>The Authority / Credential</div>
          </div>
          <p style={p}>
            Leading with a credential or authority source makes the content feel more trustworthy and valuable. It signals "this isn't just another random person's opinion — this is backed by expertise."
          </p>
          <div style={exampleBox}><div style={exampleText}>"YouTube Strategist Reveals the 2026 Algorithm Changes"</div></div>
          <div style={exampleBox}><div style={exampleText}>"Ex-YouTube Employee Explains How the Algorithm Really Works"</div></div>
          <div style={exampleBox}><div style={exampleText}>"A Data Scientist Analyzed 1,000 Viral Videos — Here's What She Found"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Credentials borrow trust. Even viewers who don't know the person immediately assign higher value because of the title. Selective capitalization of the credential ("DATA SCIENTIST Explains") adds visual emphasis without feeling spammy.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>8</div>
            <div style={formulaName}>The Contrarian / "Actually"</div>
          </div>
          <p style={p}>
            Challenge conventional wisdom. When everyone says "do X" and you say "X is wrong," people need to know why. The contrarian take works because it disrupts expectations and implies insider knowledge the mainstream is missing.
          </p>
          <div style={exampleBox}><div style={exampleText}>"Everything You Know About YouTube SEO Is Wrong"</div></div>
          <div style={exampleBox}><div style={exampleText}>"Why Posting Daily Is Actually Killing Your Channel"</div></div>
          <div style={exampleBox}><div style={exampleText}>"Forget Viral Videos — This Is How You Really Grow"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Challenges an existing belief the viewer holds. If they agree, they want validation. If they disagree, they want to argue. Either way, they click. But your content must deliver a genuinely different perspective — contrarian clickbait without substance backfires.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>9</div>
            <div style={formulaName}>The Blueprint / "Complete Guide"</div>
          </div>
          <p style={p}>
            Signals comprehensive, one-stop-shop content. Viewers choose this over multiple smaller videos because it promises everything in one place. "Complete Guide" and "Step-by-Step" perform especially well for educational and tutorial content.
          </p>
          <div style={exampleBox}><div style={exampleText}>"The Complete YouTube SEO Guide for 2026 (Beginner to Advanced)"</div></div>
          <div style={exampleBox}><div style={exampleText}>"How to Start a YouTube Channel — Step-by-Step for Beginners"</div></div>
          <div style={exampleBox}><div style={exampleText}>"YouTube Analytics Explained: Everything You Need to Know"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: Viewers prefer one comprehensive video over watching 5 partial ones. "Complete" and "Everything" signal thoroughness. These also perform well in search because they match broad queries.
          </p>
        </div>
  
        <div style={formulaCard}>
          <div style={formulaHeader}>
            <div style={formulaNumber}>10</div>
            <div style={formulaName}>The Novelty / "NEW"</div>
          </div>
          <p style={p}>
            Signal freshness and timeliness. The algorithm and human brains both reward novelty — YouTube surfaces fresh content for trending queries, and viewers are drawn to information that feels current and exclusive.
          </p>
          <div style={exampleBox}><div style={exampleText}>"YouTube Just Changed Everything for Small Creators (2026)"</div></div>
          <div style={exampleBox}><div style={exampleText}>"The NEW Way to Get Views on YouTube in 2026"</div></div>
          <div style={exampleBox}><div style={exampleText}>"YouTube's Latest Update Changes Everything — Here's What to Do"</div></div>
          <p style={{ ...p, marginBottom: 0, fontSize: 14, color: '#888' }}>
            Why it works: "NEW" and "2026" signal relevance. Viewers skip outdated content. The risk: year-specific titles have a shorter shelf life. Use sparingly — maybe 1 in every 5-6 videos. Your evergreen content should use the other 9 formulas.
          </p>
        </div>
  
        <h2 style={h2}>Combining Formulas for Maximum Impact</h2>
  
        <p style={p}>
          The strongest titles often blend two formulas together. Here's how:
        </p>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Number + Warning:</span> "5 YouTube Mistakes That Are Secretly Killing Your Views" (combines formula 1 and 5)
          </p>
          <p style={p}>
            <span style={strong}>Challenge + Transformation:</span> "I Posted Shorts Every Day for 30 Days — From 0 to 5K Subscribers" (combines formula 3 and 4)
          </p>
          <p style={p}>
            <span style={strong}>Authority + Curiosity Gap:</span> "YouTube Engineer Reveals the One Metric That Actually Matters" (combines formula 7 and 2)
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Versus + Number:</span> "TubeBuddy vs vidIQ: 7 Tests, 1 Clear Winner" (combines formula 6 and 1)
          </p>
        </div>
  
        <div style={tipBox}>
          <span style={tipLabel}>THE A/B TESTING WORKFLOW</span>
          <p style={p}>
            Write 5-10 title variations using different formulas. Pick your top 2. Use YouTube's title A/B testing (available on select channels in 2026) to test them against each other. If you don't have access to title testing, publish with your strongest option and change it after 48 hours if CTR is below 4%.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            Track which formulas consistently win for YOUR audience. Over time, you'll discover that 2-3 formulas dominate your specific niche. Double down on those while occasionally testing the others to find new opportunities.
          </p>
        </div>
  
        <h2 style={h2}>Title Mistakes That Kill CTR</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>Vague titles with no hook.</span> "My Thoughts on YouTube" tells the viewer nothing. No curiosity, no promise, no reason to click. Every title needs a specific value proposition or emotional trigger.
          </p>
          <p style={p}>
            <span style={strong}>All-caps titles.</span> "THE BEST YOUTUBE TIPS YOU WILL EVER SEE" feels like spam. Mixed capitalization (capitalizing the first letter of each major word, or selectively capitalizing 1-2 words for emphasis) performs best.
          </p>
          <p style={p}>
            <span style={strong}>Clickbait that doesn't deliver.</span> In 2026, YouTube tracks "Quality CTR" — what happens after the click. High CTR + low retention = active demotion. Your title must accurately represent your content in the most compelling way possible.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>Keyword-stuffed titles.</span> "YouTube SEO Tips YouTube Growth YouTube Algorithm 2026" reads like spam and turns viewers off. Use your keyword once, naturally, in the first 5 words. Let the formula do the clicking work.
          </p>
        </div>
  
        <h2 style={h2}>How to Know Which Titles Work for YOUR Audience</h2>
  
        <div style={{
          ...sectionCard,
          border: '1px solid rgba(255,0,0,0.3)',
          background: 'rgba(255,0,0,0.03)',
        }}>
          <p style={p}>
            The best title formula for your channel is the one that your specific audience responds to. Study your top 5 highest-CTR videos in YouTube Studio and identify the common patterns — your audience is already telling you what works.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            NEXORA's AI Coach can accelerate this analysis. Ask it "what title patterns work best for my channel?" and it will analyze the CTR across your video library, identify which structural patterns correlate with your highest-performing titles, and suggest title approaches calibrated to what your audience responds to. It takes the guesswork out of title writing by grounding recommendations in your actual data.
          </p>
        </div>
  
        <h2 style={h2}>Key Takeaways</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1.</span> Titles account for ~50% of your CTR. A 2% CTR improvement can double your views over time through increased algorithmic distribution.
          </p>
          <p style={p}>
            <span style={strong}>2.</span> The 10 proven formulas: Specific Number, Curiosity Gap, Challenge/"I Tried", Transformation, Warning/Mistakes, Versus, Authority, Contrarian, Blueprint, and Novelty.
          </p>
          <p style={p}>
            <span style={strong}>3.</span> Front-load your keyword in the first 5 words. Keep titles under 65 characters. Write the title before the script.
          </p>
          <p style={p}>
            <span style={strong}>4.</span> Write 5-10 variations per video using different formulas. Never publish your first draft.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>5.</span> Combine formulas for maximum impact (Number + Warning, Challenge + Transformation). Track which formulas win for your audience and double down on them.
          </p>
        </div>
      </>
    )
  }
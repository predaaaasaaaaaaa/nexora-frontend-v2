export default function Post26Content() {
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
  
    const updateCard = {
      background: '#161616',
      border: '1px solid #222',
      borderRadius: 10,
      padding: '24px 28px',
      marginBottom: 20,
    }
  
    const updateNumber = {
      fontSize: 12,
      fontWeight: 800,
      color: '#FF0000',
      letterSpacing: 1.5,
      marginBottom: 10,
      display: 'block',
    }
  
    const verdictRow = {
      display: 'flex',
      gap: 12,
      marginTop: 16,
      paddingTop: 16,
      borderTop: '1px solid #222',
      flexWrap: 'wrap',
    }
  
    const verdictPill = {
      fontSize: 11,
      fontWeight: 700,
      padding: '4px 10px',
      borderRadius: 6,
      letterSpacing: 0.5,
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
          YouTube shipped seven creator-facing features and policy clarifications in the first week of May 2026. Most creators saw none of them. Some are minor. Two are genuinely significant. One is the biggest monetization policy clarification in 18 months.
        </p>
  
        <p style={p}>
          This is the no-fluff weekly briefing. Each update gets the same treatment: what it is, what changed, who it affects, and a one-line verdict so you know what's worth your time.
        </p>
  
        <h2 style={h2}>1. The Profanity Monetization Rule, Clarified</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            YouTube clarified its advertiser-friendly content guidelines this week: <span style={strong}>creators can now include profanity within the first 7-15 seconds of a video and still maintain full monetization</span>, provided the rest of the video meets standard guidelines.
          </p>
          <p style={p}>
            This walks back the most aggressive interpretation of the 2022 profanity rule, which effectively penalized creators for swearing in hooks. The result was an entire category of channels self-censoring intros to avoid yellow icons — losing punch, energy, and click-through in the process.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The new clarification doesn't make all profanity safe. Slurs, hate speech, and sexually explicit language remain demonetized regardless of placement. But casual swearing in a hook now lives squarely in green-icon territory.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: HIGH IMPACT</span>
            <span style={{ ...verdictPill, background: 'rgba(77,158,255,0.1)', color: '#4D9EFF' }}>AFFECTS: COMMENTARY, COMEDY, GAMING</span>
          </div>
        </div>
  
        <h2 style={h2}>2. "Edit with AI" Expands</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            YouTube's Edit with AI feature — which turns raw camera-roll footage into a first-draft edited Short — is rolling out to more markets and getting deeper integration with YouTube Studio. The system selects moments from your raw clips, sequences them, and adds music and transitions automatically.
          </p>
          <p style={p}>
            The mechanic: upload 5-20 raw clips, hit "Edit with AI," and get back a 30-60 second draft Short. You then refine, swap clips, adjust pacing, and publish. The pitch is "from camera roll to publish in under 5 minutes."
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            Originally launched in November 2025 in 15 countries (US, India, Canada, Brazil). The May update expands market access and improves clip selection logic. The first version was rough on pacing. The May iteration is noticeably better at identifying high-energy moments.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: USEFUL FOR SHORTS</span>
            <span style={{ ...verdictPill, background: 'rgba(255,140,0,0.1)', color: '#FF8C00' }}>STILL ROUGH ON COMPLEX EDITS</span>
          </div>
        </div>
  
        <h2 style={h2}>3. Turn Audio Into Video (For Podcasters)</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            A new feature lets creators auto-generate a video version of their podcast directly from the audio file. YouTube provides customizable templates — backgrounds, waveform visualizations, episode metadata, and chapter markers. You upload audio, choose a template, and YouTube renders a full video version ready to publish.
          </p>
          <p style={p}>
            This is YouTube's answer to the fact that audio-only podcasts perform 3-5x worse on the platform than the same content in video form. For podcasters who refuse to film, this collapses the "no video version" excuse.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The output isn't going to win a Webby. But it's enough to register the content as video, which means it enters the algorithm with all the discovery surfaces audio-only uploads were locked out of.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: GAME-CHANGER FOR PODCASTERS</span>
          </div>
        </div>
  
        <h2 style={h2}>4. "Ask Studio" — A Native AI Analytics Chatbot</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            YouTube is rolling out Ask Studio, a conversational AI chatbot built directly into YouTube Studio. You can ask questions in natural language — "why did my last video underperform," "which thumbnail style works best for me," "what topics are my audience commenting about most" — and get answers pulled from your channel analytics.
          </p>
          <p style={p}>
            The actual capability is narrower than the marketing implies. Ask Studio answers questions about <span style={strong}>your own channel only</span>. It doesn't pull competitor data, doesn't surface trending topics outside your niche, and doesn't suggest content ideas based on cross-channel patterns. It's a smarter analytics dashboard, not a strategic coach.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            Still, the bar for "answer basic questions about my analytics in plain English" is now built into Studio. That's a real time-saver for creators who never want to dig through Studio's filter UI.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: USEFUL, LIMITED SCOPE</span>
            <span style={{ ...verdictPill, background: 'rgba(255,140,0,0.1)', color: '#FF8C00' }}>NOT A STRATEGY TOOL</span>
          </div>
        </div>
  
        <h2 style={h2}>5. Veo 3 Fast — Now Free for Shorts Creators</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            Google Veo 3 Fast, the AI video generation model that produces 8-second clips with synchronized audio, is now available <span style={strong}>free</span> to all eligible YouTube Shorts creators. Previously this was gated to paid Google AI Studio access at roughly $0.40 per second of generated video.
          </p>
          <p style={p}>
            The actual quality is solid for B-roll, intros, transitions, and AI aesthetic Shorts. Limitations remain: 480p output, 8-second cap per generation, SynthID watermarking in supported regions (so viewers can verify AI provenance).
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The strategic move: lowering the cost of AI video generation to zero for Shorts creators is YouTube's bet that Shorts production volume scales further. If you create Shorts, this is the most immediately useful feature on this entire list.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: HIGH IMPACT</span>
            <span style={{ ...verdictPill, background: 'rgba(77,158,255,0.1)', color: '#4D9EFF' }}>FREE = NO REASON NOT TO TRY</span>
          </div>
        </div>
  
        <h2 style={h2}>6. Likeness Detection Expanded</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            YouTube's likeness detection — which flags unauthorized use of a creator's face or voice in AI-generated content — has expanded beyond a narrow public-figure pilot to cover actors, athletes, musicians, and YouTube creators broadly. Affected creators can request removal of videos that use their likeness without consent.
          </p>
          <p style={p}>
            This matters most for mid-tier and large creators whose voices are increasingly cloned for AI scam ads and unauthorized commentary channels. The enforcement mechanism is the same takedown system as copyright claims — fast review, automated detection where possible.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            For most creators under 100K subs, this won't be a daily-use feature. But if your voice or face shows up in a fake endorsement, the takedown path now exists.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: IMPORTANT FOR LARGER CREATORS</span>
          </div>
        </div>
  
        <h2 style={h2}>7. Native A/B Testing for Video Titles</h2>
  
        <div style={updateCard}>
          <span style={updateNumber}>WHAT CHANGED</span>
          <p style={p}>
            YouTube launched native A/B testing for video titles, joining the existing thumbnail A/B testing feature that rolled out last year. You upload up to three title variants per video; YouTube serves each to a slice of viewers, measures watch time, and picks a winner automatically.
          </p>
          <p style={p}>
            This kills one of the most-used pitches from third-party tools (TubeBuddy, vidIQ, Spotter). Native title testing is more accurate than any external simulator because it tests against your actual audience in real serving conditions — not a static prediction model.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            The catch: it only works on new uploads. You can't retroactively test titles on existing videos. And the optimization criterion is watch time, not CTR — which is the right metric, but worth knowing if you're optimizing for thumbnails first.
          </p>
          <div style={verdictRow}>
            <span style={{ ...verdictPill, background: 'rgba(62,166,81,0.1)', color: '#3EA651' }}>VERDICT: USE IT ON EVERY UPLOAD</span>
          </div>
        </div>
  
        <h2 style={h2}>The Meta-Pattern: YouTube Studio Is Becoming an AI Production Suite</h2>
  
        <p style={p}>
          Step back and look at what shipped this week alongside everything from Q1 2026: Veo 3 in Shorts, Edit with AI, audio-to-video, Ask Studio, native A/B testing for titles and thumbnails, auto-dubbing across 27 languages, Lyria 2 song generation, Expressive Speech.
        </p>
  
        <p style={p}>
          That's not a list of features. That's a full vertical: <span style={strong}>YouTube is rebuilding the creator stack inside Studio itself</span>. Generation, editing, optimization, localization, analytics — all native, all free or near-free, all built directly into the upload flow.
        </p>
  
        <p style={p}>
          The strategic implication for creators is straightforward: stop paying for tools that do what Studio now does for free. The best use of your time and tool budget is on the work YouTube Studio still <span style={strong}>can't</span> do — competitor research, strategic content planning, cross-channel pattern detection, and audience growth strategy.
        </p>
  
        <div style={tipBox}>
          <span style={tipLabel}>HOW NEXORA FITS</span>
          <p style={{ ...p, marginBottom: 0 }}>
            Ask Studio answers questions about your own channel. NEXORA goes a layer deeper — it's an AI agent you plug into your YouTube channel via Google OAuth that analyzes competitor patterns, surfaces content opportunities from outside your niche, and gives strategic recommendations on what to make next. It's built specifically for the work YouTube Studio doesn't do: cross-channel analysis, ideation, and growth strategy.
          </p>
        </div>
  
        <h2 style={h2}>The 5-Minute Action List</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>If you make Shorts:</span> Open Studio → look for Veo 3 Fast in the creation flow. Try one prompt. The free tier is worth the 5 minutes.
          </p>
          <p style={p}>
            <span style={strong}>If you make long-form:</span> Enable native A/B title testing on your next upload. Write three title variants. Let YouTube pick the winner.
          </p>
          <p style={p}>
            <span style={strong}>If you podcast:</span> Try the audio-to-video conversion on your next episode. Even a rough video version will outperform audio-only on the platform.
          </p>
          <p style={p}>
            <span style={strong}>If you use TubeBuddy/vidIQ for title testing:</span> Switch that workflow to native A/B testing immediately. Native is more accurate.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>If you're a commentary/comedy creator:</span> The profanity clarification removes a self-censorship habit that's been hurting your hooks for two years. Test it on your next video.
          </p>
        </div>
  
        <h2 style={h2}>Key Takeaways</h2>
  
        <div style={sectionCard}>
          <p style={p}>
            <span style={strong}>1.</span> Seven YouTube updates dropped in early May 2026. The biggest creator-impact ones: the profanity monetization clarification, free Veo 3 Fast for Shorts, and native A/B title testing.
          </p>
          <p style={p}>
            <span style={strong}>2.</span> YouTube Studio is consolidating creator tools natively. Title testing, thumbnail testing, AI editing, AI generation, and analytics chatbots are all now built in. Third-party tools that only do these basics are losing their pitch.
          </p>
          <p style={p}>
            <span style={strong}>3.</span> Ask Studio answers questions about your own channel but doesn't do cross-channel competitor analysis or strategic content planning. It's a smarter dashboard, not a strategy tool.
          </p>
          <p style={p}>
            <span style={strong}>4.</span> Veo 3 Fast going free for Shorts creators is the single most under-rated change of the week. It removes the cost barrier on AI video generation entirely for the creators most likely to benefit.
          </p>
          <p style={p}>
            <span style={strong}>5.</span> Podcasters get a major unlock with audio-to-video conversion. Audio-only uploads have been algorithm-disadvantaged for years; this fixes it without filming.
          </p>
          <p style={{ ...p, marginBottom: 0 }}>
            <span style={strong}>6.</span> The right strategic response: stop paying for tools Studio now replaces, invest in strategy tools that do what Studio still can't (competitor research, ideation, cross-channel pattern detection).
          </p>
        </div>
      </>
    )
  }
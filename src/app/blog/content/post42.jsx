import Link from 'next/link'

export default function Post42Content() {
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

  const alertBox = {
    background: 'rgba(255,140,0,0.05)',
    border: '1px solid rgba(255,140,0,0.25)',
    borderRadius: 10,
    padding: '20px 24px',
    marginTop: 24,
    marginBottom: 24,
  }

  const alertLabel = {
    fontSize: 12,
    fontWeight: 700,
    color: '#FF8C00',
    letterSpacing: 1,
    marginBottom: 8,
    display: 'block',
  }

  const permanentBox = {
    background: 'rgba(248,113,113,0.04)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 10,
    padding: '20px 24px',
    marginTop: 24,
    marginBottom: 24,
  }

  const permanentLabel = {
    fontSize: 12,
    fontWeight: 700,
    color: '#f87171',
    letterSpacing: 1,
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
        YouTube just flipped a switch that changes the AI-disclosure game for every creator. Starting in May 2026, the platform is rolling out <span style={strong}>automatic AI-detection labels</span> — internal systems that identify substantial photorealistic AI-generated content and apply a disclosure label automatically when creators don't disclose it themselves.
      </p>

      <p style={p}>
        Until now, AI disclosure on YouTube was an honor system: creators were required to manually disclose realistic AI use, but enforcement relied on self-reporting. That era is ending. YouTube's detection systems will now catch undisclosed AI and label it for you — and in some cases, that label is permanent and cannot be removed. For creators using AI in any part of their workflow, understanding exactly how this works is no longer optional.
      </p>

      <p style={p}>
        This guide breaks down precisely what's changing, where the labels appear, the critical cases where labels become permanent, how to contest an incorrect label, and what every creator should do right now to stay on the right side of this shift.
      </p>

      <h2 style={h2}>What's Actually Changing</h2>

      <p style={p}>
        YouTube has always required manual disclosure of realistic AI use. The change is the addition of <span style={strong}>automated detection that supplements creator disclosures</span>. Here's the confirmed mechanism from YouTube's announcement:
      </p>

      <div style={sectionCard}>
        <h3 style={{ ...h3, marginTop: 0 }}>The confirmed facts</h3>
        <p style={p}>
          <span style={strong}>1.</span> Beginning May 2026, YouTube uses internal detection signals to identify videos containing substantial photorealistic AI-generated material.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> If a creator doesn't specify whether they used AI, but YouTube's systems detect significant photorealistic AI use, the platform automatically applies a disclosure label.
        </p>
        <p style={p}>
          <span style={strong}>3.</span> Creators remain able to contest or update labels through YouTube Studio if they believe their content was incorrectly flagged.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>4.</span> The system targets <em>photorealistic</em> AI content specifically — content designed to look like real footage. Clearly stylized or animated AI content is a different category.
        </p>
      </div>

      <p style={p}>
        The key word throughout is <span style={strong}>photorealistic</span>. YouTube isn't trying to label every use of AI in the creative process — it's targeting AI-generated material that could be mistaken for real footage. This is squarely aimed at the deception risk, not at creators using AI as a production tool.
      </p>

      <h2 style={h2}>Where the Labels Appear</h2>

      <div style={sectionCard}>
        <p style={p}>
          Label placement differs by format, and the visibility difference matters for how viewers perceive your content:
        </p>
        <p style={p}>
          <span style={strong}>Long-form videos:</span> The label appears directly beneath the video player and above the description section. Visible, but not overlaid on the content itself.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>Shorts:</span> The label appears as an overlay within the video itself — more prominent and harder for viewers to miss, reflecting the faster, more immersive nature of the Shorts feed.
        </p>
      </div>

      <h2 style={h2}>The Permanent Label Cases (Critical)</h2>

      <div style={permanentBox}>
        <span style={permanentLabel}>LABELS YOU CANNOT REMOVE</span>
        <p style={p}>
          Most auto-applied labels can be contested or updated in Studio. But in a specific set of cases, the disclosure is <span style={strong}>permanent</span> and cannot be removed — no matter what:
        </p>
        <p style={p}>
          <span style={strong}>1. Content created using YouTube's own AI tools</span> — like Veo or Dream Screen. If you generate content with YouTube's native AI tools, the label is locked. The platform knows you used AI because you used its AI.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>2. Content containing C2PA metadata indicating it's fully generative AI.</span> C2PA is the industry-standard content-provenance metadata. If your content carries C2PA data marking it as fully AI-generated, the label is permanent.
        </p>
      </div>

      <p style={p}>
        This is the detail most creators will miss: <span style={strong}>using YouTube's own Veo or Dream Screen tools locks a permanent AI label onto the output</span>. That's not a reason to avoid them — it's a reason to use them deliberately, knowing the label comes attached. For purely creative or clearly-labeled content that's fine; for content where you'd prefer no AI label, it's a meaningful consideration.
      </p>

      <h2 style={h2}>Why YouTube Is Doing This</h2>

      <p style={p}>
        This move is the logical next step in a year-long trajectory. It connects directly to the enforcement wave covered in <Link href="/blog/youtube-ai-slop-crackdown-2026" style={inlineLink}>the AI slop crackdown breakdown</Link> — where 16 channels with billions of combined views were terminated for low-quality AI content. Automatic labeling is the scalable, systematic version of that enforcement: instead of manually catching bad actors, YouTube builds detection into the platform.
      </p>

      <p style={p}>
        Three motivations drive it: viewer trust (people want to know what's real), platform integrity (combating the flood of undisclosed synthetic content), and getting ahead of regulation (governments worldwide are moving toward mandatory AI disclosure). YouTube would rather build its own system than have one imposed.
      </p>

      <h2 style={h2}>What This Means for Creators Using AI</h2>

      <div style={alertBox}>
        <span style={alertLabel}>THE PRACTICAL IMPACT BY CREATOR TYPE</span>
        <p style={p}>
          <span style={strong}>If you don't use AI in visible output:</span> Nothing changes. You have nothing to disclose and nothing to be flagged. Keep doing what you're doing.
        </p>
        <p style={p}>
          <span style={strong}>If you use AI as a tool (editing, B-roll, ideation):</span> Minimal impact, as long as your final output isn't photorealistic AI presented as real. The detection targets photorealistic generated material, not AI-assisted editing.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>If you create photorealistic AI content:</span> Disclose it yourself, proactively. A self-applied disclosure is cleaner than an auto-applied one, gives you control over the framing, and avoids any appearance of trying to hide AI use.
        </p>
      </div>

      <p style={p}>
        The throughline matches the safe-AI framework in <Link href="/blog/how-to-use-ai-for-youtube-without-getting-demonetized-2026" style={inlineLink}>the guide to using AI without getting demonetized</Link>: AI as a tool that amplifies a real creator is safe. AI presented deceptively as real footage is what gets labeled — and, if it crosses into low-quality mass production, demonetized.
      </p>

      <h2 style={h2}>How to Contest an Incorrect Label</h2>

      <div style={stepCard}>
        <span style={stepNumber}>STEP 1 — CHECK THE LABEL IN STUDIO</span>
        <p style={{ ...p, marginBottom: 0 }}>
          When a label is auto-applied, you'll see the disclosure status in YouTube Studio. Review whether it's accurate — sometimes heavily stylized real footage or certain effects can trigger false positives.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#4D9EFF' }}>STEP 2 — UPDATE THE DISCLOSURE STATUS</span>
        <p style={{ ...p, marginBottom: 0 }}>
          If your content was incorrectly flagged (and it's not in the permanent-label categories), you can update the disclosure status directly in Studio to remove or correct the label.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#FF8C00' }}>STEP 3 — KNOW WHEN YOU CAN'T CONTEST</span>
        <p style={{ ...p, marginBottom: 0 }}>
          If your content used YouTube's own AI tools (Veo, Dream Screen) or carries C2PA fully-generative metadata, the label is permanent. Contesting won't work in these cases — so factor that in before publishing.
        </p>
      </div>

      <div style={stepCard}>
        <span style={{ ...stepNumber, color: '#3EA651' }}>STEP 4 — DISCLOSE PROACTIVELY GOING FORWARD</span>
        <p style={{ ...p, marginBottom: 0 }}>
          The cleanest path is to never get auto-flagged in the first place. If you use photorealistic AI, toggle the disclosure yourself at upload. Self-disclosure puts you in control and signals good faith to both viewers and the platform.
        </p>
      </div>

      <h2 style={h2}>What Every Creator Should Do Right Now</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1. Audit your recent uploads.</span> If you've used photorealistic AI anywhere, check whether it's disclosed. Get ahead of auto-labeling by self-disclosing where appropriate.
        </p>
        <p style={p}>
          <span style={strong}>2. Decide your stance on YouTube's native AI tools.</span> Veo and Dream Screen lock permanent labels. Use them where an AI label is fine; think twice where you'd prefer none.
        </p>
        <p style={p}>
          <span style={strong}>3. Build disclosure into your workflow.</span> Make the AI-disclosure toggle a standard step in your upload checklist for any video using photorealistic AI. Routine beats reaction.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>4. Keep your creator fingerprint visible.</span> The broader 2026 lesson holds: content where a real creator is clearly present and adding judgment is safe. The fully-synthetic, faceless, photorealistic AI channel is exactly what this system targets. Connect this to the bigger picture in <Link href="/blog/ai-for-youtube-creators-complete-guide-2026" style={inlineLink}>the complete AI for YouTube creators guide</Link>.
        </p>
      </div>

      <div style={tipBox}>
        <span style={tipLabel}>HOW NEXORA HELPS YOU STAY COMPLIANT</span>
        <p style={{ ...p, marginBottom: 0 }}>
          Staying on the right side of AI-disclosure rules means understanding which of your content choices carry labeling and policy implications. NEXORA is an AI agent you plug into your YouTube channel via Google OAuth (read-only access). It helps you understand how your content strategy aligns with YouTube's evolving AI and authenticity policies, flags where your approach might intersect with disclosure requirements, and keeps your strategy oriented toward the amplifier-not-replacer model that survives platform enforcement. Just ask: "Does my current content approach align with YouTube's 2026 AI policies?" Clear, current guidance for your channel.
        </p>
      </div>

      <h2 style={h2}>Key Takeaways</h2>

      <div style={sectionCard}>
        <p style={p}>
          <span style={strong}>1.</span> Starting May 2026, YouTube automatically applies AI-disclosure labels when its internal systems detect substantial photorealistic AI-generated content that a creator didn't disclose. The honor system is now backed by detection.
        </p>
        <p style={p}>
          <span style={strong}>2.</span> The system targets photorealistic AI (content that looks like real footage) — not AI-assisted editing, ideation, or clearly stylized content. AI as a production tool is largely unaffected.
        </p>
        <p style={p}>
          <span style={strong}>3.</span> Labels appear beneath the player and above the description on long-form, and as an overlay within the video itself on Shorts.
        </p>
        <p style={p}>
          <span style={strong}>4.</span> Two permanent-label cases you cannot contest: content made with YouTube's own AI tools (Veo, Dream Screen), and content carrying C2PA metadata marking it fully generative. Using native AI tools locks a permanent label.
        </p>
        <p style={p}>
          <span style={strong}>5.</span> You can contest incorrect labels in YouTube Studio by updating the disclosure status — except in the two permanent cases. The cleanest path is proactive self-disclosure at upload.
        </p>
        <p style={{ ...p, marginBottom: 0 }}>
          <span style={strong}>6.</span> Action now: audit recent uploads for undisclosed photorealistic AI, decide your stance on native AI tools given the permanent label, build disclosure into your upload checklist, and keep a real creator visibly present — the fully-synthetic photorealistic channel is exactly what this targets.
        </p>
      </div>
    </>
  )
}
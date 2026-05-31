// Quick Answer block — a short, self-contained answer rendered at the very top
// of a blog post body. Sourced from the post's `answer` field in posts.jsx;
// this component is presentational only (no content lives here). Renders
// nothing when no answer is provided, so posts without the field are unchanged.
export default function QuickAnswer({ text }) {
  if (!text) return null

  return (
    <div style={{
      background: '#141414',
      borderLeft: '3px solid #FF0000',
      borderRadius: '0 10px 10px 0',
      padding: '20px 24px',
      marginBottom: 40,
    }}>
      <div style={{
        fontSize: 12,
        fontWeight: 700,
        color: '#FF0000',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Quick Answer
      </div>
      <p style={{
        fontSize: 17,
        lineHeight: 1.7,
        color: '#eee',
        margin: 0,
      }}>
        {text}
      </p>
    </div>
  )
}

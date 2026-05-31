// FAQ section — renders a list of question/answer pairs at the bottom of a blog
// post. Sourced from the post's `faqs` array in posts.jsx (each item { q, a }).
// Presentational only; renders nothing when there are no items, so posts
// without FAQs are unchanged. The matching FAQPage JSON-LD is emitted
// separately by the post page.
export default function FAQ({ items }) {
  if (!items || items.length === 0) return null

  return (
    <div style={{ marginTop: 56 }}>
      <h2 style={{
        fontSize: 26,
        fontWeight: 700,
        color: '#fff',
        marginBottom: 24,
        lineHeight: 1.2,
      }}>
        Frequently Asked Questions
      </h2>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <div key={i} style={{
            borderBottom: isLast ? 'none' : '1px solid #222',
            paddingBottom: isLast ? 0 : 24,
            marginBottom: isLast ? 0 : 24,
          }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 10,
              lineHeight: 1.4,
            }}>
              {item.q}
            </h3>
            <p style={{
              fontSize: 16,
              lineHeight: 1.8,
              color: '#ccc',
              margin: 0,
            }}>
              {item.a}
            </p>
          </div>
        )
      })}
    </div>
  )
}

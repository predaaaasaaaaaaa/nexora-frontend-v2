// Renders a JSON-LD structured-data <script>. This is invisible metadata for
// search engines — it never affects what users see on the page.
//
// `data` is a plain object describing a schema.org entity. We stringify it and
// emit via dangerouslySetInnerHTML because that's the only way to drop raw JSON
// into a <script type="application/ld+json"> tag in React. The input is always
// trusted, build-time content (org constants / post data), never user input.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

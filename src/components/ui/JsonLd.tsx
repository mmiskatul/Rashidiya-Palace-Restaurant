/**
 * Renders a JSON-LD block.
 *
 * The payload is always built from typed objects in `lib/structured-data.ts` —
 * never from user input — and serialised with JSON.stringify, so
 * `dangerouslySetInnerHTML` here carries no injection surface.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

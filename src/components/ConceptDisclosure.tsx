/**
 * Per-project disclosure for Works case studies that are independent concept
 * builds or industry demos rather than commissioned client work. Not for use
 * on verified Client Work pages.
 */
export default function ConceptDisclosure() {
  return (
    <p
      className="font-sans mt-4"
      style={{
        fontSize: '0.8125rem',
        lineHeight: 1.6,
        color: 'var(--muted-text)',
        maxWidth: 560,
      }}
    >
      Independent website concept created by New Level Design Studio. This project was not
      commissioned by, affiliated with, or endorsed by the business named unless explicitly
      stated otherwise.
    </p>
  );
}

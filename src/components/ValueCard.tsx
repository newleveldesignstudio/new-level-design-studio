interface ValueCardProps {
  title: string;
  description: string;
}

export default function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: 'var(--bg-soft)',
        border: '1px solid var(--border-color)',
        padding: 'clamp(28px, 4vw, 40px)',
      }}
    >
      <h3
        className="font-serif"
        style={{
          fontSize: '1.35rem',
          color: 'var(--charcoal)',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <div
        className="mt-4"
        style={{ width: 32, height: 1, backgroundColor: 'var(--silver-grey)' }}
      />
      <p
        className="font-sans mt-4"
        style={{
          fontSize: '0.9375rem',
          lineHeight: 1.6,
          color: 'var(--muted-text)',
        }}
      >
        {description}
      </p>
    </div>
  );
}

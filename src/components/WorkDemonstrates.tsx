interface WorkDemonstratesProps {
  points: string[];
}

export default function WorkDemonstrates({ points }: WorkDemonstratesProps) {
  return (
    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
      <p className="eyebrow" style={{ marginBottom: 16 }}>What This Concept Demonstrates</p>
      <ul
        className="font-sans"
        style={{
          fontSize: '1.0625rem',
          lineHeight: 1.75,
          color: 'var(--muted-text)',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {points.map((point) => (
          <li key={point}>— {point}</li>
        ))}
      </ul>
    </div>
  );
}

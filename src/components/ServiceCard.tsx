import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: { text: string; to: string };
}

export default function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        padding: 40,
      }}
    >
      <div style={{ color: 'var(--charcoal)' }}>{icon}</div>
      <h3
        className="font-serif mt-6"
        style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}
      >
        {title}
      </h3>
      <p
        className="font-sans mt-3"
        style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
      >
        {description}
      </p>
      {link && (
        <Link to={link.to} className="text-link mt-4">
          {link.text}
        </Link>
      )}
    </div>
  );
}

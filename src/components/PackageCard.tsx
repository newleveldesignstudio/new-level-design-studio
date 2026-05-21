import { Link } from 'react-router-dom';
import { CheckIcon } from './icons';

interface PackageCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText?: string;
  ctaTo?: string;
  highlighted?: boolean;
}

export default function PackageCard({
  name,
  price,
  description,
  features,
  ctaText = 'Get Started',
  ctaTo = '/contact',
}: PackageCardProps) {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        padding: 48,
      }}
    >
      <h3
        className="font-serif"
        style={{ fontSize: '2rem', color: 'var(--charcoal)' }}
      >
        {name}
      </h3>
      <p
        className="font-sans font-semibold mt-4"
        style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}
      >
        {price}
      </p>
      <div
        className="mt-6"
        style={{ width: '100%', height: 1, backgroundColor: 'var(--silver-grey)' }}
      />
      <p
        className="font-sans mt-6"
        style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
      >
        {description}
      </p>
      <ul className="mt-6 flex flex-col" style={{ gap: 8 }}>
        {features.map((feature, i) => (
          <li key={i} className="flex items-start" style={{ gap: 10 }}>
            <CheckIcon size={16} className="mt-1 flex-shrink-0" />
            <span
              className="font-sans"
              style={{ fontSize: '0.875rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        to={ctaTo}
        className="btn-primary mt-8 text-center"
      >
        {ctaText}
      </Link>
    </div>
  );
}

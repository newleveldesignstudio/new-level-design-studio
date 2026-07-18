import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface FinalCTAProps {
  heading?: string;
  body?: string;
  buttonText?: string;
  buttonTo?: string;
}

export default function FinalCTA({
  heading = 'Start With a Free Website Review',
  body = "A clear, credible website makes a stronger first impression — and makes it easier for customers to trust your business and reach out.",
  buttonText = 'Request a Free Website Review',
  buttonTo = '/contact/',
}: FinalCTAProps) {
  const ref = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.7,
    stagger: 0.2,
    start: 'top 80%',
  });

  return (
    <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
      <div ref={ref} className="container-nlds text-center" style={{ maxWidth: 600 }}>
        <h2
          className="font-serif"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
        >
          {heading}
        </h2>
        <p
          className="font-sans mt-5"
          style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
        >
          {body}
        </p>
        <Link to={buttonTo} className="btn-primary mt-8 inline-block">
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

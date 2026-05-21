import { useScrollReveal } from '@/hooks/useScrollReveal';
import FramedImage from './FramedImage';
import DiagonalLine from './DiagonalLine';
import { Link } from 'react-router-dom';

interface TwoColumnSectionProps {
  eyebrow?: string;
  heading: string;
  body: string;
  cta?: { text: string; to: string };
  image: string;
  imageAlt: string;
  imageAspectRatio?: string;
  reverse?: boolean;
  bgSoft?: boolean;
}

export default function TwoColumnSection({
  eyebrow,
  heading,
  body,
  cta,
  image,
  imageAlt,
  imageAspectRatio = '4/3',
  reverse = false,
  bgSoft = true,
}: TwoColumnSectionProps) {
  const leftRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.7,
    stagger: 0.2,
    start: 'top 75%',
  });

  return (
    <section style={{ backgroundColor: bgSoft ? 'var(--bg-soft)' : 'var(--bg-main)', padding: '100px 0' }}>
      <div className="container-nlds">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 ${reverse ? 'lg:grid-flow-dense' : ''}`}>
          <div ref={leftRef} className={`flex flex-col justify-center ${reverse ? 'lg:col-start-2' : ''}`}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2
              className="font-serif mt-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              {heading}
            </h2>
            <p
              className="font-sans mt-6"
              style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
            >
              {body}
            </p>
            {cta && (
              <Link to={cta.to} className="btn-primary mt-8 inline-block self-start">
                {cta.text}
              </Link>
            )}
          </div>

          <div className={`relative ${reverse ? 'lg:col-start-1' : ''}`}>
            <FramedImage src={image} alt={imageAlt} aspectRatio={imageAspectRatio} />
            <DiagonalLine direction="tl-br" className="absolute inset-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

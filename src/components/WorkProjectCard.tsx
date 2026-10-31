import { Link } from 'react-router-dom';

export type WorkClassification = 'Concept Build' | 'Industry Demo' | 'Client Work';

export interface WorkProject {
  imageSrc: string | null;
  imageAlt?: string;
  imageTitle?: string;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  deliverables: string[];
  tags?: string[];
  /** Darker classification chip text (4.5:1+) for cards that must clearly read as concept work. Default chip style is unchanged. */
  chipStrong?: boolean;
  /** Overrides the classification text on the chip (e.g. 'Industry Demo / Concept Build'). */
  chipLabel?: string;
  classification: WorkClassification;
  demonstrates?: string;
  result?: string;
  slug?: string;
  /** Curated lead group on /works (e.g. 'Home Services'); shown first when the filter is All. */
  group?: string;
  /** Compact portfolio-index card (image, label, title, one paragraph, three strengths, two CTAs). Used for the Home Services lead group. */
  compact?: boolean;
  positioning?: string;
  strengths?: string[];
  ctaLabel?: string;
  demoUrl?: string;
  demoLabel?: string;
}

interface WorkProjectCardProps {
  project: WorkProject;
  onImageClick?: () => void;
}

export default function WorkProjectCard({ project, onImageClick }: WorkProjectCardProps) {
  const hasRealImage = !!project.imageSrc;
  const hasSlug = !!project.slug;
  const isLightboxClickable = hasRealImage && !!onImageClick && !hasSlug;

  const imageStyle = {
    aspectRatio: '16/10' as const,
    backgroundColor: 'var(--mist-grey)',
    backgroundImage: project.imageSrc ? `url(${project.imageSrc})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    display: 'block',
    width: '100%',
  };

  if (project.compact && project.slug) {
    return (
      <article className="group wk-compact">
        <div className="overflow-hidden" style={{ padding: 10, backgroundColor: 'var(--silver-grey)', borderRadius: 4 }}>
          <Link
            to={`/works/${project.slug}/`}
            className="transition-transform duration-500 group-hover:scale-[1.02] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
            style={{ ...imageStyle, textDecoration: 'none' }}
            aria-label={`View case study for ${project.title}`}
          />
        </div>
        <div className="mt-5" style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 16 }}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}>{project.industry}</span>
            <span className="font-sans uppercase" style={{ fontSize: '0.625rem', letterSpacing: '0.15em', color: 'var(--muted-text)', border: '1px solid var(--silver-grey)', padding: '2px 8px' }}>{project.chipLabel ?? project.classification}</span>
          </div>
          <h3 className="font-serif mt-3" style={{ fontSize: '1.5rem', lineHeight: 1.2, color: 'var(--charcoal)' }}>{project.title}</h3>
          {project.positioning && <p className="font-sans mt-2" style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--body-text)' }}>{project.positioning}</p>}
          {project.strengths && (
            <ul className="font-sans mt-4" style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--silver-grey)' }}>
              {project.strengths.map((t) => (
                <li key={t} style={{ fontSize: '0.875rem', color: 'var(--charcoal)', padding: '8px 0', borderBottom: '1px solid var(--silver-grey)' }}>{t}</li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '14px 22px', fontSize: '0.75rem', letterSpacing: '0.16em', minHeight: 48, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                View Concept <span aria-hidden="true">↗</span>
                <span className="sr-only"> ({project.title} industry demo, opens in a new tab)</span>
              </a>
            )}
            <Link to={`/works/${project.slug}/`} className="btn-secondary wk-secondary" style={{ padding: '14px 22px', fontSize: '0.75rem', letterSpacing: '0.16em', minHeight: 48, display: 'inline-flex', alignItems: 'center', borderColor: 'var(--silver-grey)' }}>
              Case Study<span className="sr-only">: {project.title}</span>
            </Link>
          </div>
          <p className="font-sans" style={{ marginTop: 14, fontSize: '0.6875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}>
            Industry Demo &middot; Concept build by NLDS &middot; Not a client project.
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      {/* Image */}
      <div
        className="overflow-hidden"
        style={{
          padding: 10,
          backgroundColor: 'var(--silver-grey)',
          borderRadius: 4,
        }}
      >
        {hasSlug ? (
          <Link
            to={`/works/${project.slug}/`}
            className="transition-transform duration-500 group-hover:scale-[1.02] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
            style={{ ...imageStyle, textDecoration: 'none' }}
            aria-label={`View case study for ${project.title}`}
          />
        ) : isLightboxClickable ? (
          <button
            type="button"
            onClick={onImageClick}
            className="w-full block text-left transition-transform duration-500 group-hover:scale-[1.02] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
            style={{ ...imageStyle, border: 'none', padding: 0, cursor: 'pointer' }}
            aria-label={`View larger image for ${project.title}`}
          />
        ) : (
          <div className="w-full" style={imageStyle} />
        )}
      </div>

      {/* Meta */}
      <div
        className="mt-5"
        style={{
          borderTop: '1px solid var(--silver-grey)',
          paddingTop: 16,
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-sans uppercase"
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.2em',
              color: 'var(--muted-text)',
            }}
          >
            {project.industry}
          </span>
          <span
            className="font-sans uppercase"
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.15em',
              color: project.chipStrong ? 'var(--muted-text)' : 'var(--platinum-grey)',
              border: '1px solid var(--silver-grey)',
              padding: '2px 8px',
            }}
          >
            {project.chipLabel ?? project.classification}
          </span>
        </div>

        <h3
          className="font-serif mt-3"
          style={{
            fontSize: '1.5rem',
            lineHeight: 1.2,
            color: 'var(--charcoal)',
          }}
        >
          {project.title}
        </h3>

        {project.tags && (
          <p
            className="font-sans uppercase mt-2"
            style={{ fontSize: '0.625rem', letterSpacing: '0.15em', color: 'var(--muted-text)', lineHeight: 1.7 }}
          >
            {project.tags.join(' · ')}
          </p>
        )}

        {project.demonstrates && (
          <p
            className="font-sans mt-2"
            style={{
              fontSize: '0.875rem',
              color: 'var(--charcoal)',
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            {project.demonstrates}
          </p>
        )}

        <div className="mt-4 flex flex-col" style={{ gap: 12 }}>
          <div>
            <span
              className="font-sans uppercase"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--muted-text)',
              }}
            >
              Problem
            </span>
            <p
              className="font-sans mt-1"
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--body-text)',
              }}
            >
              {project.problem}
            </p>
          </div>

          <div>
            <span
              className="font-sans uppercase"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--muted-text)',
              }}
            >
              Solution
            </span>
            <p
              className="font-sans mt-1"
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--body-text)',
              }}
            >
              {project.solution}
            </p>
          </div>

          <div>
            <span
              className="font-sans uppercase"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.15em',
                color: 'var(--muted-text)',
              }}
            >
              Deliverables
            </span>
            <p
              className="font-sans mt-1"
              style={{
                fontSize: '0.9375rem',
                lineHeight: 1.6,
                color: 'var(--body-text)',
              }}
            >
              {project.deliverables.join(' · ')}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.result && (
            <div
              style={{
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid var(--border-color)',
                padding: '8px 16px',
              }}
            >
              <span
                className="font-sans"
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--charcoal)',
                }}
              >
                {project.result}
              </span>
            </div>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--charcoal)',
                paddingBottom: 2,
                transition: 'color 0.2s ease, border-color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-text)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--silver-grey)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--charcoal)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--charcoal)';
              }}
            >
              {project.demoLabel ?? 'View Live Demo'} →
            </a>
          )}

          {project.slug && (
            <Link
              to={`/works/${project.slug}/`}
              className="font-sans"
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted-text)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--silver-grey)',
                paddingBottom: 2,
                transition: 'color 0.2s ease, border-color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--charcoal)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--charcoal)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-text)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--silver-grey)';
              }}
            >
              {project.ctaLabel ?? 'View Case Study →'}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

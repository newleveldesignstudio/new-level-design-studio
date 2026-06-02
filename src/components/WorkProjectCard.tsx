import { Link } from 'react-router-dom';

export interface WorkProject {
  imageSrc: string | null;
  imageAlt?: string;
  imageTitle?: string;
  industry: string;
  title: string;
  problem: string;
  solution: string;
  deliverables: string[];
  result: string;
  isSample?: boolean;
  slug?: string;
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

  return (
    <div className="group">
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
            to={`/works/${project.slug}`}
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
          {project.isSample && (
            <span
              className="font-sans uppercase"
              style={{
                fontSize: '0.625rem',
                letterSpacing: '0.15em',
                color: 'var(--platinum-grey)',
                border: '1px solid var(--silver-grey)',
                padding: '2px 8px',
              }}
            >
              Concept Build
            </span>
          )}
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
              to={`/works/${project.slug}`}
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
              Case Study →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

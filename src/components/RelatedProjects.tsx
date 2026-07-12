import { Link } from 'react-router-dom';
import { getRelatedProjects } from '@/data/works';

interface Props {
  /** slug of the current work detail page, e.g. "stone-timber-remodeling" */
  currentSlug: string;
}

/**
 * "More Local Business Projects" module for work/case-study detail pages.
 * Renders same-industry siblings (with sequential fill) as descriptive text
 * links so every project page has meaningful incoming internal links.
 */
export default function RelatedProjects({ currentSlug }: Props) {
  const related = getRelatedProjects(currentSlug);
  if (related.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-soft)',
        padding: 'clamp(48px, 6vw, 72px) 0',
        borderTop: '1px solid var(--silver-grey)',
        borderBottom: '1px solid var(--silver-grey)',
      }}
    >
      <div className="container-nlds">
        <p className="eyebrow">More Local Business Projects</p>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 28 }}
        >
          {related.map((project) => (
            <Link
              key={project.slug}
              to={`/works/${project.slug}`}
              style={{ textDecoration: 'none', display: 'block', height: '100%' }}
            >
              <article
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  padding: 'clamp(20px, 2.5vw, 28px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--charcoal)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                }}
              >
                <span
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-text)',
                  }}
                >
                  {project.industry}
                </span>
                <span
                  className="font-serif"
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.25,
                    color: 'var(--charcoal)',
                    marginTop: 10,
                  }}
                >
                  {project.title}
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

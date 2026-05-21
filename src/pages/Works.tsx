import ProjectCard from '@/components/ProjectCard';
import FinalCTA from '@/components/FinalCTA';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const projects = [
  { image: '/images/project-1.jpg', category: 'Branding', title: 'Brand Refresh', description: 'A polished visual system for a local business ready to stand out.' },
  { image: '/images/project-2.jpg', category: 'Website', title: 'Website Launch', description: 'A clean, fast website designed to convert visitors into customers.' },
  { image: '/images/project-3.jpg', category: 'Content', title: 'Content System', description: 'Short-form content strategy and production for social growth.' },
  { image: '/images/project-4.jpg', category: 'Branding', title: 'Visual Identity', description: 'Complete brand overhaul with logo, colors, and visual guidelines.' },
  { image: '/images/project-5.jpg', category: 'Content', title: 'Local Campaign', description: 'Targeted content campaign for a Volusia County business.' },
  { image: '/images/project-6.jpg', category: 'Branding', title: 'Studio Rebrand', description: 'Fresh visual direction for a fitness studio in Port Orange.' },
];

export default function Works() {
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.project-card' });

  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <p className="eyebrow">SELECTED WORK</p>
          <h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}
          >
            Work Built to Raise the Standard
          </h1>
          <div className="mt-20">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div key={i} className="project-card">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

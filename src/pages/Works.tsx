import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import WorkProjectCard from '@/components/WorkProjectCard';
import type { WorkProject } from '@/components/WorkProjectCard';
import ImageLightbox from '@/components/ImageLightbox';
import SEO from '@/components/SEO';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const filterCategories = [
  'All',
  'Contractors',
  'Restaurants',
  'Coffee & Cafés',
  'Salons & Barbers',
  'Real Estate',
  'Fitness',
  'Medical / Wellness',
  'Local Services',
  'Law Firms',
];

const projects: WorkProject[] = [
  {
    imageSrc: '/nlds/images/stone-timber-remodeling-cinematic-contractor-website-concept-nlds.jpg',
    imageAlt: 'Stone & Timber Remodeling cinematic contractor website concept by New Level Design Studio',
    imageTitle: 'Stone & Timber Remodeling — Cinematic Contractor Website Concept by New Level Design Studio',
    industry: 'Contractors',
    title: 'Stone & Timber Remodeling',
    problem: 'Most contractor websites rely on predictable templates — stock imagery, service card grids, and a generic call-to-action. No sense of craftsmanship, no project confidence, no reason to choose one firm over another.',
    solution: 'A cinematic contractor website concept built around full-screen construction video, scroll-driven storytelling, a pinned three-scene narrative, and a premium multi-step consultation flow.',
    deliverables: ['Cinematic full-screen video hero', 'Pinned scroll narrative (Plan · Build · Deliver)', 'Metrics animation', 'Editorial featured project', 'Multi-step consultation form', 'Responsive WebM/MP4 media', 'GSAP + Lenis motion system'],
    classification: 'Concept Build',
    demonstrates: 'Demonstrates a cinematic, trust-first website for a premium remodeling contractor.',
    slug: 'stone-timber-remodeling',
    demoUrl: 'https://stone-timber-remodeling-14f1e213.netlify.app',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach.png',
    imageAlt: 'Love Handles BBQ catering and food truck website concept by New Level Design Studio',
    imageTitle: 'Love Handles BBQ — BBQ Catering Website Concept by New Level Design Studio',
    industry: 'Restaurants',
    title: 'Love Handles BBQ',
    problem: 'Local BBQ catering and food truck business with an existing online presence that made booking harder than it needed to be — weak catering flow, unclear menu, and no strong mobile conversion path.',
    solution: 'Rebuilt as a local lead-generation website focused on catering inquiries, everyday truck menu visibility, food truck events, mobile usability, local SEO, social proof, and direct contact paths.',
    deliverables: ['Homepage direction', 'Truck menu page', 'Catering inquiry flow', 'Food truck events page', 'Mobile-first layout', 'Local SEO structure'],
    classification: 'Concept Build',
    demonstrates: 'Shows how a catering and food truck business can make booking and menu browsing effortless.',
    slug: 'love-handles-bbq',
    demoUrl: 'https://love-handles-bbq-nlds.netlify.app',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/el-taller-2026-restaurant-website-concept-nlds.jpg',
    imageAlt: 'El Taller 2026 restaurant website concept by New Level Design Studio',
    imageTitle: 'El Taller 2026 — Restaurant Website Concept by New Level Design Studio',
    industry: 'Restaurants',
    title: 'El Taller 2026',
    problem: 'Many local restaurant websites feel outdated, cluttered, or hard to use on mobile. Customers want to quickly understand the food, atmosphere, location, hours, and how to take action.',
    solution: 'Designed a cleaner restaurant website experience with stronger visual hierarchy, clearer menu presentation, premium atmosphere, and direct customer paths for viewing, contacting, or visiting.',
    deliverables: ['Restaurant landing page', 'Mobile-responsive layout', 'Menu presentation', 'Local business positioning'],
    classification: 'Concept Build',
    demonstrates: 'Explores a cleaner, mobile-first website direction for a local restaurant.',
    slug: 'el-taller-2026',
    demoUrl: 'https://el-taller-2026.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/ember-oak-coffee-website-concept-nlds.png',
    imageAlt: 'Ember & Oak Coffee Co. premium coffee shop website concept by New Level Design Studio',
    imageTitle: 'Ember & Oak Coffee Co. — Coffee Shop Website Concept by New Level Design Studio',
    industry: 'Coffee & Cafés',
    title: 'Ember & Oak Coffee Co.',
    problem: 'Most local coffee shop websites feel generic, outdated, or limited to a simple menu page. A specialty roaster needs to communicate craft, origin sourcing, café experience, wholesale capability, and ecommerce — all in one polished home.',
    solution: 'A premium coffee shop website concept with a full editorial homepage: hero, product sections, coffee finder, seasonal features, café visit details, wholesale inquiry positioning, journal cards, newsletter, and mobile-first design.',
    deliverables: ['Homepage design', 'Product section structure', 'Café visit section', 'Wholesale inquiry section', 'Journal layout', 'Mobile-responsive build'],
    classification: 'Concept Build',
    demonstrates: 'Shows how a coffee shop website can cover ordering, wholesale, and café visits in one homepage.',
    slug: 'ember-oak-coffee',
    demoUrl: 'https://ember-oak-coffee-nlds.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/coastal-roofing-quote-ready-landing-page-case-study-new-level-design-studio.png',
    imageAlt: 'Coastal Roofing quote-ready landing page case study by New Level Design Studio',
    industry: 'Contractors',
    title: 'Coastal Roofing',
    problem: 'Website was outdated, hard to navigate on mobile, and missing clear paths for visitors to request a quote.',
    solution: 'Built a direct landing page with service breakdown, social proof, and a simple quote request form.',
    deliverables: ['Landing page design', 'Quote form', 'Mobile layout', 'Local SEO structure'],
    classification: 'Concept Build',
    demonstrates: 'Demonstrates a direct, quote-ready landing page for a roofing contractor.',
    result: 'Quote-ready layout',
  },
  {
    imageSrc: '/files/nlds/images/la-tequila-port-orange-restaurant-website-design-case-study-nlds.png',
    imageAlt: 'La Tequila 2026 restaurant website concept by New Level Design Studio',
    imageTitle: 'La Tequila 2026 — Restaurant Website Concept by New Level Design Studio',
    industry: 'Restaurants',
    title: 'La Tequila 2026',
    problem: 'Many restaurant websites feel outdated, cluttered, or hard to use on mobile. Customers want to understand the food, vibe, location, and hours without friction.',
    solution: 'A premium restaurant website concept with a polished editorial layout, mobile-first structure, clear menu presentation, and direct paths to customer action.',
    deliverables: ['Restaurant landing page', 'Mobile-responsive layout', 'Menu and location clarity', 'Local business positioning'],
    classification: 'Concept Build',
    demonstrates: 'Explores a more premium, appetite-first website direction for a local restaurant.',
    slug: 'la-tequila-2026',
    demoUrl: 'https://la-tequila-2026.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/the-grass-guys-lawn-care-website-concept-nlds.jpg',
    imageAlt: 'The Grass Guys lawn care website concept by New Level Design Studio',
    imageTitle: 'The Grass Guys — Lawn Care Website Concept by New Level Design Studio',
    industry: 'Local Services',
    title: 'The Grass Guys',
    problem: 'Many local lawn care websites feel generic, outdated, or unclear about what services are offered and how to request a quote. Homeowners want to quickly understand the work, see professionalism, and take action without confusion.',
    solution: 'A clean, quote-focused website with a video-led hero section, clear service breakdowns, and direct calls to action. Built to make the brand feel reliable, approachable, and ready for homeowners looking for dependable lawn care.',
    deliverables: ['Local service landing page', 'Hero video integration', 'Quote-focused CTAs', 'Mobile-responsive layout'],
    classification: 'Concept Build',
    demonstrates: 'Demonstrates a reliable, quote-focused website for a lawn care business.',
    slug: 'the-grass-guys',
    demoUrl: 'https://flourishing-taiyaki-d7a1ea.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/the-best-landscape-2026-landscaping-website-concept-nlds.jpg',
    imageAlt: 'The Best Landscape 2026 landscaping website concept by New Level Design Studio',
    imageTitle: 'The Best Landscape 2026 — Landscaping Website Concept by New Level Design Studio',
    industry: 'Local Services',
    title: 'The Best Landscape 2026',
    problem: 'Many landscaping websites feel generic, outdated, or unclear. Potential customers want to understand services, service areas, project quality, and contact options before reaching out.',
    solution: 'A clean local-service layout with strong visual hierarchy, clear service framing, and mobile-first conversion paths built around trust and inquiry generation.',
    deliverables: ['Landscaping landing page', 'Mobile-responsive layout', 'Service presentation', 'Local business positioning'],
    classification: 'Concept Build',
    demonstrates: 'Shows how a landscaping business can present services and service areas clearly.',
    slug: 'the-best-landscape-2026',
    demoUrl: 'https://the-best-landscape-2026.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/dh-luxury-roofing-homepage-concept-nlds.png',
    imageAlt: 'Premium roofing website concept for DH Luxury Roofing by New Level Design Studio',
    imageTitle: 'DH Luxury Roofing — Roofing Website Concept by New Level Design Studio',
    industry: 'Contractors',
    title: 'DH Luxury Roofing',
    problem: 'Many roofing websites feel dated, aggressive, or hard to trust. Homeowners need to quickly understand inspection options, repair and replacement services, storm damage support, financing, and how to request help without pressure.',
    solution: 'A premium roofing landing page concept with a video-led hero, clear inspection CTA, slate and charcoal visual system, service cards, financing and insurance support, local service-area positioning, and mobile-first lead capture.',
    deliverables: ['Roofing landing page', 'Hero video integration', 'Lead form', 'Service-area section', 'Mobile-responsive layout'],
    classification: 'Concept Build',
    demonstrates: 'Demonstrates a stronger trust-first website for a premium roofing company.',
    slug: 'dh-luxury-roofing',
    demoUrl: 'https://dh-luxury-roofing-nlds.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/volusia-legal-group-law-firm-website-concept-nlds.png',
    imageAlt: 'Volusia Legal Group law firm website demo concept by New Level Design Studio',
    imageTitle: 'Volusia Legal Group — Law Firm Website Demo by New Level Design Studio',
    industry: 'Law Firms',
    title: 'Volusia Legal Group',
    problem: 'Many local law firm websites feel either overly corporate or visually neglected. Potential clients need to quickly understand practice areas, feel confident in the firm\'s credibility, and find a clear, low-friction way to start a conversation.',
    solution: 'A professional-services website concept with clear practice-area messaging, attorney introduction, trust signals, client process overview, and a simple consultation CTA — built for Port Orange and Volusia County.',
    deliverables: ['Law firm landing page', 'Practice area section', 'Attorney introduction', 'Client process overview', 'Mobile-responsive layout'],
    classification: 'Industry Demo',
    demonstrates: 'Shows how a local law firm can build credibility and simplify consultation requests.',
    slug: 'volusia-legal-group',
    demoUrl: 'https://volusia-legal-group-nlds.netlify.app/',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: null,
    industry: 'Medical / Wellness',
    title: 'Port Orange Med Spa',
    problem: 'Needed to compete with larger competitors but had no unified brand or booking-focused web presence.',
    solution: 'Created a full website and brand system with soft clinical elegance, clear service pages, and booking-focused structure.',
    deliverables: ['Website design', 'Brand system', 'Service pages', 'Booking flow'],
    classification: 'Concept Build',
    demonstrates: 'Explores a booking-focused website and brand system for a med spa.',
    result: 'Stronger mobile experience',
  },
  {
    imageSrc: '/nlds/images/new-level-design-studio-strand-salon-works-case-study-port-orange-web-design.png',
    imageAlt: 'Featured Works page case study for The Strand Salon website concept by New Level Design Studio in Port Orange.',
    imageTitle: 'The Strand Salon website case study by New Level Design Studio',
    industry: 'Salons & Barbers',
    title: 'The Strand Salon',
    problem: 'No website at all. Booking happened through social DMs, which made it hard to manage and easy to miss.',
    solution: 'Built a clean, one-page website with service list, pricing, hours, and a direct booking link.',
    deliverables: ['One-page website', 'Service list', 'Booking link integration', 'Mobile layout'],
    classification: 'Concept Build',
    demonstrates: 'Demonstrates a simple, direct-booking website for a one-location salon.',
    result: 'Better service structure',
  },
  {
    imageSrc: '/nlds/images/lotus-beauty-house-salon-website-concept-nlds.jpg',
    imageAlt: 'Lotus Beauty House hair and nail salon website concept by New Level Design Studio',
    imageTitle: 'Lotus Beauty House — Hair & Nail Salon Website Concept by New Level Design Studio',
    industry: 'Salons & Barbers',
    title: 'Lotus Beauty House',
    problem: 'Local salons often rely heavily on Google, Facebook, word-of-mouth, and scattered photos. That can work, but it does not always give new clients one clear place to understand the services, trust the experience, and know how to book.',
    solution: 'A premium editorial salon concept with a calm visual system, clear service structure, mobile-first booking flow, review-ready trust sections, and a stronger first impression for beauty clients.',
    deliverables: ['Editorial hero section', 'Service cards for hair and nails', 'Specialist-focused section', 'Color-supported gallery', 'Review section', 'Mobile-responsive layout'],
    classification: 'Concept Build',
    demonstrates: 'A premium hair and nail salon concept built to show how a local beauty business can turn services, trust, reviews, and booking information into a polished online presence.',
    slug: 'lotus-beauty-house',
    demoUrl: 'https://lotus-beauty-house-nlds.netlify.app',
    demoLabel: 'View Concept',
    ctaLabel: 'View Case Study →',
  },
  {
    imageSrc: '/nlds/images/aureline-estates-luxury-real-estate-website-concept-nlds.png',
    imageAlt: 'Aureline Estates luxury coastal real estate website concept by New Level Design Studio',
    imageTitle: 'Aureline Estates — Luxury Coastal Real Estate Website Concept by New Level Design Studio',
    industry: 'Real Estate',
    title: 'Aureline Estates',
    problem: 'Luxury real estate buyers and sellers along Florida\'s Atlantic coast expect a digital experience that matches the caliber of the homes they are considering — not a generic listing template that looks like every other agency in the market.',
    solution: 'A full multi-page luxury real estate website concept with a 4K video hero, curated property collection with filter and detail pages, buyer and seller advisory pathways, six-market area structure, principal profiles, and a Calendly-powered private consultation flow.',
    deliverables: ['4K video hero with scroll parallax', 'Property collection and detail pages', 'Buyer and seller advisory pages', 'Six coastal market structure', 'Principal profile pages', 'Private consultation flow', 'Mobile-first responsive build'],
    classification: 'Concept Build',
    demonstrates: 'Explores a more premium digital presence for a luxury coastal real estate brand.',
    slug: 'aureline-estates',
    ctaLabel: 'View Case Study →',
  },
  {
    imageSrc: '/nlds/images/crescent-harbor-realty-coastal-real-estate-website-demo-nlds.jpg',
    imageAlt: 'Crescent Harbor Realty boutique coastal real estate website demo by New Level Design Studio',
    imageTitle: 'Crescent Harbor Realty — Boutique Coastal Real Estate Website Demo by New Level Design Studio',
    industry: 'Real Estate',
    title: 'Crescent Harbor Realty',
    problem: 'Most coastal real estate websites feel like repainted MLS portals — no editorial hierarchy, no scroll motion, no sense of who the agency is or what makes them worth a conversation.',
    solution: 'A single-page boutique real estate experience with a GSAP-animated split-screen hero, horizontally pinned featured property scroll, neighborhood editorial grid, sell/buy tab advisory section, and a five-step consultation methodology.',
    deliverables: ['Editorial split-screen hero', 'GSAP scroll animation system', 'Featured property horizontal scroll', 'Neighborhood editorial grid', 'Sell & Buy tab advisory section', 'Our Method trust section', 'Brand token design system', 'Mobile-first responsive layout'],
    classification: 'Industry Demo',
    demonstrates: 'Shows how a boutique real estate agency can present itself with editorial polish.',
    slug: 'crescent-harbor',
    demoUrl: 'https://crescent-harbor-realty-nlds.netlify.app',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/coastal-standard-realty-luxury-coastal-real-estate-website-demo-nlds.jpg',
    imageAlt: 'Coastal Standard Realty luxury coastal real estate website demo by New Level Design Studio',
    imageTitle: 'Coastal Standard Realty — Luxury Real Estate Website Demo by New Level Design Studio',
    industry: 'Real Estate',
    title: 'Coastal Standard Realty',
    problem: 'Luxury real estate clients do not respond to generic property websites. They need an experience that feels curated, calm, and aligned with the value of the homes being represented — not a standard listing template.',
    solution: 'A premium editorial real estate website with refined typography, image-led property presentation, clear buyer and seller pathways, market-area structure, and a private consultation flow designed to build trust before the first conversation.',
    deliverables: ['Luxury real estate website concept', 'Homepage system', 'Featured property layout', 'Buyer and seller pathways', 'Market-area structure', 'Private consultation flow', 'Mobile-first responsive build'],
    classification: 'Industry Demo',
    demonstrates: 'Demonstrates a calm, private-feeling website for a luxury real estate brand.',
    slug: 'coastal-standard-realty',
    demoUrl: 'https://coastal-standard-realty-nlds.netlify.app',
    demoLabel: 'View Concept Website',
  },
  {
    imageSrc: '/nlds/images/harbor-homes-group-coastal-real-estate-listing-website-design-nlds.png',
    imageAlt: 'Harbor Homes Group coastal real estate listing website design by New Level Design Studio',
    imageTitle: 'Harbor Homes Group coastal real estate listing website design by New Level Design Studio',
    industry: 'Real Estate',
    title: 'Harbor Homes Group',
    problem: 'Property listings were buried in generic templates. Buyers could not quickly see what was available or how to reach the agent.',
    solution: 'A premium coastal real estate listing website concept with featured listings, property search, agent contact paths, and showing request flow.',
    deliverables: ['Listing page design', 'Agent profile section', 'Contact form', 'Mobile layout'],
    classification: 'Concept Build',
    demonstrates: 'Shows how a real estate listing website can make properties easier to browse and inquire about.',
    result: 'Clearer first impression',
  },
  {
    imageSrc: '/files/nlds/images/iron-house-gym-class-schedule-membership-landing-page-case-study-nlds.png',
    imageAlt: 'Iron House Gym class schedule and membership landing page case study by New Level Design Studio',
    imageTitle: 'Iron House Gym Landing Page Case Study',
    industry: 'Fitness',
    title: 'Iron House Gym',
    problem: 'Social media presence was strong but there was no website to direct traffic toward. Potential members had nowhere to learn about classes or pricing.',
    solution: 'Built a sharp, minimal website with class schedule, pricing tiers, and a clear membership call to action.',
    deliverables: ['Website design', 'Class schedule', 'Pricing page', 'CTA structure'],
    classification: 'Concept Build',
    demonstrates: 'Demonstrates a simple, membership-focused website for a local gym.',
    result: 'Better service structure',
  },
];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxProject, setLightboxProject] = useState<WorkProject | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.industry === activeFilter);

  const worksRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.7,
    stagger: 0.15,
    start: 'top 80%',
    childSelector: '.work-card',
  });

  /* Close lightbox when filter changes */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLightboxProject(null);
  }, [activeFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = useCallback((project: WorkProject) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setLightboxProject(project);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxProject(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  }, []);

  return (
    <div>
      <SEO
        title="Selected Website Work | NLDS"
        description="Independent concept builds and industry demonstrations showing website strategy, design direction, and conversion structure for local businesses in Port Orange, Daytona Beach, and Volusia County."
        canonical="https://newlvlstudio.com/works"
      />
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '140px 0 0' }}>
        <motion.div
          className="container-nlds"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>SELECTED WORK</motion.p>
          <motion.h1
            className="font-serif mt-5"
            style={{
              fontSize: 'clamp(2.25rem, 5.5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 720,
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Selected Website Work
          </motion.h1>
          <motion.p
            className="font-sans mt-6"
            style={{ fontSize: '0.875rem', color: 'var(--muted-text)', maxWidth: 520, lineHeight: 1.65 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            These projects show website strategy, design direction, and conversion structure for local-business industries. Concept builds are independent demonstrations, not commissioned client work unless labeled otherwise.
          </motion.p>
          <motion.div className="mt-14" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* Filters */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '40px 0 0' }}>
        <div className="container-nlds">
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setLightboxProject(null);
                  setActiveFilter(cat);
                }}
                className="font-sans uppercase transition-colors duration-200"
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.15em',
                  padding: '8px 16px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: activeFilter === cat ? 'var(--charcoal)' : 'var(--surface)',
                  color: activeFilter === cat ? 'var(--white)' : 'var(--muted-text)',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Concept demo note */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '24px 0 0' }}>
        <div className="container-nlds">
          <p
            className="font-sans"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--muted-text)',
              lineHeight: 1.6,
              padding: '14px 18px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-soft)',
              maxWidth: 680,
            }}
          >
            Concept builds are independent demonstrations created by New Level Design Studio to show website strategy, design direction, and conversion structure. They were not commissioned by, affiliated with, or endorsed by the businesses named unless a project is explicitly labeled Client Work.
          </p>
        </div>
      </section>

      {/* How to read the work */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '48px 0 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">How to Read the Work</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6" style={{ maxWidth: 900 }}>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 16 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Strategy
              </h3>
              <p className="font-sans mt-2" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                What the website needs to communicate and why.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 16 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Structure
              </h3>
              <p className="font-sans mt-2" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                How the page guides visitors from first impression to inquiry.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 16 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Trust
              </h3>
              <p className="font-sans mt-2" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                How visuals, copy, proof, and calls-to-action make the business easier to choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '60px 0 100px' }}>
        <div className="container-nlds">
          <div ref={worksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, i) => (
              <div key={i} className="work-card">
                <WorkProjectCard
                  project={project}
                  onImageClick={project.imageSrc && !project.slug ? () => handleImageClick(project) : undefined}
                />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p
              className="font-sans text-center mt-16"
              style={{ fontSize: '1rem', color: 'var(--muted-text)' }}
            >
              No projects in this category yet. Check back soon or reach out to start one.
            </p>
          )}
        </div>
      </section>

      <ImageLightbox project={lightboxProject} onClose={handleCloseLightbox} />

      {/* Final CTA */}
      <FinalCTA
        heading="Have a Project in Mind?"
        body="We work with local businesses across Volusia County. Tell us what you are building and we will see how we can help."
        buttonText="Discuss Your Website"
      />
    </div>
  );
}

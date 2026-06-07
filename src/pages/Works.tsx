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
  'Starter Packs',
];

const projects: WorkProject[] = [
  {
    imageSrc: '/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach.png',
    imageAlt: 'Love Handles BBQ catering and food truck website concept by New Level Design Studio',
    imageTitle: 'Love Handles BBQ — BBQ Catering Website Concept by New Level Design Studio',
    industry: 'Restaurants',
    title: 'Love Handles BBQ',
    problem: 'Local BBQ catering and food truck business with an existing online presence that made booking harder than it needed to be — weak catering flow, unclear menu, and no strong mobile conversion path.',
    solution: 'Rebuilt as a local lead-generation website focused on catering inquiries, everyday truck menu visibility, food truck events, mobile usability, local SEO, social proof, and direct contact paths.',
    deliverables: ['Homepage direction', 'Truck menu page', 'Catering inquiry flow', 'Food truck events page', 'Mobile-first layout', 'Local SEO structure'],
    result: 'BBQ Catering Website Concept',
    isSample: true,
    slug: 'love-handles-bbq',
    demoUrl: 'https://love-handles-bbq-nlds.netlify.app',
    demoLabel: 'View Live Demo',
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
    result: 'Restaurant Website Concept',
    isSample: true,
    slug: 'el-taller-2026',
    demoUrl: 'https://el-taller-2026.netlify.app/',
    demoLabel: 'View Industry Demo',
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
    result: 'Coffee Shop Website Concept',
    isSample: true,
    slug: 'ember-oak-coffee',
    demoUrl: 'https://ember-oak-coffee-nlds.netlify.app/',
    demoLabel: 'View Live Demo',
  },
  {
    imageSrc: '/nlds/images/coastal-roofing-quote-ready-landing-page-case-study-new-level-design-studio.png',
    imageAlt: 'Coastal Roofing quote-ready landing page case study by New Level Design Studio',
    industry: 'Contractors',
    title: 'Coastal Roofing',
    problem: 'Website was outdated, hard to navigate on mobile, and missing clear paths for visitors to request a quote.',
    solution: 'Built a direct landing page with service breakdown, social proof, and a simple quote request form.',
    deliverables: ['Landing page design', 'Quote form', 'Mobile layout', 'Local SEO structure'],
    result: 'Quote-ready layout',
    isSample: true,
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
    result: 'Restaurant Website Concept',
    isSample: true,
    slug: 'la-tequila-2026',
    demoUrl: 'https://la-tequila-2026.netlify.app/',
    demoLabel: 'View Industry Demo',
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
    result: 'Lawn Care Website Concept',
    isSample: true,
    slug: 'the-grass-guys',
    demoUrl: 'https://flourishing-taiyaki-d7a1ea.netlify.app/',
    demoLabel: 'View Industry Demo',
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
    result: 'Landscaping Website Concept',
    isSample: true,
    slug: 'the-best-landscape-2026',
    demoUrl: 'https://the-best-landscape-2026.netlify.app/',
    demoLabel: 'View Industry Demo',
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
    result: 'Roofing Website Concept',
    isSample: true,
    slug: 'dh-luxury-roofing',
    demoUrl: 'https://dh-luxury-roofing-nlds.netlify.app/',
    demoLabel: 'View Industry Demo',
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
    result: 'Law Firm Website Demo',
    isSample: true,
    slug: 'volusia-legal-group',
    demoUrl: 'https://volusia-legal-group-nlds.netlify.app/',
    demoLabel: 'View Industry Demo',
  },
  {
    imageSrc: null,
    industry: 'Medical / Wellness',
    title: 'Port Orange Med Spa',
    problem: 'Needed to compete with larger competitors but had no unified brand or booking-focused web presence.',
    solution: 'Created a full website and brand system with soft clinical elegance, clear service pages, and booking-focused structure.',
    deliverables: ['Website design', 'Brand system', 'Service pages', 'Booking flow'],
    result: 'Stronger mobile experience',
    isSample: true,
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
    result: 'Better service structure',
    isSample: true,
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
    result: 'Luxury Real Estate Website Concept',
    isSample: true,
    slug: 'aureline-estates',
    ctaLabel: 'View Industry Demo →',
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
    result: 'Luxury Real Estate Website Demo',
    isSample: true,
    slug: 'coastal-standard-realty',
    demoUrl: 'https://coastal-standard-realty-nlds.netlify.app',
    demoLabel: 'View Industry Demo',
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
    result: 'Clearer first impression',
    isSample: true,
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
    result: 'Better service structure',
    isSample: true,
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
        title="Selected Work — Website & Brand Projects | New Level Design Studio"
        description="Explore concept builds, website systems, brand visuals, and local business design work from New Level Design Studio."
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
            Selected Work — Websites, Brands, and Content Systems
          </motion.h1>
          <motion.p
            className="font-sans mt-6"
            style={{ fontSize: '0.875rem', color: 'var(--muted-text)', maxWidth: 520, lineHeight: 1.65 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Website concepts, local business demos, and selected builds showing how NLDS structures stronger first impressions for service businesses, restaurants, contractors, real estate, wellness, and local brands. Client work is labeled separately.
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

import ConceptCaseStudy from '@/components/ConceptCaseStudy';

export default function WorkArcticAirworks() {
  return (
    <ConceptCaseStudy
      slug="arctic-airworks"
      title="Arctic Airworks"
      seoTitle="Arctic Airworks — HVAC Website Concept | NLDS"
      seoDescription="An industry demo HVAC website concept: an interactive build around Florida heat, whole-home comfort and system clarity, with a condenser transformation scroll hero and a whole-home airflow sequence."
      eyebrow="HVAC Website Concept · Industry Demo"
      category="HVAC Website Concept"
      industry="HVAC / Home Services"
      intro="An interactive HVAC concept built around Florida heat, whole-home comfort and system clarity."
      demoUrl="https://arctic-airworks-demo.netlify.app"
      demoHost="arctic-airworks-demo.netlify.app"
      ogImage="/nlds/images/arctic-airworks-hvac-industry-demo-website-concept-nlds.jpg"
      hero={{ base: '/nlds/images/arctic-airworks-hvac-industry-demo-website-concept-nlds', alt: 'Arctic Airworks industry demo website, desktop view of the opened HVAC condenser hero' }}
      second={{ base: '/nlds/images/arctic-airworks-hvac-industry-demo-whole-home-nlds', alt: 'Arctic Airworks industry demo website, the Whole-Home Comfort Network section with airflow through a two-storey Florida home', width: 1440, height: 900 }}
      problem="Many HVAC sites rely on generic stock photography and service lists without showing how comfort is actually delivered."
      direction="Turn the HVAC system itself into the visual story."
      highlights={[
        'Mechanical transformation hero',
        'Florida-specific comfort messaging',
        'Whole-home airflow storytelling',
        'Mobile-first pinned scroll',
        'Reduced-motion fallback',
        'Responsive AVIF/WebP assets',
        'Accessibility and performance considerations',
      ]}
      deliverables={['Condenser transformation scroll hero', 'Florida Heat. Engineered Out. section', 'Whole-Home Comfort Network sequence', 'Mobile-first pinned scroll', 'Reduced-motion fallback', 'Responsive AVIF/WebP image delivery']}
      demonstrates={[
        'How an HVAC website can show the system itself instead of leaning on stock photography.',
        'A whole-home airflow story that explains how comfort is delivered, room by room.',
        'A mobile-first motion build that still works for visitors who prefer reduced motion.',
      ]}
    />
  );
}

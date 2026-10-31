import ConceptCaseStudy from '@/components/ConceptCaseStudy';

export default function WorkPrecisionLineRoofing() {
  return (
    <ConceptCaseStudy
      slug="precision-line-roofing"
      title="Precision Line Roofing"
      seoTitle="Precision Line Roofing — Roofing Website Concept | NLDS"
      seoDescription="An industry demo roofing website concept: an inspection-first experience with a premium charcoal and copper visual system, a trust-led structure and a clear path to requesting service."
      eyebrow="Roofing Website Concept · Industry Demo"
      category="Roofing Website Concept"
      industry="Roofing / Home Services"
      intro="A premium Florida roofing concept built around homeowner trust, roof inspections and a clear path to requesting service."
      demoUrl="https://precision-line-roofing-demo.netlify.app"
      demoHost="precision-line-roofing-demo.netlify.app"
      ogImage="/nlds/images/precision-line-roofing-industry-demo-website-concept-nlds.jpg"
      hero={{ base: '/nlds/images/precision-line-roofing-industry-demo-website-concept-nlds', alt: 'Precision Line Roofing industry demo website, desktop view of the storm-ready roofing hero' }}
      second={{ base: '/nlds/images/precision-line-roofing-industry-demo-mobile-site-nlds', alt: 'Precision Line Roofing industry demo website, phone view', width: 780, height: 1688 }}
      problem="Roofing customers are evaluating urgency, trust and risk before contacting a contractor."
      direction="Create a premium inspection-first experience that makes the next action obvious."
      highlights={[
        'Inspection CTA as the primary path',
        'Trust-led structure',
        'Premium roofing visual identity in charcoal and copper',
        'Florida homeowner positioning',
        'Mobile conversion path',
        'Clear service hierarchy',
      ]}
      deliverables={['Scroll-driven inspection hero', 'Mobile-first navigation', 'Service-path section', 'Before/after project comparison', 'Inspection request flow (demo)', 'Responsive build']}
      demonstrates={[
        'An inspection-first path that makes the next step clear to a homeowner weighing urgency and risk.',
        'A trust-led page structure and service hierarchy for a roofing contractor.',
        'A mobile presentation built around the request-service action.',
      ]}
    />
  );
}

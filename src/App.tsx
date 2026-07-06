import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useLenis } from '@/hooks/useLenis';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Works from '@/pages/Works';
import Studio from '@/pages/Studio';
import MichaelVail from '@/pages/MichaelVail';
import Packages from '@/pages/Packages';
import StarterPack from '@/pages/StarterPack';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import ArticleDetail from '@/pages/ArticleDetail';
import Journal from '@/pages/Journal';
import WorkElTaller from '@/pages/WorkElTaller';
import WorkLaTequila from '@/pages/WorkLaTequila';
import WorkTheBestLandscape from '@/pages/WorkTheBestLandscape';
import WorkTheGrassGuys from '@/pages/WorkTheGrassGuys';
import WorkDhLuxuryRoofing from '@/pages/WorkDhLuxuryRoofing';
import WorkVolusiaLegalGroup from '@/pages/WorkVolusiaLegalGroup';
import WorkEmberOakCoffee from '@/pages/WorkEmberOakCoffee';
import WorkLoveHandlesBbq from '@/pages/WorkLoveHandlesBbq';
import WorkCrescentHarbor from '@/pages/WorkCrescentHarbor';
import WorkCoastalStandardRealty from '@/pages/WorkCoastalStandardRealty';
import WorkAurelineEstates from '@/pages/WorkAurelineEstates';
import WorkStoneTimberRemodeling from '@/pages/WorkStoneTimberRemodeling';
import WorkLotusBeautyHouse from '@/pages/WorkLotusBeautyHouse';
import WorkBlendHouseSmoothieBar from '@/pages/WorkBlendHouseSmoothieBar';
import PortOrangeWebDesign from '@/pages/PortOrangeWebDesign';
import DaytonaBeachWebDesign from '@/pages/DaytonaBeachWebDesign';
import VolusiaCountyWebDesign from '@/pages/VolusiaCountyWebDesign';
import CentralFloridaWebDesign from '@/pages/CentralFloridaWebDesign';
import FreeSeoTools from '@/pages/FreeSeoTools';
import LocalVisibilityInsights from '@/pages/LocalVisibilityInsights';
import LocalVisibilityWebsiteTrust from '@/pages/LocalVisibilityWebsiteTrust';
import LocalVisibilityCustomerDecisionPath from '@/pages/LocalVisibilityCustomerDecisionPath';
import LocalVisibilityGoogleProfileCompleteness from '@/pages/LocalVisibilityGoogleProfileCompleteness';
import LocalVisibilityContactInformation from '@/pages/LocalVisibilityContactInformation';
import LocalVisibilityReviewRecency from '@/pages/LocalVisibilityReviewRecency';
import LocalVisibilityMobileReadiness from '@/pages/LocalVisibilityMobileReadiness';
import NotFound from '@/pages/NotFound';

const OpsDashboard = lazy(() => import('@/pages/OpsDashboard'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* When adding a public route here, also add it to src/data/routes.ts
            (the sitemap/prerender manifest). The prerender step fails if a
            manifest route renders Page Not Found. */}
        {/* Private internal route — no Layout wrapper, no nav/footer */}
        <Route path="/ops" element={<Suspense fallback={null}><OpsDashboard /></Suspense>} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Works />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/michael-vail" element={<MichaelVail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/starter-pack" element={<StarterPack />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<ArticleDetail />} />
          <Route path="/works/el-taller-2026" element={<WorkElTaller />} />
          <Route path="/works/la-tequila-2026" element={<WorkLaTequila />} />
          <Route path="/works/the-best-landscape-2026" element={<WorkTheBestLandscape />} />
          <Route path="/works/the-grass-guys" element={<WorkTheGrassGuys />} />
          <Route path="/works/dh-luxury-roofing" element={<WorkDhLuxuryRoofing />} />
          <Route path="/works/volusia-legal-group" element={<WorkVolusiaLegalGroup />} />
          <Route path="/works/ember-oak-coffee" element={<WorkEmberOakCoffee />} />
          <Route path="/works/love-handles-bbq" element={<WorkLoveHandlesBbq />} />
          <Route path="/works/crescent-harbor" element={<WorkCrescentHarbor />} />
          <Route path="/works/coastal-standard-realty" element={<WorkCoastalStandardRealty />} />
          <Route path="/works/aureline-estates" element={<WorkAurelineEstates />} />
          <Route path="/works/stone-timber-remodeling" element={<WorkStoneTimberRemodeling />} />
          <Route path="/works/lotus-beauty-house" element={<WorkLotusBeautyHouse />} />
          <Route path="/works/blend-house-smoothie-bar" element={<WorkBlendHouseSmoothieBar />} />
          <Route path="/port-orange-website-design" element={<PortOrangeWebDesign />} />
          <Route path="/daytona-beach-website-design" element={<DaytonaBeachWebDesign />} />
          <Route path="/volusia-county-website-design" element={<VolusiaCountyWebDesign />} />
          <Route path="/central-florida-website-design" element={<CentralFloridaWebDesign />} />
          <Route path="/free-seo-tools" element={<FreeSeoTools />} />
          <Route path="/local-visibility-insights" element={<LocalVisibilityInsights />} />
          <Route path="/local-visibility-insights/website-trust" element={<LocalVisibilityWebsiteTrust />} />
          <Route path="/local-visibility-insights/customer-decision-path" element={<LocalVisibilityCustomerDecisionPath />} />
          <Route path="/local-visibility-insights/google-profile-completeness" element={<LocalVisibilityGoogleProfileCompleteness />} />
          <Route path="/local-visibility-insights/contact-information" element={<LocalVisibilityContactInformation />} />
          <Route path="/local-visibility-insights/review-recency" element={<LocalVisibilityReviewRecency />} />
          <Route path="/local-visibility-insights/mobile-readiness" element={<LocalVisibilityMobileReadiness />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

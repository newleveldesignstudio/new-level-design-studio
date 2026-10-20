// NLDS SEO Intelligence v2: every threshold, weight and heuristic lives here. Nothing is hidden elsewhere.
export const SCHEMA_VERSION = "2.0.0";
export const CONFIG = {
  // ACT gates (evidence floor). Below these an item can still be reported, but only under Monitor / Do Not Act.
  gates: { queryMinImpressions: 10, queryMinDays: 3, pageMinImpressions: 20, clusterMinImpressions: 10, clusterMinDays: 3, monitorFloorImpressions: 3, pageEmitImpressions: 10, queryEmitImpressions: 5 },
  striking: { minPos: 6, maxPos: 20 },
  // CTR is a HEURISTIC: expected CTR = pooled CTR of NLDS rows within +-window positions (same granularity, row itself excluded), used only
  // when that pool has >= benchmarkMinClicks clicks. Otherwise: "cannot benchmark yet" (+ a zero-click heuristic flag, confidence-capped).
  ctr: { window: 3, benchmarkMinClicks: 5, flagBelowRatio: 0.5, minExpectedClicks: 3, zeroClickMaxPos: 10, zeroClickMinPageImpressions: 20, zeroClickMinQueryImpressions: 10, cannotBenchmarkConfidenceCap: 0.45 },
  decay: { pageMinPrevImpressions: 20, queryMinPrevImpressions: 10, minRelativeDrop: 0.4, minAbsoluteDrop: 10, positionWorsen: 3, demandTolerance: 0.25 },
  cannibalization: { minImpressionsEach: 3, trueMinImpressionsEach: 5, topShareMax: 0.7, positionGapMax: 10, consolidateMinEach: 10 },
  // Owner locks and post-window change notes are PRIVATE: they are read per dataset from <input>/scanner.local.json (never from this public repo).
  // Shape: { "locks": [{url, actions[], until, reason}], "recentChanges": [{url, date, note}] }. Defaults are empty.
  locks: [],
  recentChanges: [],
  title: { genericTokens: ["get", "more", "from", "search", "best", "near"], minMissingShare: 0.5 }, // a title is only "misaligned" when half the meaningful query words are absent
  striking_page: { minVisibleShare: 0.3 }, // page-level striking needs queries covering >=30% of the page impressions
  links: { sitewideSkipChromeInbound: 20, weakInboundMax: 1, tractionMinImpressions: 20, maxSuggestions: 5, themeHubMaxShare: 0.3 },
  gaps: { minClusterImpressions: 10, minQueryCommercial: 0.6, maxBestCoverage: 0.67 },
  burst: { topDays: 2, maxShare: 0.4, minImpressions: 10, samplePenalty: 0.6 }, // impressions piled on a few days look like self-search/rank-tracker noise
  // Opportunity score = 100 * sum(weight_i * component_i) - effort penalty - risk penalty. Components are 0..1. Confidence is NOT in the score.
  weights: { demand: 0.20, proximity: 0.20, ctrGap: 0.12, trend: 0.10, commercial: 0.15, relevance: 0.13, traction: 0.10 },
  penalties: { effort: 15, risk: 10 },
  effort: { "improve title/meta": 0.1, "add internal links": 0.15, "strengthen service intent": 0.3, "expand existing section": 0.4, "refresh outdated section": 0.45, "investigate cannibalization": 0.3, "consolidate overlapping content": 0.8, "create supporting article": 0.7, "create service/landing page": 0.9, "monitor only / insufficient evidence": 0 },
  // Confidence is separate: weighted sample-size/consistency evidence, 0..1. ACT requires >= medium.
  confidence: { weights: { sample: 0.35, days: 0.25, agreement: 0.20, visibility: 0.10, clicks: 0.10 }, high: 0.7, medium: 0.5 },
  actMinConfidence: "medium",
};
export const ACTIONS = Object.keys(CONFIG.effort);

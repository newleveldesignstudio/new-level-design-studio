/**
 * Cosmetic-only display labels for article categories.
 * Does not affect filtering, URL query params, or article data —
 * article.category values, slugs, and dates remain unchanged.
 */
export const CATEGORY_DISPLAY_LABELS: Record<string, string> = {
  'Content Systems': 'Website Insights',
};

export function getCategoryDisplayLabel(category: string): string {
  return CATEGORY_DISPLAY_LABELS[category] ?? category;
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
] as const;

/**
 * Converts a human-readable "Month D, YYYY" date (the format used for
 * visible article bylines in src/data/articles.ts) to ISO 8601
 * (YYYY-MM-DD) for use in JSON-LD datePublished/dateModified fields.
 * Schema.org/Google Rich Results require ISO 8601; the visible byline
 * stays untouched — this only affects the machine-readable date.
 * Throws if the input isn't in the expected format, rather than silently
 * emitting an invalid date into structured data.
 */
export function toISODate(humanDate: string): string {
  const match = humanDate.trim().match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (!match) {
    throw new Error(`toISODate: unrecognized date format "${humanDate}"`);
  }
  const [, monthName, day, year] = match;
  const monthIndex = MONTHS.indexOf(monthName.toLowerCase() as (typeof MONTHS)[number]);
  if (monthIndex === -1) {
    throw new Error(`toISODate: unrecognized month "${monthName}" in "${humanDate}"`);
  }
  const mm = String(monthIndex + 1).padStart(2, '0');
  const dd = String(Number(day)).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

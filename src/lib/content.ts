import { getCollection } from 'astro:content';

export type Section = 'case-studies' | 'decisions' | 'build-log' | 'lab';

export const SECTION_PATHS: Record<Section, string> = {
  'case-studies': '/case-studies/',
  decisions: '/decisions/',
  'build-log': '/build-log/',
  lab: '/lab/',
};

export const SECTION_LABELS: Record<Section, string> = {
  'case-studies': 'Case study',
  decisions: 'Decision record',
  'build-log': 'Build log',
  lab: 'Lab',
};

export const BACK_LABELS: Record<Section, string> = {
  'case-studies': 'All case studies',
  decisions: 'All decision records',
  'build-log': 'All build log entries',
  lab: 'Everything in the lab',
};

// Drafts show in `npm run dev`. In a production build they are left out,
// unless SHOW_DRAFTS=1 is set (useful for checking a draft's layout).
const showDrafts = () => import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

export async function getPublished(section: Section) {
  const entries = await getCollection(section, (entry: any) => showDrafts() || !entry.data.draft);
  return entries.sort((a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

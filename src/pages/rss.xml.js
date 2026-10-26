import rss from '@astrojs/rss';
import { getPublished, SECTION_PATHS } from '../lib/content';
import { SITE } from '../site';

export async function GET(context) {
  const sections = ['case-studies', 'decisions', 'build-log'];
  const groups = await Promise.all(sections.map((section) => getPublished(section)));

  const items = groups
    .flatMap((entries, i) =>
      entries.map((entry) => ({
        title: entry.data.title,
        description: entry.data.summary,
        pubDate: entry.data.date,
        link: `${SECTION_PATHS[sections[i]]}${entry.id}/`,
      })),
    )
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items,
  });
}

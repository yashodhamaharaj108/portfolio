import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// The production URL. Keep in sync with src/site.ts and public/CNAME.
export default defineConfig({
  site: 'https://www.lekishamaharaj.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Leave ```mermaid blocks as plain code so the page can render them as diagrams.
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});

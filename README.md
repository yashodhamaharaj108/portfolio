# Portfolio

The source for [www.lekishamaharaj.com](https://www.lekishamaharaj.com): case studies, decision records and a running build log on solutions architecture and AI engineering. Built with [Astro](https://astro.build) and published to GitHub Pages.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321, drafts are visible
npm run build    # production build into dist/, drafts are left out
npm run preview  # serve the production build
```

Node 22.23.4 or newer is required (`.nvmrc` pins 24).

## Where things live

| What | Where |
| --- | --- |
| Name, links, comment settings | `src/site.ts` |
| Case studies | `src/content/case-studies/` |
| Decision records | `src/content/decisions/` |
| Build log | `src/content/build-log/` |
| Lab (interactive pieces) | `src/content/lab/` |
| Page layouts and the home-page diagram | `src/layouts/`, `src/components/` |
| Colours, type and spacing | `src/styles/global.css` |
| Custom domain | `public/CNAME` and `site` in `astro.config.mjs` |

## Writing

Add a Markdown file to one of the content folders. Each has a few required fields at the top:

```yaml
---
title: 'Short, specific title'
summary: 'One sentence that appears in lists and link previews.'
date: 2026-10-26
draft: true   # hidden from the published site until you remove it or set it to false
---
```

- Decision records also need `status`: `Proposed`, `Accepted`, `Superseded` or `Rejected`.
- Case studies can list a `stack`, and build log entries can have `tags`.
- A ` ```mermaid ` code block renders as a diagram. `src/content/case-studies/template.md` has an example to copy.
- To check how a draft looks in a production build, run `SHOW_DRAFTS=1 npm run build`.

## Interactive pieces

The lab holds anything that is easier to click through than to read about. Lab entries are `.mdx` rather than `.md`, which lets them import components, and they render in a wider column so diagrams have room.

### The SystemMap component

`src/components/SystemMap.astro` draws an architecture diagram where selecting a stage shows the trade-off behind it. Import it at the top of a lab entry and pass it stages:

```mdx
import SystemMap from '../../components/SystemMap.astro';

<SystemMap
  label="A batch import, stage by stage"
  caption="Select a stage to see what it costs."
  stages={[
    {
      id: 'receive',
      title: 'Receive',
      blurb: 'One line, shown on the stage itself.',
      does: 'What this stage is responsible for.',
      costs: 'What the choice gives up.',
      instead: ['An option not taken'],
    },
  ]}
/>
```

It renders as a plain list plus every stage's notes, then a script upgrades it into a tab list. Nothing breaks if the script never runs, and arrow keys move between stages once it does. `src/content/lab/anatomy-of-a-batch-import.mdx` is a full example.

### Adding something else

Anything client-side works, because the site is static and the browser does the rest.

- **A script is usually enough.** Put a `<script>` in a component or lab entry: canvas, SVG animation, a game loop. It ships only with that page. If the library is large, `await import(...)` it inside the page so it downloads only when someone lands there. `src/layouts/Article.astro` loads Mermaid that way.
- **A UI framework is one command,** if a piece genuinely needs state: `npx astro add svelte`, then give the component `client:visible` so it hydrates only when scrolled into view.
- **GitHub Pages runs no server.** There is no backend, no hidden API keys and no shared state between visitors. `localStorage` covers per-browser things like a high score. Anything shared would mean an outside service or moving to a host that runs server code.

## Publishing

Pushing to `main` builds the site and deploys it with the workflow in `.github/workflows/deploy.yml`. Pull requests run the build only.

### One-time setup

1. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow from the Actions tab) and wait for the deploy to finish.
3. Check the site at the temporary `*.github.io/portfolio/` address GitHub shows. The styles may look off there because the site expects the custom domain at the root. That's normal.

### Moving the domain from the old repository

A custom domain can only be attached to one repository at a time, so there is a short switch-over:

1. In the old repository's **Settings → Pages**, remove the custom domain.
2. In this repository's **Settings → Pages**, enter `www.lekishamaharaj.com` and save. DNS doesn't need to change, because it already points at GitHub Pages.
3. Once the check passes, tick **Enforce HTTPS**.

If your DNS uses the apex domain (`lekishamaharaj.com`) rather than `www`, change the domain in `public/CNAME`, in `site` in `astro.config.mjs` and in `url` in `src/site.ts` to match.

## Comments and analytics

Both are optional and off by default.

- **Comments:** enable Discussions on this repository, install the [giscus](https://giscus.app) app, then fill in the `giscus` values in `src/site.ts`. The comment box appears under every entry once they're set.
- **Analytics:** add the script from a cookie-free tool such as GoatCounter or Cloudflare Web Analytics to `src/layouts/Base.astro`.

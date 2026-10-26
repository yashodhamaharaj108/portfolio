---
title: 'Build the portfolio with Astro and host it on GitHub Pages'
summary: 'A static site on free hosting, with writing as plain Markdown files in a public repository.'
date: 2026-10-26
status: Accepted
---

## Context

I wanted a portfolio where I can publish often: case studies, short decision notes and a running build log. The domain already pointed at a GitHub Pages site, and I wanted the running cost to stay close to zero. The content is mostly text and diagrams, so there is little that needs a server.

## Options considered

| Option | What it gives me | What it costs me |
| --- | --- | --- |
| Hand-written HTML on GitHub Pages | No build step, nothing to learn | Every new page is copy and paste, and there is no feed or sitemap |
| Astro on GitHub Pages | Pages from Markdown files, an RSS feed and a sitemap, free hosting, the domain stays where it is | A Node build step to maintain |
| Astro on Cloudflare Pages | The same site plus a preview link for every branch | Moving the domain's target for a benefit I don't need yet |
| A hosted site builder | Fast to start | Monthly fees, and my writing lives in someone else's editor |

## Decision

Astro on GitHub Pages. New writing is a Markdown file in the repository, and a push to `main` builds and publishes it through GitHub Actions.

## Consequences

- Hosting is free and there is no server to patch.
- The source is public, which suits building in public. Drafts live in the repository too, so anything unfinished is marked `draft: true` and left out of the published site.
- Comments and analytics need outside services. Comments will go through GitHub Discussions, and analytics will be a cookie-free tool. Neither is set up yet.
- If I later want a preview link per branch, I can revisit Cloudflare Pages. This record would then become Superseded.

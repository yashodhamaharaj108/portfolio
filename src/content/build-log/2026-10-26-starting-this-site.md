---
title: 'Starting this site'
summary: 'Why I am building a portfolio in public, and the stack I picked to keep it free.'
date: 2026-10-26
tags: [astro, github-pages, claude-code]
---

I'm finishing an AI engineering course, and I want to move towards solutions architecture. A portfolio is the obvious place to show that work, but I don't want it to be a static list of finished projects. I want to publish the thinking while it's still in progress.

## What I set up today

- A new public repository for the site, separate from the one that currently serves the domain, so the live site stays up while I build.
- Astro for the site itself. New writing is a Markdown file in one of three folders: case studies, decision records and the build log.
- A GitHub Actions workflow that builds the site and publishes it to GitHub Pages.
- A diagram on the home page that shows how the site works, with the parts I haven't built yet drawn as dashed boxes.

I used Claude Code to scaffold the project. The reasoning behind the main choice is in [the first decision record](/decisions/001-astro-on-github-pages/).

## What's next

1. Move the domain over to the new repository.
2. Write the first real case study.
3. Turn on comments and add cookie-free analytics.

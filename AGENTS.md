# Agent guide

This repo is an investor deck template. `deck/` holds a complete deck for ACME, a fictional company; users clone the repo to turn it into a deck for their own startup, in their own design system.

**To make a deck for a user's company, follow [.claude/skills/investor-deck/SKILL.md](.claude/skills/investor-deck/SKILL.md).** It is the workflow for every agent (Claude Code loads it as the `/investor-deck` skill; Cursor, Codex, Copilot and others should read it directly).

## Map

| Path | What it is | Edit it? |
|---|---|---|
| `deck/index.html` | the slides and the company's details (`window.DECK`, head tags) | yes: content |
| `deck/brand.css` | fonts, wordmark, signal colour, finish | yes: design system |
| `deck/brand.js` | palettes | yes: design system |
| `deck/assets/` | images, logo, favicon, social preview | yes |
| `deck/deck.css`, `deck/deck.js` | the engine: layout, motion, present mode, Copy for AI | no |
| `docs/STORY.md` | the slide order, each slide's job, writing rules | read first |
| `docs/DESIGN-SYSTEM.md` | how a design system maps onto the deck | read first |
| `docs/COMPONENTS.md` | every layout block and where it's used | reference |
| `inputs/` | briefs for the company and the design system | the user fills these |
| `scripts/` | `serve.mjs` (dev server), `check.mjs` (layout check + screenshots), `og.mjs` (social preview) | no |

## Commands

- `npm run dev`: serve the deck at http://localhost:4000 (no install needed).
- `npm install && npx playwright install chromium`: once, for the next two.
- `npm run check`: every slide fits, no errors; screenshots and the Copy for AI text in `shots/`. Add `-- --palette 3` to check another palette.
- `npm run og`: render `deck/assets/og-image.png` from the cover.

## Rules

- Never invent facts, figures, quotes or sources. Mark missing facts with `<span class="todo">…</span>`.
- Keep the story: slide order, each slide's job and the layouts stay; the words, numbers, images and brand change.
- Sizes inside slides are in `cqw`. Keep them that way.
- Run `npm run check` before calling the deck done.

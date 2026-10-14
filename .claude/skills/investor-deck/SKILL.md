---
name: investor-deck
description: Turn this repo's ACME investor deck into a deck for the user's own startup, in the user's own design system, keeping the deck's story, layouts, motion, present mode and Copy for AI. Use when someone wants to make, adapt, rebrand or fill in an investor deck, pitch deck or fundraising deck from this template, or says "use my design system and my startup", "make this deck mine", "replace ACME" or "/investor-deck".
---

# Make an investor deck from this template

The deck in `deck/` is a finished investor deck for ACME, a fictional company. Your job is to turn it into the user's deck: **their company's facts, in their design system, on the same story and layouts.** The essence (the slide order, each slide's job, the layouts, the motion, present mode and Copy for AI) stays. The words, numbers, images, fonts, colours and logo change.

Read these before you start; they are short:
- `docs/STORY.md`: the slide order, each slide's job and the writing rules. This is the essence you keep.
- `docs/DESIGN-SYSTEM.md`: where colours, fonts, the wordmark and images go.
- `docs/COMPONENTS.md`: the building blocks, when a slide needs a different shape.

## Ground rules

- **Never invent a fact.** No made-up numbers, customers, quotes, sources, names or dates. When something is missing, write the sentence and wrap the unknown in `<span class="todo">…</span>`; it shows highlighted on screen. Every ACME figure is fictional, so none of them may survive into the user's deck.
- **Don't touch the engine.** `deck/deck.css` and `deck/deck.js` stay as they are. All restyling happens in `deck/brand.css`, `deck/brand.js` and the font link in `deck/index.html`; all content in `deck/index.html`.
- **Keep the story's order and each slide's job.** Drop an optional slide only when there is nothing true to put on it, and remove its contents line too. Add a slide only by duplicating an existing one (for example a second founder profile).
- **Keep the layouts.** Reuse each slide's markup and classes; change text, figures and images. Adjust counts (three cells instead of four) only when the truth needs it.
- **The numbers must agree** everywhere they appear: the ask, use of funds, budget total, market SOM and five-year path.

## Workflow

### 1. Gather the inputs

You need two things: the company and the design system.

- **The company.** Use whatever the user gives you: `inputs/company.md`, an old deck (PDF, Keynote, Google Slides export), a one-pager, a website, a data room folder, or a conversation. Read all of it. Map what you find onto the slides in `docs/STORY.md`, and list what's missing.
- **The design system.** `inputs/design-system.md`, CSS variables, a Tailwind config, Figma tokens, a brand book, a logo, or a website to sample. Extract colours, fonts, the logo and image sources (see the table at the end of `docs/DESIGN-SYSTEM.md`).

Ask the user only for what blocks you: the company's name, what it does, and the round. For everything else, proceed and leave `todo` markers. If the user gave no design system, keep ACME's look and say so.

### 2. Make a working copy

Work in the repo directly (the user cloned it for this) unless they ask for a separate folder. If they want to keep the ACME example, copy `deck/` to a new folder first (for example `decks/<company>/`) and serve that.

### 3. Apply the design system

In this order, checking the deck in a browser after each:

1. **Palettes** in `deck/brand.js`: the brand palette first (`DEFAULT_PALETTE = 0`), then secondary palettes, then a light one. Keep the indexes the slides use (`data-pal="1"`, `"3"`, `"5"`, `"6"`) pointing at palettes that suit those sections, or update the attributes.
2. **Fonts**: replace the Google Fonts `<link>` in `deck/index.html` and set the five roles in `deck/brand.css`. Adjust the "Type tuning" block for the new display face.
3. **Wordmark**: text (change `content: "ACME"`) or a logo file with the mask snippet in `brand.css`. Update `--signal`.
4. **Light sheets**: the `data-light="paper,ink,accent"` colours on the "Next" slides, from the brand's light palette.
5. **Favicon**: `deck/assets/favicon.svg` (or a PNG) from the logo.

### 4. Rewrite the content

Go slide by slide through `deck/index.html`, top to bottom, with `docs/STORY.md` open:

- Replace every word, figure, caption, link and source. Follow the writing rules in STORY.md: headlines are claims, one `.pig` accent per headline, one- or two-sentence leads, a source on the slide for every number.
- Update each slide's `data-title` when its subject changes (for example `Dock · intro` → `<Product> · intro`), and every contents line's `data-go` to match.
- Recompute bar widths (each value ÷ the chart's largest × 100%).
- Replace placeholder art (`.ph`) with the user's images where they exist (`docs/DESIGN-SYSTEM.md` §4). Leave `.ph` where there is no image yet; it's designed to look finished.
- Update the head: `<title>`, description, Open Graph and Twitter tags (absolute URLs), and `window.DECK` (company, round, date, folio, contact), and the toolbar's `.title` line.
- Remove the "Fictional company · illustrative figures" note on the cover and every "Illustrative" source.

### 5. Verify

1. `npm install` and `npx playwright install chromium` once, then `npm run check`. It must report `All slides fit, no errors.` Fix every LAYOUT line by cutting words first, then by small layout changes; don't shrink type below the deck's scale.
2. Look at the screenshots in `shots/`. Check each slide against its job in STORY.md, and that the brand reads correctly (fonts loaded, logo crisp, accent used once per headline).
3. Run `npm run check -- --palette <n>` for at least one other palette, including the light one if there is one.
4. Read `shots/deck.md` (what Copy for AI produces) end to end: it should read as the full argument with no stray labels.
5. Search for leftovers: `grep -n -i "acme\|illustrative\|example.com\|Jordan\|Okafor" deck/index.html deck/brand.css deck/brand.js` should return nothing that belongs to ACME.
6. `npm run og` to render the social preview from the new cover.

### 6. Report

Tell the user: what you changed, which slides you dropped or duplicated and why, every `todo` left (grep `class="todo"`) as a checklist of facts they need to supply, which images are still placeholders, and how to view it (`npm run dev`, then http://localhost:4000).

## When the user asks for less

- **"Just restyle it"**: do steps 3 and 5 only; leave ACME's content.
- **"Just fill in my company"**: do steps 4 and 5 only; keep ACME's look.
- **"Change one slide"**: edit that slide, then run the check.

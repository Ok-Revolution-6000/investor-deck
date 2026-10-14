# Applying a design system

The deck separates its look from its engine. A design system touches four places, and nothing else:

| What | Where | Notes |
|---|---|---|
| Colours | `deck/brand.js` | `PALETTES` and `DEFAULT_PALETTE` |
| Fonts | `deck/index.html` `<head>` and `deck/brand.css` | load the faces, then map them to five roles |
| Wordmark and finish | `deck/brand.css` | the logo, a fixed signal colour, corner radius, grain |
| Images | `deck/assets/` and `deck/index.html` | replace placeholder art (`.ph`) with real images |

`deck/deck.css` and `deck/deck.js` are the engine. Leave them alone: every colour in them is mixed from the palette, and every size is in container units (`cqw`), so the whole deck follows whatever you set above.

## 1. Colours → palettes

Every palette is three colours. Everything else (borders, muted text, chart fills, image overlays) is mixed from them.

```js
{ name: "Ink & Signal Orange", bg: "#111214", fg: "#EEEAE4", accent: "#FF5B2E" }
```

- `bg`: the slide's ground.
- `fg`: the ink. Text, rules and figures, at several strengths (`--fg-72`, `--fg-55`, `--fg-40` …).
- `accent`: one colour for emphasis: the accent phrase in headlines, the Present button, highlighted cells and bars.
- `light: true`: set it when `bg` is light, so form controls and scrollbars match.

**Deriving palettes from a design system.** The default palette is the brand: its darkest neutral as `bg`, its lightest as `fg`, its primary or most recognisable colour as `accent`. Then add more palettes for "Change colours" and for sections:
- Pair each secondary brand colour, as `accent`, with a dark ground tinted toward it.
- Add one light palette (`light: true`), the brand's paper and ink.
- Aim for six to sixteen palettes. Fewer is fine; one works, but then sections can't shift.
- Check contrast: `fg` on `bg` should be at least 7:1 (the deck sets small text at reduced strength), and `accent` on `bg` at least 3:1.

**Sections.** A slide with `data-pal="3"` uses palette 3 while the deck is on its default palette, and moves with the deck when the viewer changes colours. The ACME deck uses this for Why now (1), the second act (3), Go-to-market (5) and the team (6). Keep indexes stable once slides use them, or update the `data-pal` attributes.

**Light sheets.** `data-light="paper,ink,accent"` gives a slide its own light colours on the default palette (the ACME deck uses it for the "Next" chapter). On other palettes it inverts the current one.

## 2. Fonts → five roles

Load the faces in the `<head>` of `deck/index.html` (Google Fonts, Adobe Fonts, or `@font-face` rules with files in `deck/assets/fonts/`), then map them in `deck/brand.css`:

| Role | Variable | Used for | Good choice |
|---|---|---|---|
| Display | `--f-display` | cover name, the ask, the vision line, product names | the brand's most characterful face |
| Title | `--f-title` | card titles, big figures, people's names | the display face, or the brand's serif |
| Quote | `--f-quote` | pull quotes, in italic | a face with a real italic |
| Sans | `--f-sans` | headlines, body copy, buttons | the brand's UI or text face |
| Mono | `--f-mono` | kickers, labels, table numbers, sources | the brand's mono, or any clean mono |

A design system with only two faces maps fine: display = title = quote = the heading face, sans = the body face, and any mono.

**Tune the type** in the "Type tuning" block of `brand.css` when the faces change. Display faces differ a lot in width and weight: check the cover name, "38 minutes" and the ask's amount, and adjust `letter-spacing` or `font-weight` on `.display`, `.fig` and `.h3` rather than their sizes. All-caps or very wide display faces may need `.display { font-size: … }` reduced on the cover. Run `npm run check` after any type change: a wider face is the most common cause of overflow.

## 3. Wordmark, signal colour and finish

**Wordmark.** The default is a text wordmark: the name in the display face, set in `brand.css` with `.wordmark::before { content: "ACME"; }`. To use a logo file, put an SVG (or a transparent PNG) in `deck/assets/` and use a mask, so the logo takes each palette's ink:

```css
.wordmark { width: 120px; aspect-ratio: 4 / 1; background: var(--fg);
  -webkit-mask: url(assets/logo.svg) center / contain no-repeat; mask: url(assets/logo.svg) center / contain no-repeat; }
.wordmark::before, .wordmark::after { content: none; }
.slide .wordmark { width: 9cqw; }
.by .wordmark { width: 7.4cqw; }
```

Set `aspect-ratio` to the logo's own width / height. A logo with a part in a fixed brand colour (the Renaissance deck keeps its "AI" in red) can layer a second mask in `::after` with `background: var(--signal)`.

**Signal colour** (`--signal`): one brand colour that never changes with the palette. Used for the wordmark's mark and the × of crossed-out lists. Use the brand's primary colour.

**Finish:** `--radius` rounds the slide corners on the desk, `--grain` sets the film grain (0 to turn it off), `--media-bg` shows behind images while they load.

## 4. Images

ACME uses placeholder art: any element with class `ph` draws palette-coloured abstract art, with `--px` and `--py` moving its highlight so neighbours differ, and an optional `data-ph` label. To use a real image:

- An `<figure class="obj ph" …>`: remove `ph` and the `--px/--py` style, and add `<img src="assets/…" alt="…">` inside, before the `<figcaption>`.
- A background image (`.pimg`, `.simg`, `.toc-img`, `.mosaic span`): remove `ph` and set `style="background-image:url(assets/…)"`.
- A team photo (`.avatar`): remove `ph avatar` and the initials `<span>`, add an `<img>`.

Image guidance: the cover is 4:5, the closing image 1:1, problem and solution headers about 3:2, screenshots 16:10. Export at 2× the displayed size (a full-width slide is 1440px wide) as JPEG or WebP, under 400 KB each.

The social preview (`deck/assets/og-image.png`) is rendered from the cover: run `npm run og` after the cover is final.

## Common design-system formats

| You have | Take from it |
|---|---|
| CSS variables (`--color-primary`, `--font-heading`) | the hex values and family names; don't import the file, copy the values |
| Tailwind config | `theme.colors` (neutrals → bg/fg, primary → accent) and `theme.fontFamily` |
| Figma tokens / Style Dictionary JSON | colour and typography tokens; ignore spacing and component tokens, the deck has its own |
| A brand book PDF or website | the palette swatches, the named typefaces, the logo files |
| Just a logo | sample the logo's colours for the accent, pick a dark neutral for bg, keep the ACME fonts or choose a pair |

The deck's own spacing, grid and type scale are part of its "essence" and stay as they are. A design system changes what the deck looks like, not how it is laid out.

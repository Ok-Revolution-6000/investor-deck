# Components

Every slide is built from the pieces below. They're all defined in `deck/deck.css`; copy the markup from the slide named in the last column of each table, which uses it.

## The sheet

```html
<section class="slide" data-title="Market">          <!-- data-title: contents, divider, Copy for AI -->
  <div class="pad">                                    <!-- the safe area inside the margins -->
    <div class="kick"><span>Market</span><span class="n"></span></div>  <!-- kicker; the number fills itself in -->
    …
  </div>
</section>
```

Slide attributes:

| Attribute | Effect |
|---|---|
| `data-title="…"` | names the slide everywhere; contents links (`data-go`) point at it |
| `data-pal="3"` | uses palette 3 for this slide, shifting with "Change colours" |
| `data-light="paper,ink,accent"` | a light sheet with its own colours on the default palette |
| `data-nofolio` | no folio line at the bottom (cover, vision, thank you) |
| `data-nocopy` | left out of Copy for AI (the contents slide) |

Sizes inside a slide are in `cqw` (1% of the slide's width), so a slide looks the same at every size. Use `cqw` for any size you add.

## Type

| Class | Use | Example slide |
|---|---|---|
| `.display` | the biggest words: cover name, a proof number, the ask | Cover, Proof point, The ask |
| `.h1` | slide headline (a claim) | most slides |
| `.h1.name` | a product's name as the headline | Product |
| `.h2` | secondary headline, a person's name in a card | Market, Team |
| `.h3` | card title | Problem |
| `.lead` | the paragraph under a headline | most slides |
| `.body`, `.small` | body copy, smaller notes | everywhere |
| `.label` | small caps label above a block | everywhere |
| `.fig` (+ `<small>` unit) | a big figure: `70<small>%</small>` | Why now |
| `.pull` (+ `<cite>`) | pull quote | Why now, Business model |
| `.src` | a source line | Problem, Market |
| `.tagline` | a short claim in heavy sans, for intro slides | Dock · intro |
| `.product-name` (+ `<i>` gloss) | a product's name with a gloss beside it | Dock · intro |
| `.by` | "A product by [wordmark]" | Dock · intro |
| `.pig` | the accent phrase in a headline (one per headline) | everywhere |
| `.ink`, `<em>` | full-strength ink inside muted text | everywhere |
| `.todo` | a fact still to confirm, highlighted on screen | — |

## Layout

| Class | Use | Example slide |
|---|---|---|
| `.split` | two columns; set `grid-template-columns` inline to weight them | Purpose, Market |
| `.row` | a flex row, often `justify-content:space-between` for headline + side note | Problem |
| `.col` | a flex column | many |
| `.center` | centred column, for intro and statement slides | Proof point |
| `.grow` | take the remaining height | many |
| `.end` | push to the bottom of a column | Product |
| `.g2`, `.g3`, `.g4` | 2, 3 or 4 equal columns | many |
| `.cells` | ruled grid cells, used with `.g2/.g3/.g4` | Problem, Why now |
| `.rule` | a top rule, for footer rows | Cover |
| `.box` | a bordered box | Dock · before and after |
| `.sans-titles` | card titles in the sans face | Problem, Solution |

## Blocks

| Class | What it is | Example slide |
|---|---|---|
| `.probs` | problem cells with an image header (`.pimg`) | Problem |
| `.quad` | four problem cells in a 2 × 2 grid | Problem · the operator's side |
| `.flow` + `.step` + `.arrow` | four steps with arrows and image headers (`.simg`); `.step.on` inverts the last | Solution |
| `.strip` | cells joined by × (an equation); `.flow-strip` joins with →; `.hl` inverts the last; set `--n` to the number of cells before it | Proof point, Dock · intro |
| `.pipe` | pipeline of stages: `.stage` label, `.boxes` of `.node` (`.hl` accent, `.ink` inverted); set `--n` | How it works |
| `.layer` | a row of dashed data boxes | How it works |
| `.example` | a mono example line | — |
| `.steps` | three steps with arrows; `.grid6` is six features in two rows; `.on` inverts one | Next · detail |
| `.stats` | four statistics in cells | Next · detail |
| `.chips` | tags; `li.on` for selected | Product, Dock · before and after |
| `ul.tick` (`.x`) | a list with + (or ×) marks | — |
| `.quote-card` | options with prices; `.opt.win` highlights the winner, `.opt.old` strikes the old way | Dock · before and after |
| `.person` + `.head` + `.fact` | a team card | Team |
| `.path` | career path: stops with year (`b`), place (`span`), role (`small`), initial or logo (`.lg`), callout (`.tip`); `.now` marks the last; set `--n` | Team · Jordan Reyes |
| `.roadmap` | phases; `.done` and `.now` mark progress; set `--n` | Traction |
| `.stage` | traction cards; `.live` colours a status line | Traction |
| `.costs` | budget columns with tables | Budget |
| `.toc` | contents columns; `.toc-row[data-go]` jumps to a slide | Contents |
| `.contact` | contact rows | Thank you |
| `.sources` | three-column source list | Appendix · sources |

## Data

| Class | What it is | Example slide |
|---|---|---|
| `table.t` | a ruled table; `tr.us` highlights your row; `.c` centres, `.r` right-aligns | Competition, Budget |
| `table.t.big` | larger table text | Dock · before and after |
| `table.t.vs` | before / after: first column struck through, last highlighted | Dock · before and after |
| `.yes`, `.part`, `.no` | ●, ◐, ○ in comparison tables | Competition |
| `.bars` + `.bar-row` | horizontal bars: `.lbl`, `.trk > .fill` (width in %), `.val`; `.fill.hl` in accent; `.bars.wide` for long labels | Market, The ask |
| `.bars-in` | bars grow in one by one when the slide appears | Market |
| `.rings.grow-in` | TAM / SAM / SOM rings (`.r1`, `.r2`, `.r3`) | Market |

Bar widths are each value divided by the largest value in the chart, as a percentage.

## Images

| Class | What it is | Example slide |
|---|---|---|
| `.obj` | an image frame; put `<img>` and an optional `<figcaption>` inside | everywhere |
| `.obj.bare` / `.bare` | no outline | Product in pictures |
| `.hero-art` (`.square`) | the cover and closing image on the right | Cover, Thank you |
| `.stack` | three fanned images; set `--x`, `--y`, `--r` on each | Company purpose |
| `.gallery` | one tall image and four small ones | Product |
| `.media-fill` | one image filling the rest of a column | Go-to-market |
| `.shots` + `.shot-link` | six captioned screens, each a link | Product in pictures |
| `.mosaic` | 18 tiles behind the vision slide, fading in the middle; pair with `.over-art` | Vision |
| `.logos` | a row of partner logos (`img.inv` inverts dark logos) | — |
| `.ph` | palette-aware placeholder art; `--px`/`--py` move its highlight, `data-ph` labels it | everywhere in ACME |
| `.avatar` | a placeholder portrait with initials | Team |

## Tooltips

```html
<h3 class="h3 has-tip" tabindex="0">Commissions <span class="tip-i" aria-hidden="true">i</span>
  <span class="tipbox" role="tooltip"><b>Who pays: buyers</b>Charged per order; the maker receives the rest.</span></h3>
```

For a term inside running text, use `<span class="term has-tip" tabindex="0">term<span class="tipbox">…</span></span>`. `.tipbox.wide` with a `.tip-grid` of four `<span><i>Name</i>text</span>` makes a small grid (Traction uses one). Copy for AI includes tooltip text.

## Motion

Add `rv` to anything that should fade up when its slide appears, and `d2`, `d3` or `d4` to stagger it. Motion is turned off for viewers who prefer reduced motion, in print, and in `npm run check`.

## Copy for AI

The button turns the live slides into Markdown, so nothing extra is needed for text. Two cases need help:

- **Pictures that carry information** (a chart drawn as an image or an inline SVG): give the `<svg>` a `data-md="…"` attribute describing it in words, or describe the picture in its `<figcaption>`.
- **Decoration**: mark it `aria-hidden="true"` and Copy for AI skips it.

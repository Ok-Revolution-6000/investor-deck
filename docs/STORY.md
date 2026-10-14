# The story: what stays the same in every deck

The look of this deck changes with every company. The story does not. This file is the spine: the order of the slides, the job each one does for an investor, and the writing rules that make it read like one argument instead of 27 separate pages.

When you make a new deck, keep the order and the jobs. Change the words, the numbers, the images and the brand. Drop an optional slide only when the company has nothing true to put on it.

## The arc in five acts

| Act | Slides | What the investor should think by the end |
|---|---|---|
| I. Hook | Cover, Contents, Company purpose | "I know what this company is, in one sentence." |
| II. Opportunity | Problem, Solution, Product, Proof point, Why now, Market | "The pain is real, the fix works, the timing is now and the prize is large." |
| III. Business | Second act (optional, 4 slides), Competition, Business model, Go-to-market, Traction | "They know how to win and how to make money, and it's already moving." |
| IV. People | Team, Founder profile, Product in pictures | "These are the people to build it, and they ship." |
| V. Deal and dream | The ask, Budget, Vision, Next (optional, 2 slides), Thank you, Appendix | "I know what I'm buying, what it pays for, and how big it can become." |

## Slide by slide

Each entry gives the slide's `data-title` in `deck/index.html`, its job, what to put on it and the layout it uses. The layouts are in [COMPONENTS.md](COMPONENTS.md).

### Act I · Hook

**01 · Cover** (`Cover`), required
Job: the company in one breath. Name, a one-line positioning label, and a two-sentence lead that states the promise.
Fill: positioning label (what you are, for whom), the name in the display face, a lead whose emphasised half (`<em class="pig">`) is the promise, a hero image, a footer row (site, the sides of the market, a detail such as the city's coordinates).
Layout: `.hero-art` image on the right, `.display` name, `.lead`, `.row.rule` footer.

**02 · Contents** (`Contents`), required
Job: show the investor the whole argument before it starts, and let them jump.
Fill: the three acts as columns, each with an image and five or six lines. Every line's `data-go` must equal a slide's `data-title`. The numbers fill themselves in.
Layout: `.toc`. Copy for AI skips this slide (`data-nocopy`).

**03 · Company purpose** (`Company purpose`), required
Job: the mission as one sentence a partner could repeat in Monday's meeting.
Fill: a headline that is the mission ("Turn any imagined object into a real one…"), one accent phrase, a lead that names what you are building, three images that show the thing.
Layout: `.split` with `.stack` (three fanned images).

### Act II · Opportunity

**04 · Problem** (`Problem`), required
Job: make the pain specific and plural. Four separate reasons the status quo fails.
Fill: a two-line headline (before / after the shift), a one-sentence statistic, four cells of numeral, title and two sentences, each with an image. Sources on the slide.
Layout: `.g4.cells.probs`.

**05 · Solution** (`Solution`), required
Job: the fix as a flow the investor can follow with a finger.
Fill: a three-beat headline ("Dream it. See it designed. Have it made."), a lead, four steps (verb title, two sentences); the last step, the outcome, is inverted (`.step.on`).
Layout: `.flow` with arrows.

**06 · Product** (`Product`), required
Job: prove the solution exists. Show the product, not a description of it.
Fill: the product's name (`.h1.name`), a lead, a row of chips (features, integrations, inputs), two figures that show depth, five screenshots or photos.
Layout: `.split` with `.chips`, `.g2.cells` and `.gallery`.

**07 · Proof point** (`Proof point`), optional
Job: one number that makes the product undeniable, broken down so it can't be dismissed.
Fill: a label that defines the number exactly, the number in the display face, a lead with the sample size, and a strip of the steps or factors behind it.
Layout: `.center`, `.display`, `.strip` (× for factors that multiply, `.flow-strip` → for steps in sequence).

**08 · Why now** (`Why now`), required
Job: show that something changed recently, so this couldn't have been built five years ago.
Fill: five shifts, each a figure, a title and a sourced sentence, plus one pull quote.
Layout: `.g3.cells` in two rows, `.pull`.

**09 · Market** (`Market`), required
Job: size the prize honestly, top-down and bottom-up.
Fill: TAM, SAM and SOM in the rings; a table showing how each layer is built; six adjacent markets as bars (widths are each value divided by the largest); sources and a bottom-up check.
Layout: `.rings.grow-in`, `table.t`, `.bars.bars-in`.

### Act III · Business

**10–13 · Second act** (`Problem · …`, `… · intro`, `… · before and after`, `How it works`), optional
Job: tell the other side of the business: the supply side of a marketplace, the platform under the app, or a second product. Use it when the company has two sides; drop all four slides when it has one. These slides share a palette (`data-pal`) so the section reads as one chapter.
- *The other side's problem*: headline, lead, a pull quote from an interview, four problem cells. Layout: `.split`, `.pull`, `.g2.cells.quad`.
- *Intro*: "A product by" line, the product's name with a gloss, a definition label, a short tagline, a lead, a six-step strip. Layout: `.center`, `.product-name`, `.tagline`, `.strip.flow-strip`.
- *Before and after*: a headline, a lead, a before/after table, and a worked example with real-looking numbers (options, the winning route, the old way struck through). Layout: `.split`, `table.t.big.vs`, `.quote-card`, `.chips`.
- *How it works*: the system as a pipeline of stages, a shared data layer, an example. Layout: `.pipe`, `.layer`.

**14 · Competition** (`Competition`), required
Job: show the gap only you fill.
Fill: a headline that names what everyone else stops at; a table with your row first (`tr.us`), four or five capability columns (● full, ◐ partial, ○ none) and one column of facts (funding or terms); one paragraph on why the category is real.
Layout: `table.t`.

**15 · Business model** (`Business model`), required
Job: how money comes in, and why each order makes money.
Fill: up to four revenue lines (who pays, title, price figure, one sentence; the tooltip says who pays and how), unit economics as bars, a pull quote that states your pricing principle.
Layout: `.g4.cells` with `.has-tip`, `.bars`, `.pull`.

**16 · Go-to-market** (`Go-to-market`), required
Job: the first beachhead and the steps out from it.
Fill: a two-line headline, a lead, an image, four rows (step label, title, one sentence).
Layout: `.split`, `.media-fill`, `.g3.cells` as one column.

**17 · Traction** (`Traction`), required
Job: what is real today and what comes next.
Fill: a headline that states the strongest fact; four cards with a status line (`LIVE · BUILT`, `● ACTIVE NOW` with `.live`, `● LAUNCHING`) and the evidence; a roadmap of up to seven phases (`.done`, `.now`, plain).
Layout: `.g4.cells.stage`, `.roadmap`.

### Act IV · People

**18 · Team** (`Team`), required
Job: why these people, side by side.
Fill: a one-line description of how the founders complement each other; one card per founder with photo, role, name, a one-line identity and three facts with one highlight each.
Layout: `.g2` of `.person`.

**19 · Founder profile** (`Team · <name>`), recommended
Job: the lead founder's story as a path that ends here. Duplicate the slide for each founder who should get one.
Fill: photo, role, name, a lead, three facts, and a path of up to eight stops (year, place, role) with callouts (`.tip`) for exits and records. Set `--n` on `.path` to the number of stops.
Layout: `.row`, `.g3.cells`, `.path`.

**20 · Product in pictures** (`Product · in pictures`), optional
Job: "built, not slides". Six screens or pieces of work, each a link.
Fill: a headline, a line with a link, six captioned images.
Layout: `.shots` of `.shot-link`.

### Act V · Deal and dream

**21 · The ask** (`The ask`), required
Job: the amount, what it buys and where it leads.
Fill: the amount in the display face; a lead with the runway, the team size and the three or four things the money does; use of funds as bars (percent and amount, headcount in brackets); milestones by month; a five-year path in three figures.
Layout: `.split`, `.bars.wide`, `table.t`, `.g3.cells`.

**22 · Budget** (`Budget`), recommended
Job: show the ask is built bottom-up. Every line here must add up to the use of funds and the total.
Fill: three columns (people, activity, tools) each with a total and a table; contingency and the grand total.
Layout: `.g3.cells.costs`.

**23 · Vision** (`Vision`), required
Job: the big picture. What the world looks like if this works.
Fill: a label, a short display line, a lead, a two-line pull quote; a mosaic of 18 images behind it.
Layout: `.mosaic`, `.center.over-art`.

**24–25 · Next** (`Next · intro`, `Next · detail`), optional
Job: the next product or market, which shows the company is bigger than its first wedge. Light ground (`data-light`) to mark it as the future.
Fill: like the second act's intro, then four statistics, six features and three lessons.
Layout: `.strip.flow-strip`, `.g4.cells.stats`, `.steps.grid6`.

**26 · Thank you** (`Thank you`), required
Job: the contact, and one last line of the promise.
Fill: the closing line, the founder's name, email and site, links to try the product.
Layout: `.hero-art.square`, `.contact`.

**27 · Appendix · sources** (`Appendix · sources`), required
Job: every number in the deck, traceable.
Fill: one line per source: publisher, title, year, link, and what it supports.
Layout: `.sources`.

## Writing rules

These are what make the deck feel like one voice.

1. **Headlines are claims, not topics.** "Makers spend their days sourcing, not making", not "The supplier problem". An investor who reads only the headlines should get the whole argument.
2. **One accent per headline.** Wrap the phrase that carries the claim in `<span class="pig">`. Never two.
3. **Leads are one or two sentences.** The lead says what the headline means; the cells prove it.
4. **Four is the count.** Four problems, four steps, four revenue lines, four traction cards. Three or five only when the truth needs it.
5. **Every number has a source on the slide** (`.src`), and the appendix lists it in full. Label estimates and plans as such ("Planning figures, not commitments").
6. **Never invent a fact.** When a number, name or date is missing, write the sentence anyway and wrap the unknown in `<span class="todo">…</span>`: it shows highlighted on screen, so it can't ship by accident.
7. **Kickers name the section** (`Product · live today`, `Financials · the ask`) and stay short.
8. **Short words, active verbs, no hype.** "We charge for what gets made", not "Our innovative monetisation strategy leverages…".
9. **The numbers must agree everywhere.** The ask, the use of funds, the budget total, the market's SOM and the five-year path are the same figures wherever they appear.
10. **Keep slides full but not crowded.** If text overflows its sheet, cut words before shrinking type. `npm run check` reports every overflow.

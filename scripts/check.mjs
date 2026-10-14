// Checks the deck in a real browser: every slide fits its 16:9 sheet, the page has no errors,
// and Copy for AI produces text. Writes a screenshot of each slide to shots/ for a visual pass.
//
//   npm install && npx playwright install chromium   (once)
//   npm run check                                     (starts its own server)
//   npm run check -- --palette 3                      (check another palette)
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf("--" + name); return i >= 0 ? args[i + 1] : fallback; };
const port = Number(opt("port", 4789));
const palette = opt("palette", null);
const shotsDir = fileURLToPath(new URL("../shots/", import.meta.url));

const server = spawn(process.execPath, [fileURLToPath(new URL("serve.mjs", import.meta.url)), String(port)], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 400));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("requestfailed", (r) => errors.push("failed to load " + r.url()));

try {
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (palette !== null) {
    // Click "Change colours" until the requested palette is showing.
    const want = await page.evaluate((p) => window.PALETTES[+p].name, palette);
    for (let i = 0; i < 64; i++) {
      const name = await page.evaluate(() => document.getElementById("pal-name").textContent);
      if (name.endsWith(want)) break;
      await page.click("#shuffle");
    }
  }
  // Show every slide in its final state: no reveal motion.
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important} .bar{position:static!important}" });
  await page.evaluate(() => document.querySelectorAll(".slide").forEach((s) => s.classList.add("in")));

  const problems = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll(".slide").forEach((s, i) => {
      const name = String(i + 1).padStart(2, "0") + " " + s.dataset.title;
      const box = s.getBoundingClientRect(), pad = s.querySelector(".pad");
      if (pad && pad.scrollHeight > pad.clientHeight + 2) out.push(`${name}: content is ${pad.scrollHeight - pad.clientHeight}px taller than the slide`);
      const folio = s.querySelector(".folio"), fb = folio && folio.getBoundingClientRect();
      s.querySelectorAll(".pad *").forEach((el) => {
        if (!el.childNodes.length || el.closest(".tipbox,.mosaic,.tip")) return;
        const hasText = [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        if (hasText && (r.right > box.right - 2 || r.bottom > box.bottom - 2 || r.left < box.left + 2))
          out.push(`${name}: "${el.textContent.trim().slice(0, 50)}" runs off the slide`);
        else if (hasText && fb && r.bottom > fb.top + 2 && r.top < fb.bottom && !el.closest(".folio"))
          out.push(`${name}: "${el.textContent.trim().slice(0, 50)}" overlaps the folio`);
        const cs = getComputedStyle(el);
        if (/hidden|clip/.test(cs.overflow) && el.scrollHeight > el.clientHeight + 3 && hasText)
          out.push(`${name}: "${el.textContent.trim().slice(0, 50)}" is clipped`);
      });
    });
    return [...new Set(out)];
  });

  const md = await page.evaluate(() => window.deckMarkdown());
  await rm(shotsDir, { recursive: true, force: true });
  await mkdir(shotsDir, { recursive: true });
  await writeFile(shotsDir + "deck.md", md);
  const slides = await page.$$(".slide");
  for (let i = 0; i < slides.length; i++) await slides[i].screenshot({ path: `${shotsDir}${String(i + 1).padStart(2, "0")}.png` });

  console.log(`${slides.length} slides · Copy for AI: ${md.length.toLocaleString()} characters · screenshots in shots/`);
  for (const e of errors) console.log("ERROR  " + e);
  for (const p of problems) console.log("LAYOUT " + p);
  if (!errors.length && !problems.length) console.log("All slides fit, no errors.");
  process.exitCode = errors.length || problems.length ? 1 : 0;
} finally {
  await browser.close();
  server.kill();
}

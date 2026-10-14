// Renders the cover slide as the social preview image (deck/assets/og-image.png, 1200 × 630).
//   npm run og
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const port = 4790;
const server = spawn(process.execPath, [fileURLToPath(new URL("serve.mjs", import.meta.url)), String(port)], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 400));
const browser = await chromium.launch();
try {
  // With no desk padding, a 1200px window makes the cover sheet exactly 1200 × 675; the middle 630px become the preview.
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.goto(`http://localhost:${port}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important} .bar{position:static!important} .deck{padding:0!important} .slide{border-radius:0!important}" });
  await page.evaluate(() => document.querySelector(".slide").classList.add("in"));
  const box = await page.locator(".slide").first().boundingBox();
  const out = fileURLToPath(new URL("../deck/assets/og-image.png", import.meta.url));
  await page.screenshot({ path: out, clip: { x: box.x, y: box.y + (box.height - 630) / 2, width: 1200, height: 630 } });
  console.log("Wrote deck/assets/og-image.png");
} finally {
  await browser.close();
  server.kill();
}

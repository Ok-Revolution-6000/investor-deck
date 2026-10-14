/* ─────────────────────────────────────────────────────────────────────────────
   BRAND · COLOURS — your design system's palettes.

   Each palette is a ground (bg), an ink (fg) and an accent. Every colour in the
   deck is mixed from these three, so a palette restyles every slide at once.
   "Change colours" cycles through them; DEFAULT is the one the deck opens in.
   Mark a palette light: true when its ground is light.

   Slides can carry their own palette with data-pal="<index>", which is how a
   section (the second product, the team) gets its own ground. Keep the indexes
   below stable once slides refer to them.
   ───────────────────────────────────────────────────────────────────────────── */
window.PALETTES = [
  { name: "Ink & Signal Orange", bg: "#111214", fg: "#EEEAE4", accent: "#FF5B2E" },
  { name: "Midnight & Cobalt",   bg: "#0B1020", fg: "#DDE4F5", accent: "#4C74FF" },
  { name: "Forest & Lime",       bg: "#0D1611", fg: "#E2EDDF", accent: "#8BCF3F" },
  { name: "Plum & Coral",        bg: "#1A0F1C", fg: "#F1E3EE", accent: "#FF6F61" },
  { name: "Graphite & Mint",     bg: "#151718", fg: "#E3ECE9", accent: "#2FC9A0" },
  { name: "Oxblood & Sand",      bg: "#220E0E", fg: "#F2E4D3", accent: "#D9A35B" },
  { name: "Navy & Gold",         bg: "#0E1626", fg: "#EAE2CC", accent: "#E0B13A" },
  { name: "Paper & Ink",         bg: "#F4F1EA", fg: "#1B1C1F", accent: "#E8471C", light: true }
];
window.DEFAULT_PALETTE = 0;

// Paint the default palette before the page renders, so there is no flash of the fallback colours.
(function () {
  try {
    var i = window.DEFAULT_PALETTE, c = PALETTES[i], r = document.documentElement.style;
    r.setProperty("--palette-bg", c.bg); r.setProperty("--palette-fg", c.fg); r.setProperty("--palette-accent", c.accent);
    window.CURRENT = i;
  } catch (e) {}
})();

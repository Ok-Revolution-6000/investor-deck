/* ─────────────────────────────────────────────────────────────────────────────
   ENGINE — palettes, slide numbering, reveal on scroll, present mode,
   contents links and Copy for AI. You shouldn't need to edit this file:
   the company's details come from window.DECK (index.html) and the colours
   from window.PALETTES (brand.js).
   ───────────────────────────────────────────────────────────────────────────── */
(function () {
  var P = window.PALETTES, D = window.DECK || {}, cur = window.CURRENT || 0;
  var HOME = cur; // the default ground; every slide's own colours are set relative to it
  function set(el, bg, fg, accent) {
    el.style.setProperty("--palette-bg", bg); el.style.setProperty("--palette-fg", fg); el.style.setProperty("--palette-accent", accent);
  }
  // Slides with their own palette (data-pal) move with the deck: each keeps its distance
  // from the default palette, so the default look is unchanged and every "Change colours"
  // shifts the whole deck together.
  function paintFixed() {
    var shift = (cur - HOME + P.length) % P.length;
    document.querySelectorAll(".slide[data-pal]").forEach(function (s) {
      var p = P[(+s.dataset.pal + shift) % P.length];
      set(s, p.bg, p.fg, p.accent);
      s.style.setProperty("color-scheme", p.light ? "light" : "dark");
    });
    // Light sheets (data-light="paper,ink,accent") keep their designed colours on the default
    // palette; on any other palette they invert it, so its light colour becomes the paper.
    document.querySelectorAll(".slide[data-light]").forEach(function (s) {
      if (!shift) { var c = s.dataset.light.split(","); set(s, c[0], c[1], c[2]); }
      else { var p = P[cur]; set(s, p.fg, p.bg, p.accent); }
      s.style.setProperty("color-scheme", "light");
    });
  }
  function apply(i) {
    cur = i; var p = P[i];
    set(document.documentElement, p.bg, p.fg, p.accent);
    document.documentElement.style.setProperty("color-scheme", p.light ? "light" : "dark");
    document.getElementById("pal-name").textContent = "Palette · " + p.name;
    paintFixed();
  }
  apply(cur);
  var bag = [];
  document.getElementById("shuffle").addEventListener("click", function () {
    if (!bag.length) { bag = P.map(function (_, i) { return i; }); for (var i = bag.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = bag[i]; bag[i] = bag[j]; bag[j] = t; } }
    var n = bag.pop(); if (n === cur && bag.length) n = bag.pop(); apply(n);
  });

  // Number every sheet, add the folio and the division above it.
  var slides = [].slice.call(document.querySelectorAll(".slide")), total = slides.length;
  slides.forEach(function (s, i) {
    var n = String(i + 1).padStart(2, "0"), cut = document.createElement("div");
    cut.className = "cut"; cut.innerHTML = "<b>" + n + "</b><span>" + s.dataset.title + (s.dataset.pal ? " · " + P[+s.dataset.pal].name : (s.dataset.light ? " · Light ground" : "")) + "</span>";
    s.parentNode.insertBefore(cut, s); s.id = "s" + (i + 1);
    var f = document.createElement("div"); f.className = "folio";
    f.innerHTML = "<span>" + (D.folio || D.company || "") + "</span><span>" + (D.confidential || "Confidential") + "</span><span>" + n + " / " + total + "</span>";
    if (!s.hasAttribute("data-nofolio")) s.appendChild(f);
    // An empty or numeric kicker number becomes the slide's real number; other text ("Seed · 2026") stays.
    var kn = s.querySelector(".kick .n"); if (kn && /^\d*$/.test(kn.textContent.trim())) kn.textContent = n;
  });

  // Reveal each sheet as it enters.
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in"); }); }, { threshold: 0.35 });
  slides.forEach(function (s) { io.observe(s); });

  // Navigation: scroll mode and present mode.
  var idx = 0, presenting = false;
  // The slide closest to the middle of the screen, measured while the deck is still scrolling.
  function nearest() { var mid = innerHeight / 2, best = 0, d = Infinity; slides.forEach(function (s, i) { var r = s.getBoundingClientRect(); if (!r.height) return; var c = Math.abs(r.top + r.height / 2 - mid); if (c < d) { d = c; best = i; } }); return best; }
  function show(i) {
    idx = Math.max(0, Math.min(total - 1, i));
    if (presenting) { slides.forEach(function (s, k) { s.classList.toggle("cur", k === idx); }); slides[idx].classList.remove("in"); void slides[idx].offsetWidth; slides[idx].classList.add("in"); }
    else { slides[idx].scrollIntoView({ behavior: "smooth", block: "center" }); }
    history.replaceState(null, "", "#s" + (idx + 1));
  }
  function setPresent(on) {
    // Measure the current slide before the layout switches: in present mode every sheet is hidden.
    var here = on ? nearest() : idx;
    presenting = on; document.body.classList.toggle("present", on);
    if (on) { show(here); if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {}); }
    else { slides.forEach(function (s) { s.classList.remove("cur"); }); if (document.fullscreenElement) document.exitFullscreen(); setTimeout(function () { slides[idx].scrollIntoView({ block: "center" }); }, 50); }
  }
  document.getElementById("present").addEventListener("click", function () { setPresent(true); });

  // "Copy for AI": the whole deck as Markdown, read from the live slides so it never drifts
  // from what is shown, with a short brief that tells the investor's assistant what to do with it.
  function deckMarkdown() {
    var SKIP = "img,script,style,.folio,.kick,.tip-i,.lg,[aria-hidden=true]";
    var out = [], line = "";
    function clean(t) { return t.replace(/\s+/g, " ").trim(); }
    function flush() { var t = clean(line); if (t && t !== "→") out.push(t); line = ""; }
    function cell(n) { return clean(n.innerText || n.textContent).replace(/\|/g, "\\|"); }
    // Tooltip: its bold title and each term get a colon, so the text doesn't run together.
    function tip(n) {
      var c = n.cloneNode(true);
      c.querySelectorAll("b,i").forEach(function (e) { e.append(": "); });
      c.querySelectorAll(".tip-grid > span").forEach(function (e) { e.append("; "); });
      return clean(c.textContent).replace(/[;:]$/, "");
    }
    // A small cell of short pieces (a figure and its label, a year and a role) reads best on one line.
    function compact(n) {
      var kids = [].filter.call(n.children, function (c) { return !c.matches(SKIP) && getComputedStyle(c).display !== "none"; });
      if (kids.length < 2 || clean(n.textContent).length > 160) return null;
      if (n.querySelector("h1,h2,h3,li,table,svg,a[href^=http],.tipbox,.bar-row")) return null;
      if ([].some.call(n.childNodes, function (c) { return c.nodeType === 3 && clean(c.textContent); })) return null;
      if (kids.some(function (c) { return getComputedStyle(c).display.indexOf("inline") === 0 || c.querySelector("div,p,figure,ul"); })) return null;
      return kids.map(pieces).filter(Boolean).join(" · ");
    }
    // Nested pieces are separate words ("Brands" + "220"), even where the markup runs them together.
    function pieces(n) {
      if (n.nodeType === 3) return clean(n.textContent);
      if (n.nodeType !== 1 || n.matches(SKIP)) return "";
      return n.children.length ? [].map.call(n.childNodes, pieces).filter(Boolean).join(" ") : clean(n.textContent);
    }
    function walk(n) {
      if (n.nodeType === 3) { line += n.textContent; return; }
      if (n.nodeType !== 1 || n.matches(SKIP)) return;
      var tag = n.tagName, disp = getComputedStyle(n).display;
      if (disp === "none") return;
      if (tag === "BR") { if (n.closest("h1,h2,h3")) line += " "; else flush(); return; }
      if (tag === "svg") { flush(); if (n.dataset.md) out.push(n.dataset.md); return; }
      if (tag === "TABLE") {
        flush(); out.push("");
        [].forEach.call(n.rows, function (r, i) {
          out.push("| " + [].map.call(r.cells, cell).join(" | ") + " |");
          if (!i) out.push("|" + [].map.call(r.cells, function () { return " --- "; }).join("|") + "|");
        });
        out.push(""); return;
      }
      if (n.classList.contains("bar-row")) { flush(); out.push("- " + cell(n.querySelector(".lbl")) + ": " + cell(n.querySelector(".val"))); return; }
      if (n.classList.contains("tipbox")) { flush(); out.push("> " + tip(n)); return; }
      var block = disp.indexOf("inline") !== 0 && disp !== "contents", start, one;
      if (block) { flush(); start = out.length; }
      if (block && (one = compact(n))) { out.push(one); return; }
      [].forEach.call(n.childNodes, walk);
      var href = tag === "A" && n.getAttribute("href") || "";
      if (/^https?:/.test(href) && line.indexOf(href.replace(/^https?:\/\//, "")) < 0) line += " (" + href + ")";
      if (block) {
        flush();
        var pre = /^H[12]$/.test(tag) ? "### " : tag === "H3" ? "#### " : tag === "LI" ? "- " : "";
        if (pre && out.length > start) out[start] = pre + out[start];
      }
    }
    var co = D.company || document.title, url = location.origin + location.pathname;
    var md = [
      "# " + [co, (D.round ? D.round + " " : "") + "Investor Deck", D.date].filter(Boolean).join(" · "),
      "",
      "Source: " + url + " · Confidential, shared for investor review.",
      "",
      "> **Brief for the AI assistant:** Below is the complete text of " + co + "'s " + (D.round ? D.round.toLowerCase() + " " : "") + "investor deck, slide by slide (images are described by their captions). " +
      "I'm evaluating this round. Read all of it, then give me: (1) a five-line summary of the company, the market, traction to date and the ask; " +
      "(2) the strongest parts of the case; (3) the biggest risks and gaps; (4) the questions I should put to the founder. " +
      "After that, answer my follow-up questions from the deck, cite slide numbers, and say plainly when the deck doesn't cover something.",
      ""
    ];
    slides.forEach(function (s, i) {
      if (s.hasAttribute("data-nocopy")) return;
      var k = s.querySelector(".kick span");
      out = []; line = "";
      [].forEach.call(s.childNodes, walk); flush();
      md.push("## " + String(i + 1).padStart(2, "0") + " · " + clean(k ? k.textContent : s.dataset.title), "");
      // A blank line between paragraphs, none inside a run of list, table or quote lines.
      out.forEach(function (l, j) { md.push(l); if (!(/^[-|>]/.test(l) && (out[j + 1] || "")[0] === l[0])) md.push(""); });
    });
    if (D.contact) md.push("---", D.contact);
    return md.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }
  window.deckMarkdown = deckMarkdown; // handy from the console, and for scripts/check.mjs
  var aiBtn = document.getElementById("copy-ai"), aiToast = document.getElementById("ai-toast"), aiTimer;
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    return new Promise(function (ok, fail) {
      var ta = document.createElement("textarea"); ta.value = t; ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? ok() : fail(); } catch (e) { fail(e); } finally { ta.remove(); }
    });
  }
  function toast(html) {
    aiToast.innerHTML = html; aiToast.classList.add("on"); aiBtn.classList.add("done");
    clearTimeout(aiTimer); aiTimer = setTimeout(function () { aiToast.classList.remove("on"); aiBtn.classList.remove("done"); }, 4200);
  }
  aiBtn.addEventListener("click", function () {
    copyText(deckMarkdown()).then(
      function () { toast("<b>Deck copied.</b>Paste it into ChatGPT, Claude or Gemini and ask it anything about " + co() + "."); },
      function () { toast("<b>Couldn't reach the clipboard.</b>Your browser blocked it; please try again."); }
    );
  });
  function co() { return D.company || "the company"; }

  // Contents: number each line from the live slide order and jump on click.
  document.querySelectorAll(".toc-row").forEach(function (row) {
    var k = slides.findIndex(function (sl) { return sl.dataset.title === row.dataset.go; });
    row.querySelector(".toc-n").textContent = k >= 0 ? String(k + 1).padStart(2, "0") : "";
    row.addEventListener("click", function (e) { e.preventDefault(); if (k >= 0) show(k); });
  });
  document.addEventListener("fullscreenchange", function () { if (!document.fullscreenElement && presenting) setPresent(false); });
  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "p" || e.key === "P") { setPresent(!presenting); return; }
    if (e.key === "Escape" && presenting) { setPresent(false); return; }
    var base = presenting ? idx : nearest();
    if (["ArrowRight", "ArrowDown", "PageDown", " "].indexOf(e.key) > -1) { e.preventDefault(); show(base + 1); }
    if (["ArrowLeft", "ArrowUp", "PageUp"].indexOf(e.key) > -1) { e.preventDefault(); show(base - 1); }
  });
  document.addEventListener("click", function (e) { if (presenting && !e.target.closest("a,button")) show(idx + (e.clientX < innerWidth / 3 ? -1 : 1)); });
  setTimeout(function () { var h = document.querySelector(".hint"); if (h) h.style.opacity = 0; }, 6000);
  var m = location.hash.match(/^#s(\d+)$/); if (m) setTimeout(function () { show(+m[1] - 1); }, 100);
})();

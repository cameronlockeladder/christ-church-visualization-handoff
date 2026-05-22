/* =========================================================================
   Christ Church Oak Brook · Roof Restoration
   Static, board-facing timeline. Vanilla JS.
   ========================================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Access gate
     ----------------------------------------------------------------------- */
  var ACCESS_CODE = "501";
  var SESSION_KEY = "ccob.boardAccess";

  function unlock() {
    document.body.classList.remove("locked");
    var gate = document.getElementById("gate");
    gate.classList.add("is-hidden");
    try { sessionStorage.setItem(SESSION_KEY, "true"); } catch (_) {}
  }

  function initGate() {
    var gate = document.getElementById("gate");
    var input = document.getElementById("gate-input");
    var error = document.getElementById("gate-error");
    var form = document.getElementById("gate-form");

    var already = false;
    try { already = sessionStorage.getItem(SESSION_KEY) === "true"; } catch (_) {}

    if (already) { unlock(); return; }

    setTimeout(function () { input.focus(); }, 50);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = (input.value || "").trim();
      if (val === ACCESS_CODE) {
        error.textContent = "";
        unlock();
      } else {
        error.textContent = "That code is not correct. Try again.";
        gate.classList.add("is-shaking");
        setTimeout(function () { gate.classList.remove("is-shaking"); }, 380);
        input.select();
      }
    });
  }

  /* -----------------------------------------------------------------------
     Timeline steps
     ----------------------------------------------------------------------- */
  var STEPS = [
    {
      id: 1,
      label: "Existing view",
      dates: "Today",
      visible: [],
      completed: [],
      summary: "The roof today. No work has started.",
      items: ["Nothing on site."]
    },
    {
      id: 2,
      label: "Scaffolding setup",
      dates: "07/06/2026 \u2013 07/31/2026",
      visible: ["scaffolding"],
      completed: [],
      summary: "Scaffolding is built around the steeple and the sanctuary. No roof work yet.",
      items: [
        "Scaffolding around steeple and sanctuary.",
        "No tear-off."
      ]
    },
    {
      id: 3,
      label: "Steeple work",
      dates: "08/03/2026 \u2013 08/07/2026",
      visible: ["scaffolding", "crane", "dumpster", "steeple"],
      completed: [],
      summary:
        "Cedar comes off the steeple. New Brava cedar goes on. Old material drops into the dumpster through a chute.",
      items: [
        "Crane on site.",
        "Dumpster active.",
        "Steeple cedar being replaced."
      ]
    },
    {
      id: 4,
      label: "Steeple complete",
      dates: "On steeple completion",
      visible: ["scaffolding", "dumpster", "steeple"],
      completed: ["steeple"],
      summary:
        "Steeple is finished. Crane leaves. Sanctuary scaffolding stays up. Dumpster stays for sanctuary work.",
      items: [
        "Crane removed.",
        "Steeple complete.",
        "Sanctuary scaffolding stays up."
      ]
    },
    {
      id: 5,
      label: "Sanctuary 1 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      visible: ["scaffolding", "dumpster", "materials-path", "steeple", "sanctuary-01"],
      completed: ["steeple"],
      summary:
        "First sanctuary section is torn off and rebuilt with new Brava cedar and metal drip edge.",
      items: [
        "Sanctuary 1 in progress.",
        "Material moves from parking lot to flat roof.",
        "Dumpster remains."
      ]
    },
    {
      id: 6,
      label: "Sanctuary 2 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      visible: [
        "scaffolding", "dumpster", "materials-path", "steeple",
        "sanctuary-01", "sanctuary-02"
      ],
      completed: ["steeple", "sanctuary-01"],
      summary: "Section 1 done. Section 2 is being torn off and rebuilt.",
      items: ["Sanctuary 2 in progress.", "Section 1 complete."]
    },
    {
      id: 7,
      label: "Sanctuary 3 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      visible: [
        "scaffolding", "dumpster", "materials-path", "steeple",
        "sanctuary-01", "sanctuary-02", "sanctuary-03"
      ],
      completed: ["steeple", "sanctuary-01", "sanctuary-02"],
      summary: "Sections 1 and 2 done. Section 3 is being torn off and rebuilt.",
      items: ["Sanctuary 3 in progress.", "Sections 1 and 2 complete."]
    },
    {
      id: 8,
      label: "Sanctuary 4 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      visible: [
        "scaffolding", "dumpster", "materials-path", "steeple",
        "sanctuary-01", "sanctuary-02", "sanctuary-03", "sanctuary-04"
      ],
      completed: ["steeple", "sanctuary-01", "sanctuary-02", "sanctuary-03"],
      summary: "Sections 1, 2, and 3 done. Section 4 is being torn off and rebuilt.",
      items: ["Sanctuary 4 in progress.", "Sections 1\u20133 complete."]
    },
    {
      id: 9,
      label: "Complete",
      dates: "After Phase 2",
      visible: ["after"],
      completed: [],
      summary: "All sections finished. Scaffolding, dumpster, and material paths removed.",
      items: [
        "New Brava cedar on steeple and sanctuary.",
        "All metal drip edge installed.",
        "Site cleared."
      ]
    }
  ];

  var COLOR_ACTIVE = "#C8651E";
  var COLOR_COMPLETE = "#3F7A50";

  /* -----------------------------------------------------------------------
     Partners
     ---
     To add a partner: drop the logo file into assets/partners/, then add
     a new entry below with `src` and `name`. SVG and PNG both work.
     ----------------------------------------------------------------------- */
  var PARTNERS = [
    // Example:
    // { src: "assets/partners/example.png", name: "Example Partner" },
  ];

  /* -----------------------------------------------------------------------
     Reference (lightbox)
     ----------------------------------------------------------------------- */
  var REFERENCE = {
    src: "assets/timeline-overlays/site-vibe-reference-gemini.png",
    caption:
      "Early concept rendering. Used for visual mood only \u2014 not accurate for placement, scaffolding logic, or roof geometry. Refer to the timeline above for the actual sequence."
  };

  /* -----------------------------------------------------------------------
     DOM
     ----------------------------------------------------------------------- */
  var $ = function (id) { return document.getElementById(id); };

  var captionStep, captionTitle, captionDates;
  var nowStepName, detailTitle, detailDates, detailSummary, detailList;
  var input, progress, ticksEl;
  var prevBtn, nextBtn, playBtn, playIcon;
  var LAYERS = {};

  var currentIndex = 0;
  var playTimer = null;
  var playing = false;

  function bindDom() {
    captionStep = $("caption-step");
    captionTitle = $("caption-title");
    captionDates = $("caption-dates");
    nowStepName = $("now-step-name");
    detailTitle = $("detail-title");
    detailDates = $("detail-dates");
    detailSummary = $("detail-summary");
    detailList = $("detail-list");
    input = $("scrubber-input");
    progress = $("scrubber-progress");
    ticksEl = $("scrubber-ticks");
    prevBtn = $("ctrl-prev");
    nextBtn = $("ctrl-next");
    playBtn = $("ctrl-play");
    playIcon = $("ctrl-play-icon");

    LAYERS = {
      scaffolding: $("layer-scaffolding"),
      crane: $("layer-crane"),
      dumpster: $("layer-dumpster"),
      "materials-path": $("layer-materials"),
      steeple: $("layer-steeple"),
      "sanctuary-01": $("layer-sanctuary-01"),
      "sanctuary-02": $("layer-sanctuary-02"),
      "sanctuary-03": $("layer-sanctuary-03"),
      "sanctuary-04": $("layer-sanctuary-04"),
      after: $("layer-after")
    };
  }

  /* -----------------------------------------------------------------------
     Ticks
     ----------------------------------------------------------------------- */
  function buildTicks() {
    var html = "";
    for (var i = 0; i < STEPS.length; i++) {
      var s = STEPS[i];
      var num = String(s.id).padStart(2, "0");
      html +=
        '<li class="tick" data-index="' + i + '" data-testid="tick-' + s.id + '">' +
        '<span class="tick-dot" aria-hidden="true"></span>' +
        '<span class="tick-num">' + num + '</span>' +
        '<span class="tick-label">' + s.label + '</span>' +
        '</li>';
    }
    ticksEl.innerHTML = html;
    var tickEls = ticksEl.querySelectorAll(".tick");
    for (var j = 0; j < tickEls.length; j++) {
      (function (el) {
        el.addEventListener("click", function () {
          var idx = parseInt(el.getAttribute("data-index"), 10);
          stopPlay();
          goTo(idx);
        });
      })(tickEls[j]);
    }
  }

  /* -----------------------------------------------------------------------
     Render
     ----------------------------------------------------------------------- */
  function setVisible(id, on) {
    var n = LAYERS[id];
    if (!n) return;
    if (on) n.classList.add("is-visible");
    else n.classList.remove("is-visible");
  }

  function setColor(id, color) {
    var n = LAYERS[id];
    if (!n) return;
    n.style.backgroundColor = color;
  }

  function applyStep(step) {
    Object.keys(LAYERS).forEach(function (k) { setVisible(k, false); });
    setColor("steeple", COLOR_ACTIVE);
    setColor("sanctuary-01", COLOR_ACTIVE);
    setColor("sanctuary-02", COLOR_ACTIVE);
    setColor("sanctuary-03", COLOR_ACTIVE);
    setColor("sanctuary-04", COLOR_ACTIVE);
    step.visible.forEach(function (id) { setVisible(id, true); });
    step.completed.forEach(function (id) {
      if (LAYERS[id]) setColor(id, COLOR_COMPLETE);
    });
  }

  function updateCopy(step) {
    captionStep.textContent = "Step " + step.id + " of " + STEPS.length;
    captionTitle.textContent = step.label;
    captionDates.textContent = step.dates;
    nowStepName.textContent = step.label;
    detailTitle.textContent = step.label;
    detailDates.textContent = step.dates;
    detailSummary.textContent = step.summary;

    var listHtml = "";
    for (var i = 0; i < step.items.length; i++) {
      listHtml += '<li><span class="pill"></span><span>' + step.items[i] + "</span></li>";
    }
    detailList.innerHTML = listHtml;
  }

  function updateTicks(index) {
    var tickEls = ticksEl.querySelectorAll(".tick");
    for (var i = 0; i < tickEls.length; i++) {
      tickEls[i].classList.remove("is-past", "is-current");
      if (i < index) tickEls[i].classList.add("is-past");
      if (i === index) tickEls[i].classList.add("is-current");
    }
  }

  function updateProgress(index) {
    var pct = STEPS.length > 1 ? (index / (STEPS.length - 1)) * 100 : 0;
    progress.style.width = pct + "%";
  }

  function goTo(index) {
    if (index < 0) index = 0;
    if (index > STEPS.length - 1) index = STEPS.length - 1;
    currentIndex = index;
    input.value = String(index);
    var step = STEPS[index];
    applyStep(step);
    updateCopy(step);
    updateTicks(index);
    updateProgress(index);
  }

  /* -----------------------------------------------------------------------
     Play / pause
     ----------------------------------------------------------------------- */
  function setPlayIcon(isPlaying) {
    if (isPlaying) {
      playIcon.innerHTML =
        '<rect x="7" y="5" width="3.5" height="14" rx="0.5" fill="currentColor"/>' +
        '<rect x="13.5" y="5" width="3.5" height="14" rx="0.5" fill="currentColor"/>';
      playBtn.setAttribute("aria-label", "Pause timeline");
    } else {
      playIcon.innerHTML = '<path d="M8 5l11 7-11 7V5z" fill="currentColor"/>';
      playBtn.setAttribute("aria-label", "Play timeline");
    }
  }

  function startPlay() {
    if (playing) return;
    playing = true;
    setPlayIcon(true);
    if (currentIndex >= STEPS.length - 1) goTo(0);
    playTimer = window.setInterval(function () {
      if (currentIndex >= STEPS.length - 1) { stopPlay(); return; }
      goTo(currentIndex + 1);
    }, 1800);
  }

  function stopPlay() {
    playing = false;
    setPlayIcon(false);
    if (playTimer) { window.clearInterval(playTimer); playTimer = null; }
  }

  /* -----------------------------------------------------------------------
     Partners
     ----------------------------------------------------------------------- */
  function buildPartners() {
    var grid = $("partners-grid");
    var empty = $("partners-empty");
    if (!PARTNERS.length) {
      empty.hidden = false;
      grid.innerHTML = "";
      return;
    }
    empty.hidden = true;
    var html = "";
    for (var i = 0; i < PARTNERS.length; i++) {
      var p = PARTNERS[i];
      html +=
        '<div class="partner-tile" data-testid="partner-tile">' +
        '<img src="' + p.src + '" alt="' + p.name + '" loading="lazy" />' +
        (p.name ? '<span class="partner-name">' + p.name + '</span>' : "") +
        '</div>';
    }
    grid.innerHTML = html;
  }

  /* -----------------------------------------------------------------------
     Lightbox
     ----------------------------------------------------------------------- */
  function initLightbox() {
    var btn = $("reference-btn");
    var box = $("lightbox");
    var img = $("lightbox-img");
    var cap = $("lightbox-caption");
    var close = $("lightbox-close");

    function open() {
      img.src = REFERENCE.src;
      cap.textContent = REFERENCE.caption;
      box.hidden = false;
      document.body.style.overflow = "hidden";
      close.focus();
    }
    function shut() {
      box.hidden = true;
      document.body.style.overflow = "";
    }
    btn.addEventListener("click", open);
    close.addEventListener("click", shut);
    box.addEventListener("click", function (e) {
      if (e.target === box) shut();
    });
    document.addEventListener("keydown", function (e) {
      if (!box.hidden && e.key === "Escape") shut();
    });
  }

  /* -----------------------------------------------------------------------
     Events
     ----------------------------------------------------------------------- */
  function onInput() {
    var idx = parseInt(input.value, 10);
    if (Number.isNaN(idx)) idx = 0;
    if (idx !== currentIndex) { stopPlay(); goTo(idx); }
  }
  function onPrev() { stopPlay(); goTo(currentIndex - 1); }
  function onNext() { stopPlay(); goTo(currentIndex + 1); }

  function onKey(e) {
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    if (tag === "INPUT" && document.activeElement !== input) return;
    if (e.key === "ArrowRight") { e.preventDefault(); onNext(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); onPrev(); }
    else if (e.key === " " || e.code === "Space") {
      if (document.activeElement === input) return;
      e.preventDefault();
      if (playing) stopPlay(); else startPlay();
    }
  }

  /* -----------------------------------------------------------------------
     Init
     ----------------------------------------------------------------------- */
  function initApp() {
    bindDom();
    buildTicks();
    goTo(0);
    buildPartners();
    initLightbox();
    input.addEventListener("input", onInput);
    prevBtn.addEventListener("click", onPrev);
    nextBtn.addEventListener("click", onNext);
    playBtn.addEventListener("click", function () {
      if (playing) stopPlay(); else startPlay();
    });
    document.addEventListener("keydown", onKey);
  }

  function init() {
    initGate();
    initApp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

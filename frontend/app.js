/* =========================================================================
   Christ Church Oak Brook · Roof Restoration
   ========================================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Gate
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
     Steps + date range
     Each step has an optional `range` (inclusive ISO start/end) used to
     map a calendar date to the right step.
     ----------------------------------------------------------------------- */
  var STEPS = [
    {
      id: 1,
      label: "Existing view",
      dates: "Today",
      range: null,
      visible: [], completed: [],
      summary: "The roof today. No work has started.",
      items: ["Nothing on site."]
    },
    {
      id: 2,
      label: "Scaffolding setup",
      dates: "07/06/2026 \u2013 07/31/2026",
      range: { start: "2026-07-06", end: "2026-07-31" },
      visible: ["scaffolding"], completed: [],
      summary: "Scaffolding is built around the steeple and the sanctuary. No roof work yet.",
      items: ["Scaffolding around steeple and sanctuary.", "No tear-off."]
    },
    {
      id: 3,
      label: "Steeple work",
      dates: "08/03/2026 \u2013 08/07/2026",
      range: { start: "2026-08-03", end: "2026-08-07" },
      visible: ["scaffolding", "crane", "dumpster", "steeple"], completed: [],
      summary:
        "Cedar comes off the steeple. New Brava cedar goes on. Old material drops into the dumpster through a chute.",
      items: ["Crane on site.", "Dumpster active.", "Steeple cedar being replaced."]
    },
    {
      id: 4,
      label: "Steeple complete",
      dates: "On steeple completion",
      range: { start: "2026-08-08", end: "2026-08-09" },
      visible: ["scaffolding", "dumpster", "steeple"], completed: ["steeple"],
      summary:
        "Steeple is finished. Crane leaves. Sanctuary scaffolding stays up. Dumpster stays for sanctuary work.",
      items: ["Crane removed.", "Steeple complete.", "Sanctuary scaffolding stays up."]
    },
    {
      id: 5,
      label: "Sanctuary 1 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      range: { start: "2026-08-10", end: "2026-08-14" },
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
      range: { start: "2026-08-15", end: "2026-08-19" },
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
      range: { start: "2026-08-20", end: "2026-08-24" },
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
      range: { start: "2026-08-25", end: "2026-08-28" },
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
      range: null,
      visible: ["after"], completed: [],
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

  var PROJECT_START = "2026-07-06";
  var PROJECT_END = "2026-08-28";

  /* -----------------------------------------------------------------------
     Partners — drop new logos into assets/partners/ and add an entry here.
     `isOriginalLight: true` skips the brightness-invert filter for logos
     that are already white-on-transparent (e.g. Bone Roofing Supply).
     ----------------------------------------------------------------------- */
  var PARTNERS = [
    { src: "assets/partners/imperial-crane.png", name: "Imperial Crane" },
    { src: "assets/partners/bone-roofing-supply.webp", name: "Bone Roofing Supply", isOriginalLight: true },
    { src: "assets/partners/prime-scaffold.png", name: "Prime Scaffold" },
    { src: "assets/partners/great-lakes-kwik-space.png", name: "Great Lakes Kwik Space" },
    { src: "assets/partners/porta-potty-dogs.webp", name: "Porta Potty Dogs" }
  ];

  var REFERENCE = {
    src: "assets/timeline-overlays/site-vibe-reference-gemini.png",
    caption:
      "Early concept rendering. Used for visual mood only \u2014 not accurate for placement, scaffolding logic, or roof geometry. Refer to the timeline above for the actual sequence."
  };

  var DOCS = {
    brava: {
      kicker: "Warranty",
      title: "Brava Roofing Warranty",
      desc: "Brava limited lifetime manufacturer warranty for the composite cedar shake roofing material.",
      type: "pdf",
      src: "assets/docs/brava-limited-lifetime-warranty.pdf"
    },
    metal: {
      kicker: "Warranty",
      title: "Kynar Steel Warranty",
      desc: "CMG Durapon70 PVDF 40 year limited warranty for the Kynar-coated metal package.",
      type: "pdf",
      src: "assets/docs/cmg-durapon70-pvdf-40-year-warranty.pdf"
    },
    osha: {
      kicker: "Credential",
      title: "OSHA Licenses & Certifications",
      desc: "OSHA 10 card and OSHA 10 certificate pages from the project packet.",
      type: "pdf",
      src: "assets/docs/osha-card-and-certificate.pdf"
    },
    license: {
      kicker: "Credential",
      title: "Illinois State License",
      desc: "Locke & Ladder active Illinois roofing contractor license certificate.",
      type: "image",
      src: "assets/docs/illinois-roofing-contractor-license-locke-ladder.png"
    }
  };

  /* -----------------------------------------------------------------------
     DOM
     ----------------------------------------------------------------------- */
  var $ = function (id) { return document.getElementById(id); };

  var captionStep, captionTitle, captionDates;
  var nowStepName, detailTitle, detailDates, detailSummary, detailList;
  var input, progress, ticksEl;
  var prevBtn, nextBtn, playBtn, playIcon;
  var dateForm, dateInput;
  var todayChip, todayLabel;
  var docPanel, docPanelKicker, docPanelTitle, docPanelDesc;
  var docDirectLink, docFrame, docImage, docClose;
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
    dateForm = $("date-jump");
    dateInput = $("date-jump-input");
    todayChip = $("today-chip");
    todayLabel = $("today-label");
    docPanel = $("doc-panel");
    docPanelKicker = $("doc-panel-kicker");
    docPanelTitle = $("doc-panel-title");
    docPanelDesc = $("doc-panel-desc");
    docDirectLink = $("doc-direct-link");
    docFrame = $("doc-frame");
    docImage = $("doc-image");
    docClose = $("doc-panel-close");

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
     Date helpers
     ----------------------------------------------------------------------- */
  function isoToDay(iso) {
    // returns ms timestamp at noon UTC to avoid DST edge cases
    if (!iso) return NaN;
    var parts = iso.split("-");
    if (parts.length !== 3) return NaN;
    var y = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var d = parseInt(parts[2], 10);
    return Date.UTC(y, m - 1, d, 12, 0, 0);
  }

  function dateToStepIndex(iso) {
    var t = isoToDay(iso);
    if (isNaN(t)) return -1;
    var start = isoToDay(PROJECT_START);
    var end = isoToDay(PROJECT_END);
    if (t < start) return 0;
    if (t > end) return 8;
    for (var i = 0; i < STEPS.length; i++) {
      var r = STEPS[i].range;
      if (r && t >= isoToDay(r.start) && t <= isoToDay(r.end)) return i;
    }
    // Date is inside project window but outside any explicit range
    // (e.g. 08/01 - 08/02 between scaffold setup and steeple work).
    // Pick the most recent past step.
    var pick = 0;
    for (var j = 0; j < STEPS.length; j++) {
      var r2 = STEPS[j].range;
      if (r2 && t >= isoToDay(r2.start)) pick = j;
    }
    return pick;
  }

  function todayIso() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function daysBetween(isoA, isoB) {
    var a = isoToDay(isoA), b = isoToDay(isoB);
    if (isNaN(a) || isNaN(b)) return 0;
    return Math.round((b - a) / 86400000);
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
     Partner marquee — duplicate the set so the keyframe animation loops
     seamlessly (translateX -50%).
     ----------------------------------------------------------------------- */
  function buildMarquee() {
    var track = $("marquee-track");
    if (!track) return;
    if (!PARTNERS.length) {
      track.innerHTML = "";
      return;
    }
    function tileHtml(p) {
      var cls = "partner-tile" + (p.isOriginalLight ? " is-original-light" : "");
      return (
        '<div class="' + cls + '" data-testid="partner-tile" title="' + p.name + '">' +
        '<img src="' + p.src + '" alt="' + p.name + '" loading="lazy" />' +
        '</div>'
      );
    }
    var one = PARTNERS.map(tileHtml).join("");
    // Render the set twice for an infinite -50% loop.
    track.innerHTML = one + one;
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
     Document previews
     ----------------------------------------------------------------------- */
  function initDocuments() {
    if (!docPanel) return;
    var cards = Array.prototype.slice.call(document.querySelectorAll(".doc-card[data-doc-target]"));

    function clearActive() {
      cards.forEach(function (card) {
        card.classList.remove("is-active");
        card.setAttribute("aria-expanded", "false");
      });
    }

    function closePanel() {
      clearActive();
      docPanel.hidden = true;
      docFrame.src = "about:blank";
      docImage.src = "";
      docImage.hidden = true;
      docFrame.hidden = false;
    }

    function openDoc(key, card) {
      var doc = DOCS[key];
      if (!doc) return;
      clearActive();
      card.classList.add("is-active");
      card.setAttribute("aria-expanded", "true");

      docPanelKicker.textContent = doc.kicker;
      docPanelTitle.textContent = doc.title;
      docPanelDesc.textContent = doc.desc;
      docDirectLink.href = doc.src;
      docDirectLink.textContent = doc.type === "image" ? "Open image" : "Open PDF";

      if (doc.type === "image") {
        docFrame.hidden = true;
        docFrame.src = "about:blank";
        docImage.hidden = false;
        docImage.src = doc.src;
        docImage.alt = doc.title;
      } else {
        docImage.hidden = true;
        docImage.src = "";
        docFrame.hidden = false;
        docFrame.src = doc.src + "#toolbar=1&navpanes=0";
      }

      docPanel.hidden = false;
      docPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        var key = card.getAttribute("data-doc-target");
        if (card.classList.contains("is-active") && !docPanel.hidden) {
          closePanel();
        } else {
          openDoc(key, card);
        }
      });
    });

    if (docClose) docClose.addEventListener("click", closePanel);
  }

  /* -----------------------------------------------------------------------
     Date jump
     ----------------------------------------------------------------------- */
  function initDateJump() {
    // Default the input to today (so when a board member opens it the
    // value is sensible).
    var today = todayIso();
    dateInput.value = today;

    function jump() {
      var iso = dateInput.value;
      if (!iso) return;
      var idx = dateToStepIndex(iso);
      if (idx < 0) return;
      stopPlay();
      goTo(idx);
      // Scroll the stage into view so it's obvious something happened.
      var stage = document.getElementById("image-stage");
      if (stage && stage.scrollIntoView) {
        stage.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    dateForm.addEventListener("submit", function (e) {
      e.preventDefault();
      jump();
    });
    // Allow the date input to immediately jump on change too.
    dateInput.addEventListener("change", jump);
  }

  /* -----------------------------------------------------------------------
     Today's status chip
     ----------------------------------------------------------------------- */
  function initTodayChip() {
    var today = todayIso();
    var t = isoToDay(today);
    var start = isoToDay(PROJECT_START);
    var end = isoToDay(PROJECT_END);

    var text = "";
    if (t < start) {
      var d = daysBetween(today, PROJECT_START);
      if (d > 0) text = "Project begins in " + d + " day" + (d === 1 ? "" : "s");
    } else if (t > end) {
      text = "Project complete";
    } else {
      var idx = dateToStepIndex(today);
      if (idx >= 0) text = "Today: " + STEPS[idx].label;
    }

    if (text) {
      todayLabel.textContent = text;
      todayChip.hidden = false;
    }
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
    buildMarquee();
    initLightbox();
    initDocuments();
    initDateJump();
    initTodayChip();
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

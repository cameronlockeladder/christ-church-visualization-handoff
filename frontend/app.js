/* =========================================================================
   Christ Church Oak Brook · Roof Restoration Timeline
   Interaction logic for the timeline scrubber and overlay stack.
   ========================================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
   * Step model
   *
   * Each step declares:
   *   - id, label, dates  -> display copy
   *   - visible[]         -> layer ids to show
   *   - completed[]       -> ids that should appear in the completed color
   *   - active            -> id that should appear in its own active color
   *   - summary, items    -> right-hand card copy
   * --------------------------------------------------------------------- */

  var STEPS = [
    {
      id: 1,
      label: "Existing view",
      dates: "Today",
      shortDate: "Today",
      visible: [],
      completed: [],
      active: null,
      summary:
        "The roof as it stands today. No scaffolding, no equipment. Use the scrubber to step forward through each phase of the project.",
      items: [
        { c: "#6B5E4D", t: "Site untouched. Existing cedar roof on steeple and sanctuary." }
      ]
    },
    {
      id: 2,
      label: "Scaffolding setup",
      dates: "07/06/2026 \u2013 07/31/2026",
      shortDate: "Jul 6 \u2013 31",
      visible: ["scaffolding"],
      completed: [],
      active: null,
      summary:
        "Scaffolding is installed around the steeple and sanctuary. This is site preparation before any active roof tear-off begins.",
      items: [
        { c: "#6B5E4D", t: "Scaffolding installed around steeple and sanctuary." },
        { c: "#8a8174", t: "No tear-off yet. The existing roof remains in place." }
      ]
    },
    {
      id: 3,
      label: "Steeple work",
      dates: "08/03/2026 \u2013 08/07/2026",
      shortDate: "Aug 3 \u2013 7",
      visible: ["scaffolding", "crane", "dumpster", "steeple"],
      completed: [],
      active: "steeple",
      summary:
        "Existing cedar is torn off the steeple and new Brava cedar installation begins. The crane is on site for the week. Debris is dropped through a chute into the dumpster.",
      items: [
        { c: "#AF6D2C", t: "Steeple active \u2014 cedar tear-off and new Brava install." },
        { c: "#6B5E4D", t: "Crane on site for steeple work (Phase 1 only)." },
        { c: "#6B5E4D", t: "Dumpster active. Existing roof material is chuted in." },
        { c: "#6B5E4D", t: "Scaffolding remains around steeple and sanctuary." }
      ]
    },
    {
      id: 4,
      label: "Steeple complete",
      dates: "Upon completion of steeple",
      shortDate: "Steeple done",
      visible: ["scaffolding", "dumpster", "steeple"],
      completed: ["steeple"],
      active: null,
      summary:
        "The steeple is finished and the crane departs. The steeple scaffolding is removed, but sanctuary scaffolding stays in place until the sanctuary roof is also complete. The dumpster remains for the next phase.",
      items: [
        { c: "#3F7A50", t: "Steeple complete." },
        { c: "#6B5E4D", t: "Crane departs. No more crane on the property." },
        { c: "#6B5E4D", t: "Sanctuary scaffolding remains. Dumpster remains." }
      ]
    },
    {
      id: 5,
      label: "Sanctuary 1 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      shortDate: "Aug 10 \u2013 28",
      visible: ["scaffolding", "dumpster", "materials-path", "steeple", "sanctuary-01"],
      completed: ["steeple"],
      active: "sanctuary-01",
      summary:
        "Phase 2 begins. Sanctuary section 1 is removed and rebuilt with new Brava cedar and metal drip edge. Roof deck is inspected as work proceeds. Material is moved from the parking lot to the flat roof along the dedicated path.",
      items: [
        { c: "#B56F39", t: "Sanctuary 1 active \u2014 tear-off and new Brava install." },
        { c: "#3F7A50", t: "Steeple already complete." },
        { c: "#6B5E4D", t: "Materials path active to the flat roof." },
        { c: "#6B5E4D", t: "Dumpster remains. Sanctuary scaffolding stays up." }
      ]
    },
    {
      id: 6,
      label: "Sanctuary 2 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      shortDate: "Aug 10 \u2013 28",
      visible: [
        "scaffolding",
        "dumpster",
        "materials-path",
        "steeple",
        "sanctuary-01",
        "sanctuary-02"
      ],
      completed: ["steeple", "sanctuary-01"],
      active: "sanctuary-02",
      summary:
        "Section 1 is finished. Section 2 is now actively being torn off and rebuilt. The crew is moving section by section so the building stays mostly enclosed.",
      items: [
        { c: "#8F7B34", t: "Sanctuary 2 active." },
        { c: "#3F7A50", t: "Steeple and Sanctuary 1 complete." },
        { c: "#6B5E4D", t: "Material continues to move along the dedicated path." }
      ]
    },
    {
      id: 7,
      label: "Sanctuary 3 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      shortDate: "Aug 10 \u2013 28",
      visible: [
        "scaffolding",
        "dumpster",
        "materials-path",
        "steeple",
        "sanctuary-01",
        "sanctuary-02",
        "sanctuary-03"
      ],
      completed: ["steeple", "sanctuary-01", "sanctuary-02"],
      active: "sanctuary-03",
      summary:
        "Sections 1 and 2 are complete. Section 3 is actively being worked. Stained glass continues to be protected by plywood during working hours and uncovered for any services.",
      items: [
        { c: "#4F7478", t: "Sanctuary 3 active." },
        { c: "#3F7A50", t: "Steeple, Sanctuary 1 and 2 complete." },
        { c: "#6B5E4D", t: "Roof deck inspected and mitigated as needed." }
      ]
    },
    {
      id: 8,
      label: "Sanctuary 4 active",
      dates: "08/10/2026 \u2013 08/28/2026",
      shortDate: "Aug 10 \u2013 28",
      visible: [
        "scaffolding",
        "dumpster",
        "materials-path",
        "steeple",
        "sanctuary-01",
        "sanctuary-02",
        "sanctuary-03",
        "sanctuary-04"
      ],
      completed: ["steeple", "sanctuary-01", "sanctuary-02", "sanctuary-03"],
      active: "sanctuary-04",
      summary:
        "The final sanctuary section is underway. Once Sanctuary 4 is complete, the sanctuary scaffolding can come down and the project enters its final wrap.",
      items: [
        { c: "#7A6092", t: "Sanctuary 4 active \u2014 last section." },
        { c: "#3F7A50", t: "Steeple, Sanctuary 1, 2, and 3 complete." }
      ]
    },
    {
      id: 9,
      label: "Complete",
      dates: "After Phase 2 completion",
      shortDate: "Complete",
      visible: ["after"],
      completed: [],
      active: null,
      summary:
        "All sections are finished. Scaffolding, dumpster, and material paths are removed. The new Brava cedar roof and metal drip edge are in place across the steeple and the full sanctuary.",
      items: [
        { c: "#3F7A50", t: "New Brava cedar across steeple and sanctuary." },
        { c: "#3F7A50", t: "All metal drip edge installed." },
        { c: "#3F7A50", t: "Site cleared. Stained glass back to full visibility." }
      ]
    }
  ];

  var COLORS = {
    complete: "#3F7A50",
    equipment: "#6B5E4D",
    steeple: "#AF6D2C",
    "sanctuary-01": "#B56F39",
    "sanctuary-02": "#8F7B34",
    "sanctuary-03": "#4F7478",
    "sanctuary-04": "#7A6092"
  };

  /* DOM refs ---------------------------------------------------------------- */
  var $ = function (id) {
    return document.getElementById(id);
  };

  var stage = $("image-stage");
  var captionStep = $("caption-step");
  var captionTitle = $("caption-title");
  var captionDates = $("caption-dates");
  var nowStepName = $("now-step-name");
  var detailTitle = $("detail-title");
  var detailDates = $("detail-dates");
  var detailSummary = $("detail-summary");
  var detailOnSite = $("detail-on-site");
  var input = $("scrubber-input");
  var progress = $("scrubber-progress");
  var ticksEl = $("scrubber-ticks");
  var prevBtn = $("ctrl-prev");
  var nextBtn = $("ctrl-next");
  var playBtn = $("ctrl-play");
  var playIcon = $("ctrl-play-icon");

  var LAYERS = {
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

  /* State ------------------------------------------------------------------- */
  var currentIndex = 0;
  var playTimer = null;
  var playing = false;

  /* Build ticks ------------------------------------------------------------- */
  function buildTicks() {
    var html = "";
    for (var i = 0; i < STEPS.length; i++) {
      var s = STEPS[i];
      html +=
        '<li class="tick" data-index="' +
        i +
        '" data-testid="tick-' +
        s.id +
        '">' +
        '<span class="tick-dot" aria-hidden="true"></span>' +
        '<span class="tick-num">' + String(s.id).padStart(2, "0") + '</span>' +
        '<span class="tick-label">' + s.label + '</span>' +
        "</li>";
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

  /* Render ----------------------------------------------------------------- */
  function setLayerVisible(layerId, visible) {
    var node = LAYERS[layerId];
    if (!node) return;
    if (visible) node.classList.add("is-visible");
    else node.classList.remove("is-visible");
  }

  function setMaskColor(layerId, color) {
    var node = LAYERS[layerId];
    if (!node) return;
    node.style.backgroundColor = color;
  }

  function applyStep(step) {
    /* Reset every photo + mask layer first */
    Object.keys(LAYERS).forEach(function (k) {
      setLayerVisible(k, false);
    });

    /* Reset mask colors to their default active colors */
    setMaskColor("steeple", COLORS.steeple);
    setMaskColor("sanctuary-01", COLORS["sanctuary-01"]);
    setMaskColor("sanctuary-02", COLORS["sanctuary-02"]);
    setMaskColor("sanctuary-03", COLORS["sanctuary-03"]);
    setMaskColor("sanctuary-04", COLORS["sanctuary-04"]);
    setMaskColor("materials-path", COLORS.equipment);

    /* Show declared layers */
    step.visible.forEach(function (layerId) {
      setLayerVisible(layerId, true);
    });

    /* Recolor completed mask layers to green */
    step.completed.forEach(function (layerId) {
      if (LAYERS[layerId]) {
        setMaskColor(layerId, COLORS.complete);
      }
    });
  }

  function updateCopy(step) {
    var stepLabel = "Step " + step.id + " of " + STEPS.length;
    captionStep.textContent = stepLabel;
    captionTitle.textContent = step.label;
    captionDates.textContent = step.dates;

    nowStepName.textContent = step.label;

    detailTitle.textContent = step.label;
    detailDates.textContent = step.dates;
    detailSummary.textContent = step.summary;

    var itemsHtml = "";
    for (var i = 0; i < step.items.length; i++) {
      var item = step.items[i];
      itemsHtml +=
        '<li><span class="pill-swatch" style="background:' +
        item.c +
        '"></span><span>' +
        item.t +
        "</span></li>";
    }
    detailOnSite.innerHTML = itemsHtml;
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

  /* Play / pause ----------------------------------------------------------- */
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
      if (currentIndex >= STEPS.length - 1) {
        stopPlay();
        return;
      }
      goTo(currentIndex + 1);
    }, 1800);
  }

  function stopPlay() {
    playing = false;
    setPlayIcon(false);
    if (playTimer) {
      window.clearInterval(playTimer);
      playTimer = null;
    }
  }

  /* Event wiring ----------------------------------------------------------- */
  function onInput() {
    var idx = parseInt(input.value, 10);
    if (Number.isNaN(idx)) idx = 0;
    if (idx !== currentIndex) {
      stopPlay();
      goTo(idx);
    }
  }

  function onPrev() {
    stopPlay();
    goTo(currentIndex - 1);
  }

  function onNext() {
    stopPlay();
    goTo(currentIndex + 1);
  }

  function onKey(evt) {
    if (evt.key === "ArrowRight") {
      evt.preventDefault();
      onNext();
    } else if (evt.key === "ArrowLeft") {
      evt.preventDefault();
      onPrev();
    } else if (evt.key === " " || evt.code === "Space") {
      if (document.activeElement === input) return;
      evt.preventDefault();
      if (playing) stopPlay();
      else startPlay();
    }
  }

  /* Init ------------------------------------------------------------------ */
  function init() {
    buildTicks();
    goTo(0);
    input.addEventListener("input", onInput);
    prevBtn.addEventListener("click", onPrev);
    nextBtn.addEventListener("click", onNext);
    playBtn.addEventListener("click", function () {
      if (playing) stopPlay();
      else startPlay();
    });
    document.addEventListener("keydown", onKey);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

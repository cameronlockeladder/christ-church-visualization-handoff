const dateInput = document.querySelector("#dateInput");
const rotationButton = document.querySelector("#rotationButton");
const mapButton = document.querySelector("#mapButton");
const rotationImage = document.querySelector("#rotationImage");
const mapImage = document.querySelector("#mapImage");
const frameSlider = document.querySelector("#frameSlider");
const frameLabel = document.querySelector("#frameLabel");
const viewLabel = document.querySelector("#viewLabel");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const playButton = document.querySelector("#playButton");
const phaseTitle = document.querySelector("#phaseTitle");
const phaseRange = document.querySelector("#phaseRange");
const statusList = document.querySelector("#statusList");

let frames = [];
let frameIndex = 0;
let mode = "rotation";
let playTimer = null;

const statusColors = {
  scaffold: "blue",
  crane: "yellow",
  dumpster: "green",
  material: "orange",
  forklift: "purple",
  glass: "pink",
};

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function inRange(date, start, end) {
  return date >= parseLocalDate(start) && date <= parseLocalDate(end);
}

function phaseForDate(value) {
  const date = parseLocalDate(value);

  if (inRange(date, "2026-07-06", "2026-07-31")) {
    return {
      title: "Scaffold Setup",
      range: "07/06/2026 - 07/31/2026",
      summary: "No roof tear-off yet. Scaffolding and boarded access control are being built.",
      status: [
        ["scaffold", "Scaffolding", "Active setup around sanctuary eaves, north step-up area, and steeple approach.", "Active"],
        ["crane", "Crane", "Not active during setup window.", "Off"],
        ["dumpster", "Dumpster", "Placement may be prepared, but main debris flow starts in Phase 1.", "Pending"],
        ["material", "Material route", "No active roof material movement yet.", "Off"],
        ["forklift", "Forklift route", "Route should be approved before August work starts.", "Pending"],
        ["glass", "Stained glass protection", "Not active unless scaffold work requires temporary protection.", "Pending"],
      ],
    };
  }

  if (inRange(date, "2026-08-03", "2026-08-07")) {
    return {
      title: "Phase 1: Steeple Work",
      range: "08/03/2026 - 08/07/2026",
      summary: "Steeple/eave scaffold, crane, dumpster, and chute disposal are active.",
      status: [
        ["scaffold", "Scaffolding", "Steeple scaffold, eave scaffold, and north step-up scaffold active.", "Active"],
        ["crane", "Crane", "Yellow crane position active for steeple work.", "Active"],
        ["dumpster", "Dumpster", "Green dumpster remains near chute/service access.", "Active"],
        ["material", "Material route", "Material/chute movement supports steeple work.", "Active"],
        ["forklift", "Forklift route", "Limited use; full route matters more in Phase 2.", "Limited"],
        ["glass", "Stained glass protection", "Use only where exposed to work; remove for services.", "As needed"],
      ],
    };
  }

  if (inRange(date, "2026-08-10", "2026-08-28")) {
    return {
      title: "Phase 2: Sanctuary Roof Work",
      range: "08/10/2026 - 08/28/2026",
      summary: "Crane and steeple scaffold are gone. Sanctuary scaffold, dumpster, material route, and forklift route remain active.",
      status: [
        ["scaffold", "Scaffolding", "Sanctuary eave scaffold and boarded wall remain active.", "Active"],
        ["crane", "Crane", "Phase 1 crane should be removed before this date.", "Off"],
        ["dumpster", "Dumpster", "Dumpster remains for sanctuary roof debris and service access.", "Active"],
        ["material", "Material route", "Orange material route feeds active sanctuary roof/scaffold work.", "Active"],
        ["forklift", "Forklift route", "Purple route runs from south lot staging to loading area, avoiding main/daycare loop.", "Active"],
        ["glass", "Stained glass protection", "Temporary plywood protection during work; removed for Sunday/services.", "Active"],
      ],
    };
  }

  return {
    title: "Outside Confirmed Work Window",
    range: "Confirmed visual schedule: 07/06/2026 - 08/28/2026",
    summary: "This date falls outside the confirmed staging notes.",
    status: [
      ["scaffold", "Scaffolding", "No confirmed active scaffold state for this date.", "Unknown"],
      ["crane", "Crane", "No confirmed crane state for this date.", "Unknown"],
      ["dumpster", "Dumpster", "No confirmed dumpster state for this date.", "Unknown"],
      ["material", "Material route", "No confirmed material route state for this date.", "Unknown"],
      ["forklift", "Forklift route", "No confirmed forklift route state for this date.", "Unknown"],
      ["glass", "Stained glass protection", "No confirmed stained-glass protection state for this date.", "Unknown"],
    ],
  };
}

function renderPhase() {
  const phase = phaseForDate(dateInput.value);
  phaseTitle.textContent = phase.title;
  phaseRange.textContent = phase.range;

  statusList.replaceChildren(
    ...phase.status.map(([key, label, description, state]) => {
      const row = document.createElement("div");
      row.className = "status-row";

      const dot = document.createElement("span");
      dot.className = `status-dot ${statusColors[key]}`;

      const copy = document.createElement("div");
      const strong = document.createElement("strong");
      strong.textContent = label;
      const p = document.createElement("p");
      p.textContent = description;
      copy.append(strong, p);

      const pill = document.createElement("span");
      pill.className = `state-pill ${["Off", "Unknown"].includes(state) ? "off" : ""}`;
      pill.textContent = state;

      row.append(dot, copy, pill);
      return row;
    }),
  );
}

function setMode(nextMode) {
  mode = nextMode;
  const isMap = mode === "map";
  mapImage.classList.toggle("active", isMap);
  rotationImage.classList.toggle("active", !isMap);
  mapButton.classList.toggle("active", isMap);
  rotationButton.classList.toggle("active", !isMap);
  viewLabel.textContent = isMap ? "Annotated phase map proof" : "Every-other still sequence";
}

function updateFrame(nextIndex) {
  if (!frames.length) return;
  frameIndex = (nextIndex + frames.length) % frames.length;
  const frame = frames[frameIndex];
  rotationImage.src = frame.frame;
  frameSlider.value = String(frameIndex);
  frameLabel.textContent = `${String(frameIndex + 1).padStart(3, "0")} / ${frames.length} - ${frame.filename}`;
  preload(frameIndex + 1);
  preload(frameIndex - 1);
}

function preload(index) {
  if (!frames.length) return;
  const frame = frames[(index + frames.length) % frames.length];
  const img = new Image();
  img.src = frame.frame;
}

function togglePlay() {
  if (playTimer) {
    clearInterval(playTimer);
    playTimer = null;
    playButton.textContent = "Play";
    return;
  }

  playButton.textContent = "Pause";
  playTimer = window.setInterval(() => updateFrame(frameIndex + 1), 260);
}

async function init() {
  renderPhase();
  const response = await fetch("./frames-manifest.json");
  const manifest = await response.json();
  frames = manifest.frames;
  frameSlider.max = String(Math.max(0, frames.length - 1));

  updateFrame(0);
}

dateInput.addEventListener("input", renderPhase);
rotationButton.addEventListener("click", () => setMode("rotation"));
mapButton.addEventListener("click", () => setMode("map"));
frameSlider.addEventListener("input", (event) => updateFrame(Number(event.target.value)));
prevButton.addEventListener("click", () => updateFrame(frameIndex - 1));
nextButton.addEventListener("click", () => updateFrame(frameIndex + 1));
playButton.addEventListener("click", togglePlay);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") updateFrame(frameIndex - 1);
  if (event.key === "ArrowRight") updateFrame(frameIndex + 1);
  if (event.key === " ") {
    event.preventDefault();
    togglePlay();
  }
});

init().catch((error) => {
  frameLabel.textContent = "Could not load still manifest.";
  console.error(error);
});

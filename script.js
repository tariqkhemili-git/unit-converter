/*
Small, dependency-free unit converter script.
/*
  script.js — tidy, dependency-free unit converter

  - Reads the value from the input when converting
  - Validates input and shows a helpful message when invalid
  - Debounced live updates while typing (300ms)
  - Prevents form submission from reloading the page
*/

const unitOutputs1 = document.getElementById("unit-outputs1");
const unitOutputs2 = document.getElementById("unit-outputs2");
const unitOutputs3 = document.getElementById("unit-outputs3");
const convertBtn = document.getElementById("convert-btn");
const inputEl = document.getElementById("input");
const form = document.getElementById("converter-form");
const liveResultsEl = document.getElementById("live-results");

// Conversion constants (reasonable precision for UI conversions)
const RATES = Object.freeze({
  metreToFeet: 3.28084,
  litreToGallon: 0.264172,
  kiloToPound: 2.20462,
});

const toFixed3 = (n) => Number(n).toFixed(3);

function formatPair(value, aLabel, rate, bLabel) {
  const a = value;
  const b = toFixed3(value * rate);
  const reverse = toFixed3(value / rate);
  return `${a} ${aLabel} = ${b} ${bLabel} | ${a} ${bLabel} = ${reverse} ${aLabel}`;
}

function showMessage(msg) {
  if (unitOutputs1) unitOutputs1.textContent = msg;
  if (unitOutputs2) unitOutputs2.textContent = msg;
  if (unitOutputs3) unitOutputs3.textContent = msg;
}

function convertUnits() {
  if (!inputEl) return showMessage("Input element missing.");

  const raw = inputEl.value.trim();
  const value = parseFloat(raw);

  if (!raw || Number.isNaN(value)) {
    showMessage("Please enter a valid number to convert.");
    return;
  }

  if (unitOutputs1)
    unitOutputs1.innerHTML = `<div class="unit-value">${formatPair(
      value,
      "metres",
      RATES.metreToFeet,
      "feet"
    )}</div>`;
  if (unitOutputs2)
    unitOutputs2.innerHTML = `<div class="unit-value">${formatPair(
      value,
      "litres",
      RATES.litreToGallon,
      "gallons"
    )}</div>`;
  if (unitOutputs3)
    unitOutputs3.innerHTML = `<div class="unit-value">${formatPair(
      value,
      "kilograms",
      RATES.kiloToPound,
      "pounds"
    )}</div>`;

  // Announce a concise summary for screen readers
  if (liveResultsEl) {
    const summary = `${value} entered. ${toFixed3(
      value * RATES.metreToFeet
    )} feet; ${toFixed3(value * RATES.litreToGallon)} gallons; ${toFixed3(
      value * RATES.kiloToPound
    )} pounds.`;
    liveResultsEl.textContent = summary;
  }
}

// prevent form reload
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    convertUnits();
  });
}

// debounced live update
let debounceTimer = null;
if (inputEl) {
  inputEl.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(convertUnits, 300);
  });
}

if (convertBtn) convertBtn.addEventListener("click", convertUnits);

// Export for tests (no-op in browser)
try {
  if (typeof module !== "undefined") module.exports = { convertUnits };
} catch (e) {
  /* ignore in browser */
}
if (typeof module !== "undefined") module.exports = { convertUnits };

// "How you got it" in Add a shiny (features/dex-entry.js): hunted yourself, a Mystery Gift or a trade.
// A gift or trade has no encounters, hunt time or odds; its label is saved as the shiny's method.
import { esc } from "../core/util.js";

export const OBTAINED = [["hunted", "Hunted"], ["gift", "Mystery Gift"], ["trade", "Traded"]];
export const obtainedLabel = id => (OBTAINED.find(([k]) => k === id) || OBTAINED[0])[1];

export const obtainedHtml = cur => `<div class="wide en-how">
    <span class="en-how-label">How you got it</span>
    <div class="hs-seg">${OBTAINED.map(([id, label]) =>
      `<button type="button" class="hs-chip ${id === cur ? "on" : ""}" data-how="${id}" aria-pressed="${id === cur}">${esc(label)}</button>`).join("")}</div>
  </div>`;

// Marks the picked chip, hides the hunt-only fields (via .not-hunted in css/18-hunt-tools.css) and
// names the date "Received on" for a gift or trade.
export function showObtained(form, cur) {
  for (const b of form.querySelectorAll("[data-how]")) {
    b.classList.toggle("on", b.dataset.how === cur);
    b.setAttribute("aria-pressed", b.dataset.how === cur);
  }
  form.classList.toggle("not-hunted", cur !== "hunted");
  const ts = form.querySelector("[data-ts-label]");
  if (ts) ts.textContent = cur === "hunted" ? "Caught on" : "Received on";
}

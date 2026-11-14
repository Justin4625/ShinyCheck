// Slideshow in the Shiny Dex hero (slides from event-cards.js). Every slide sits in the same grid
// cell, so the block is always as tall as the tallest slide and nothing jumps when it changes.
// With more than one slide it moves on every SLIDE_MS (paused while hovered or focused, and not
// at all with reduced motion); dots switch by hand. The hero takes the shown slide's colours.
import { esc } from "../core/util.js";
import { eventSlides } from "./event-cards.js";

const SLIDE_MS = 7000;
let current = "", timer = 0, hold = false;
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

function show(box, hero, key) {
  const slides = [...box.querySelectorAll(".ev-slide")];
  const on = slides.find(s => s.dataset.key === key) || slides[0];
  if (!on) return;
  current = on.dataset.key;
  for (const s of slides) {
    s.classList.toggle("on", s === on);
    s.inert = s !== on;
  }
  for (const d of box.querySelectorAll(".ev-dots button")) d.setAttribute("aria-current", d.dataset.slide === current);
  for (const [k, v] of [["--accent", on.dataset.accent], ["--accent2", on.dataset.accent2]]) hero.style.setProperty(k, v);
  if (on.dataset.look) hero.dataset.look = on.dataset.look; else delete hero.dataset.look;
}

const next = (box, hero) => {
  const keys = [...box.querySelectorAll(".ev-slide")].map(s => s.dataset.key);
  show(box, hero, keys[(keys.indexOf(current) + 1) % keys.length]);
};

// Fills `box` with the slides and themes `hero`; returns false (and clears the theme) when
// there's nothing to show, so the caller can fall back to its recommendations.
export function renderEventSlides(box, hero) {
  const slides = eventSlides();
  hero.classList.toggle("ev-themed", slides.length > 0);
  clearInterval(timer);
  if (!slides.length) {
    delete hero.dataset.look;
    hero.style.removeProperty("--accent");
    hero.style.removeProperty("--accent2");
    return false;
  }
  box.innerHTML = `<div class="ev-slides">${slides.map(s => `<div class="ev-slide" data-key="${esc(s.key)}" data-accent="${s.accent}" data-accent2="${s.accent2}"${s.look ? ` data-look="${s.look}"` : ""}>
      ${s.label ? `<p class="mini-label ev-label"><span class="ev-live-dot"></span>${esc(s.label)}</p>` : ""}${s.html}
    </div>`).join("")}</div>${slides.length > 1 ? `<div class="ev-dots">${slides.map((s, i) =>
      `<button data-slide="${esc(s.key)}" aria-label="Show slide ${i + 1} of ${slides.length}"></button>`).join("")}</div>` : ""}`;
  show(box, hero, current);
  if (slides.length > 1 && !reduced()) timer = setInterval(() => { if (!hold && !document.hidden) next(box, hero); }, SLIDE_MS);
  return true;
}

// Wiring, once: dots and pausing while the pointer or focus is on the slides.
export function initEventSlides(box, hero) {
  box.addEventListener("click", e => {
    const d = e.target.closest(".ev-dots button");
    if (d) show(box, hero, d.dataset.slide);
  });
  for (const [on, off] of [["pointerenter", "pointerleave"], ["focusin", "focusout"]]) {
    box.addEventListener(on, () => { hold = true; });
    box.addEventListener(off, () => { hold = false; });
  }
}

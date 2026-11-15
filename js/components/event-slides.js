// Slideshow in the Shiny Dex hero (slides from event-cards.js). Every slide sits in the same grid
// cell, so the block is always as tall as the tallest slide and nothing jumps when it changes.
// With more than one slide it moves on every SLIDE_MS (paused while hovered or focused, and not
// at all with reduced motion); dots switch by hand. Each slide has a background layer in the hero
// (its game's colours, or its own `look`); the layers cross-fade.
import { esc } from "../core/util.js";
import { eventSlides } from "./event-cards.js";

const SLIDE_MS = 7000;
// Phones show one shiny event per slide, so the hero stays as compact as before.
const phone = matchMedia("(max-width: 560px)");
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
  for (const b of hero.querySelectorAll(".ev-bg")) b.classList.toggle("on", b.dataset.key === current);
  for (const [k, v] of [["--accent", on.dataset.accent], ["--accent2", on.dataset.accent2]]) hero.style.setProperty(k, v);
}

const next = (box, hero) => {
  const keys = [...box.querySelectorAll(".ev-slide")].map(s => s.dataset.key);
  show(box, hero, keys[(keys.indexOf(current) + 1) % keys.length]);
};

// Fills `box` with the slides and themes `hero`; returns false (and clears the theme) when
// there's nothing to show, so the caller can fall back to its recommendations.
export function renderEventSlides(box, hero) {
  const slides = eventSlides(phone.matches ? 1 : 2);
  hero.classList.toggle("ev-themed", slides.length > 0);
  // Remembered for the next start, so index.html can paint the hero dark before this runs.
  try { localStorage.setItem("shinycheck-v3-hero-slides", slides.length ? "1" : "0"); } catch {}
  clearInterval(timer);
  hero.querySelector(".ev-bgs")?.remove();
  if (!slides.length) {
    hero.style.removeProperty("--accent");
    hero.style.removeProperty("--accent2");
    return false;
  }
  // Re-rendering keeps the shown slide, already marked "on", so nothing fades in again.
  const cur = slides.some(s => s.key === current) ? current : slides[0].key, on = s => s.key === cur ? " on" : "";
  box.innerHTML = `<div class="ev-slides">${slides.map(s => `<div class="ev-slide${on(s)}" data-key="${esc(s.key)}" data-accent="${s.accent}" data-accent2="${s.accent2}"${s.look ? ` data-look="${s.look}"` : ""}>${s.html}
    </div>`).join("")}</div>${slides.length > 1 ? `<div class="ev-dots">${slides.map((s, i) =>
      `<button data-slide="${esc(s.key)}" aria-label="Show slide ${i + 1} of ${slides.length}"></button>`).join("")}</div>` : ""}`;
  // One background layer per slide; show() fades the shown slide's layer in.
  hero.insertAdjacentHTML("afterbegin", `<div class="ev-bgs" aria-hidden="true">${slides.map(s => `<div class="ev-bg${on(s)}" data-key="${esc(s.key)}" style="--accent:${s.accent};--accent2:${s.accent2}"${s.look ? ` data-look="${s.look}"` : ""}></div>`).join("")}</div>`);
  show(box, hero, cur);
  if (slides.length > 1 && !reduced()) timer = setInterval(() => { if (!hold && !document.hidden) next(box, hero); }, SLIDE_MS);
  return true;
}

// Wiring, once: dots, pausing while the pointer or focus is on the slides, and regrouping the
// slides when the screen crosses the phone width.
export function initEventSlides(box, hero) {
  phone.addEventListener("change", () => { if (hero.classList.contains("ev-themed")) renderEventSlides(box, hero); });
  box.addEventListener("click", e => {
    const d = e.target.closest(".ev-dots button");
    if (d) show(box, hero, d.dataset.slide);
  });
  for (const [on, off] of [["pointerenter", "pointerleave"], ["focusin", "focusout"]]) {
    box.addEventListener(on, () => { hold = true; });
    box.addEventListener(off, () => { hold = false; });
  }
}

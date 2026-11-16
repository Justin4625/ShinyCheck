// The Shiny Dex hero's slides: shiny events running now or coming soon (activeEvents in
// model/availability.js) with sprite, game, dates and serial code, grouped per game, and new games
// counting down to their release (model/releases.js). js/components/event-slides.js shows them.
import { has } from "../core/collection.js";
import { esc } from "../core/util.js";
import { activeEvents } from "../model/availability.js";
import { mons } from "../model/dex.js";
import { GAME_INFO } from "../model/games.js";
import { upcomingReleases } from "../model/releases.js";

const monFor = dex => mons.find(m => +m.dex === dex && !m.variant) || mons.find(m => +m.dex === dex);
const when = e => e.live
  ? e.until ? `Live · ${e.days ? `${e.days} day${e.days === 1 ? "" : "s"} left` : "last day"}` : "Live now"
  : e.days === 1 ? "Starts tomorrow" : `Starts in ${e.days} days`;
const dates = e => e.live ? (e.until ? `Until ${e.untilLabel}` : `Since ${e.fromLabel}`) : `${e.fromLabel}${e.until ? ` – ${e.untilLabel}` : ""}`;

const card = e => {
  const g = GAME_INFO[e.gid], m = monFor(e.dex);
  if (!m) return "";
  // The code always shows, also when you have the shiny already; without a code, a check mark.
  const got = has(m);
  return `<div class="ev-card ${e.live ? "live" : "soon"} ${got ? "got" : ""}" style="--accent:${g.accent};--accent2:${g.accent2}">
    <button class="ev-open" data-jump="${m.id}" aria-label="Open Shiny ${esc(m.name)}"></button>
    <span class="ev-art" aria-hidden="true"><img class="ev-sprite" src="${m.sprite}" alt=""><i>✦</i><i>✦</i><i>✦</i></span>
    <div class="ev-body">
      <span class="ev-when"><i aria-hidden="true"></i>${when(e)}</span>
      <b class="ev-name">Shiny ${esc(m.name)}</b>
      <span class="ev-game">${esc(g.name)}</span>
      <span class="ev-how">${esc(e.how)} · ${dates(e)}</span>
      ${e.code ? `<span class="ev-code" title="Code for Mystery Gift"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12v9H4v-9M2 7h20v5H2zM12 21V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>${esc(e.code)}</span>`
        : got ? `<span class="ev-got">✓ In your collection</span>` : ""}
    </div>
  </div>`;
};

// A new game with an announced release date: its logo (or name) and a countdown in days.
const releaseCard = r => {
  const out = r.days <= 0;
  return `<div class="ev-card ev-release ${out ? "live" : "soon"}" style="--accent:${r.accent};--accent2:${r.accent2}">
    <div class="rel-logos">${r.logos.length ? r.logos.map(l => `<img src="${l}" alt="">`).join("") : ""}<span class="${r.logos.length ? "sr-only" : "rel-word"}">${esc(r.name)}</span><i aria-hidden="true">✦</i><i aria-hidden="true">✦</i><i aria-hidden="true">✦</i><i aria-hidden="true">✦</i></div>
    <div class="rel-count">
      ${out ? `<b class="rel-out">Out now</b>` : `<span class="rel-pre">Out in</span><b>${r.days}</b><span class="rel-unit">day${r.days === 1 ? "" : "s"}</span>`}
    </div>
    <span class="ev-how">${esc(r.platform)} · ${r.dateLabel}</span>
  </div>`;
};

// One slide per game's shiny events (at most `perSlide` each: 2 on wide screens, 1 on phones)
// and one per new game, in that order; each carries the colours the hero takes on, plus a
// background of its own: `bg` for a game's events (heroLook in model/games.js, css/40-event-looks.css)
// or `look` for a new game (which also restyles the slide, css/38-release-looks.css).
export function eventSlides(perSlide = 2) {
  const slides = [], byGame = new Map();
  for (const e of activeEvents()) byGame.set(e.gid, [...(byGame.get(e.gid) || []), e]);
  for (const [gid, evs] of byGame) {
    const { accent, accent2, heroLook: bg } = GAME_INFO[gid];
    for (let i = 0; i < evs.length; i += perSlide)
      slides.push({ key: `${gid}:${evs[i].dex}`, accent, accent2, bg, html: evs.slice(i, i + perSlide).map(card).join("") });
  }
  for (const r of upcomingReleases())
    slides.push({ key: `release:${r.name}`, accent: r.accent, accent2: r.accent2, look: r.look, html: releaseCard(r) });
  return slides;
}

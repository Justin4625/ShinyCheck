// Ball, gender and nature of a shiny: three dropdowns built on the form picker (add and edit in Dex Entry,
// the Hunt Deck). Each carries its value in a hidden input named "ball", "gender" or "nature" ("" = not set).
// These details are private like the nickname: features/social-sync.js copies named fields only, so they
// never reach posts, the public collection or the share card.
import { esc, norm } from "../core/util.js";
import { ballOf, ballsFor } from "../model/balls.js";
import { genderOf, gendersFor } from "../model/gender.js";
import { NATURES, hasNatures, natureOf } from "../model/natures.js";
import { pickerFaces } from "./form-picker.js";

// Longest nickname the games allow (Dex Entry and the Hunt Deck).
export const NICK_MAX = 12;
const CHEV = `<svg class="fp-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
const none = label => `<span class="fp-none">–</span><span class="fp-label">${label}</span>`;

const faces = {
  ball: id => { const b = ballOf(id); return b ? `<img src="${b.icon}" alt=""><span class="fp-label">${esc(b.n)}</span>` : none("Not set"); },
  gender: id => { const x = genderOf(id); return x ? `<span class="dp-sym ${x.id}" aria-hidden="true">${x.sym}</span><span class="fp-label">${x.n}</span>` : none("Not set"); },
  nature: id => { const x = natureOf(id); return x ? `<span class="dp-nat" aria-hidden="true">${x.n.slice(0, 2)}</span><span class="fp-label">${x.n}<small>${x.effect}</small></span>` : none("Not set"); },
};
Object.assign(pickerFaces, faces);

// One dropdown: `list` holds {id, q} options; a value not in the list is kept (a shiny moved to another game).
function picker(kind, label, list, cur, filter) {
  const v = list.some(o => o.id === cur) ? cur : "";
  return `<div class="fp dp dp-${kind}" data-kind="${kind}">
      <input type="hidden" name="${kind}" value="${v}">
      <button type="button" class="fp-btn" aria-haspopup="listbox" aria-expanded="false" aria-label="${label}">${faces[kind](v)}${CHEV}</button>
      <div class="fp-pop" hidden>
        ${filter ? `<input type="search" class="fp-q" placeholder="Filter ${list.length} ${filter}…" aria-label="Filter ${filter}" autocomplete="off">` : ""}
        <div class="fp-list" role="listbox" aria-label="${label}">
          <button type="button" role="option" class="fp-opt" data-v="" aria-selected="${!v}">${faces[kind]("")}</button>
          ${list.map(o => `<button type="button" role="option" class="fp-opt" data-v="${o.id}" data-q="${esc(norm(o.q))}" aria-selected="${o.id === v}">${faces[kind](o.id).replace("<img ", '<img loading="lazy" ')}</button>`).join("")}
        </div>
        ${filter ? `<p class="fp-empty" hidden>No ${filter.slice(0, -1)} matches.</p>` : ""}
      </div>
    </div>`;
}

export function ballPicker(g, id) {
  const list = ballsFor(g).map(b => ({ id: b.id, q: b.n }));
  if (ballOf(id) && !list.some(o => o.id === id)) list.push({ id, q: ballOf(id).n });
  return list.length ? picker("ball", "Ball", list, id, "balls") : "";
}
export function genderPicker(m, g, id) {
  const list = gendersFor(m, g).map(x => ({ id: x.id, q: x.n }));
  return list.length ? picker("gender", "Gender", list, id) : "";
}
export function naturePicker(g, id) {
  if (!hasNatures(g) && !natureOf(id)) return "";
  return picker("nature", "Nature", NATURES.map(x => ({ id: x.id, q: `${x.n} ${x.effect}` })), id, "natures");
}

const LOCK = `<small class="dp-lock" title="Only you see this" aria-label="only you see this"></small>`;
// The three as labelled fields (Dex Entry); empty when the game has none of them.
export function detailFields(m, g, s = {}) {
  const parts = [["Ball", ballPicker(g, s.ball), "ball"], ["Gender", genderPicker(m, g, s.gender), "gender"], ["Nature", naturePicker(g, s.nature), "nature"]]
    .filter(([, html]) => html);
  return parts.length ? `<div class="wide dp-row">${parts.map(([l, html, k]) => `<div class="en-fp dp-field dp-${k}-field"><span>${l}${LOCK}</span>${html}</div>`).join("")}</div>` : "";
}
// Reads the fields inside `box` into a shiny: sets or removes `ball`, `gender` and `nature`.
// A field that isn't shown (the game has no balls, say) leaves the shiny's value as it was.
export function readDetails(entry, box) {
  for (const k of ["ball", "gender", "nature"]) {
    const input = box.querySelector(`input[type="hidden"][name="${k}"]`);
    if (!input) continue;
    if (input.value) entry[k] = input.value; else delete entry[k];
  }
  return entry;
}

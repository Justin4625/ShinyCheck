// Shiny details in the Hunt Deck, in their own card under Hunt method: ball, gender and nature (only the ones
// the game has) and the nickname. Picked during the hunt (the ball you're throwing, or what the shiny turned
// out to be) and logged with the shiny at Gotcha!. All private, like in Dex Entry.
import { NICK_MAX, ballPicker, genderPicker, naturePicker } from "../../components/detail-pickers.js";
import { hunts, saveHunts } from "../../core/store.js";
import { $, esc } from "../../core/util.js";
import { cur, curGame, curKey } from "./deck.js";

const KEYS = ["ball", "gender", "nature", "nick"];
// Picked before the hunt has started (a hunt only exists once it runs), like the form and the mark.
const picks = {};
export function huntDetails() {
  const h = hunts[curKey()] || {}, p = picks[curKey()] || {}, out = {};
  for (const k of KEYS) if (h[k] || p[k]) out[k] = h[k] || p[k];
  return out;
}

export function paintDetails() {
  const d = huntDetails(), box = $("#drDetails");
  const parts = !cur ? [] : [["Ball", ballPicker(curGame, d.ball)], ["Gender", genderPicker(cur, curGame, d.gender)], ["Nature", naturePicker(curGame, d.nature)]]
    .filter(([, html]) => html);
  $("#drDetailsCard").hidden = !cur;
  box.style.setProperty("--n", parts.length || 1);
  box.innerHTML = parts.map(([l, html]) => `<div class="dr-detail"><span>${l}</span>${html}</div>`).join("")
    + `<label class="dr-detail dr-nick"><span>Nickname</span><input type="text" name="nick" maxlength="${NICK_MAX}" value="${esc(d.nick || "")}" placeholder="None" autocomplete="off" spellcheck="false"></label>`;
}
// A new hunt keeps what was picked before it started.
export function carryDetails(h, k) {
  for (const [key, v] of Object.entries(picks[k] || {})) if (!h[key]) h[key] = v;
}
// After Gotcha! the next hunt starts without them.
export const clearDetails = k => { delete picks[k]; };

// Wiring: runs once at startup, from main.js.
export function init() {
  const pick = (key, v) => {
    const k = curKey(), p = picks[k] = picks[k] || {};
    if (v) p[key] = v; else delete p[key];
    if (hunts[k]) { if (v) hunts[k][key] = v; else delete hunts[k][key]; saveHunts(); }
  };
  $("#drDetails").addEventListener("change", e => { if (KEYS.includes(e.target.name)) pick(e.target.name, e.target.value.trim().slice(0, NICK_MAX)); });
  // The nickname is kept while typing, so closing the Hunt Deck halfway doesn't lose it.
  $("#drDetails").addEventListener("input", e => { if (e.target.name === "nick") pick("nick", e.target.value.trim()); });
}

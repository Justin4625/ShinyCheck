// Phase timeline for a shiny caught after phases: a bar split by encounters per phase, then a list
// (sprite, phase, encounters, time), the target last and the total. Shown in Dex Entry's edit panel.
// The phases come from `phaseLog` ([{ id, count, time }]), saved at Gotcha! (hunts before it have none).
import { fmtShort, nf } from "../core/format.js";
import { esc } from "../core/util.js";
import { mons } from "../model/dex.js";
import { altSprite, formText } from "../model/forms.js";

// The target's own part is what's left of the shiny's total after the phases.
export function phaseTimeline(s, target) {
  const log = s.phaseLog || [];
  if (!log.length) return "";
  const sum = k => log.reduce((n, p) => n + (p[k] || 0), 0);
  const rows = [
    ...log.map((p, i) => ({ m: mons.find(x => x.id === p.id), label: `Phase ${i + 1}`, count: p.count || 0, time: p.time || 0 })),
    { m: target, alt: s.alt, label: "✦ Target", count: s.count ? Math.max(0, s.count - sum("count")) : 0, time: s.time ? Math.max(0, s.time - sum("time")) : 0, target: true },
  ];
  const counted = rows.some(r => r.count);
  const name = r => r.m ? `${esc(r.m.name)}${formText(r.m, r.alt) ? ` <em>${esc(formText(r.m, r.alt))}</em>` : ""}` : "?";
  return `<div class="wide pt">
      <span class="pt-head">Phases</span>
      ${counted ? `<div class="pt-bar" aria-hidden="true">${rows.map(r => `<i class="${r.target ? "pt-goal" : ""}" style="flex-grow:${r.count}" title="${r.label}: ${nf(r.count)} enc."></i>`).join("")}</div>` : ""}
      <ol class="pt-list">${rows.map(r => `<li class="${r.target ? "pt-goal" : ""}">
          ${r.m && r.m.sprite ? `<img src="${altSprite(r.m, r.alt)}" alt="" loading="lazy">` : "<span class=\"pt-img\"></span>"}
          <span class="pt-name"><b>${r.label}</b>${name(r)}</span>
          <span class="pt-nums"><b>${r.count ? `${nf(r.count)} enc.` : "—"}</b><small>${r.time ? fmtShort(r.time) : ""}</small></span>
        </li>`).join("")}
        <li class="pt-total"><span class="pt-name"><b>Total</b></span>
          <span class="pt-nums"><b>${s.count ? `${nf(s.count)} enc.` : "—"}</b><small>${s.time ? fmtShort(s.time) : ""}</small></span></li>
      </ol>
    </div>`;
}

// Natures: a shiny's `nature` is the nature's name in lower case. Raised and lowered stat per nature
// from PokeAPI (/nature, checked Nov 2026); the five neutral ones change nothing.
// Natures came in Gen 3: Gold, Silver, Crystal and GO have none.
const LIST = [
  ["Hardy"], ["Lonely", "Atk", "Def"], ["Brave", "Atk", "Spe"], ["Adamant", "Atk", "SpA"], ["Naughty", "Atk", "SpD"],
  ["Bold", "Def", "Atk"], ["Docile"], ["Relaxed", "Def", "Spe"], ["Impish", "Def", "SpA"], ["Lax", "Def", "SpD"],
  ["Timid", "Spe", "Atk"], ["Hasty", "Spe", "Def"], ["Serious"], ["Jolly", "Spe", "SpA"], ["Naive", "Spe", "SpD"],
  ["Modest", "SpA", "Atk"], ["Mild", "SpA", "Def"], ["Quiet", "SpA", "Spe"], ["Bashful"], ["Rash", "SpA", "SpD"],
  ["Calm", "SpD", "Atk"], ["Gentle", "SpD", "Def"], ["Sassy", "SpD", "Spe"], ["Careful", "SpD", "SpA"], ["Quirky"],
].map(([n, up, down]) => ({ id: n.toLowerCase(), n, up, down, effect: up ? `+${up} −${down}` : "Neutral" }))
  .sort((a, b) => a.n.localeCompare(b.n));

const NONE = ["gs", "crystal", "pogo"];
export const NATURES = LIST;
export const hasNatures = g => !NONE.includes(g);
export const natureOf = id => (id && LIST.find(x => x.id === id)) || null;

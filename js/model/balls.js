// Poké Balls: a shiny's `ball` is the ball id, icon in balls/{id}.png (Serebii's item sprites).
// Which balls a game can show (checked Nov 2026): Bulbapedia's Poké Ball list (the generation each ball
// came in) for Gen 3–7, where every ball of that generation can reach the game by catching, breeding,
// trading or a gift; Serebii's item lists for Let's Go, Legends: Arceus, BD & SP, Sword & Shield,
// Scarlet & Violet and Legends: Z-A. Gold, Silver and Crystal don't store the ball, and GO isn't tracked,
// so those games have none. HOME keeps every ball.
// [id, name]; Legends: Arceus has Hisui's own balls (shown as "… (Hisui)" where both kinds are listed).
const ALL = [
  ["poke", "Poké Ball"], ["great", "Great Ball"], ["ultra", "Ultra Ball"], ["master", "Master Ball"],
  ["premier", "Premier Ball"], ["safari", "Safari Ball"],
  ["net", "Net Ball"], ["dive", "Dive Ball"], ["nest", "Nest Ball"], ["repeat", "Repeat Ball"],
  ["timer", "Timer Ball"], ["luxury", "Luxury Ball"],
  ["dusk", "Dusk Ball"], ["heal", "Heal Ball"], ["quick", "Quick Ball"], ["cherish", "Cherish Ball"], ["park", "Park Ball"],
  ["fast", "Fast Ball"], ["level", "Level Ball"], ["lure", "Lure Ball"], ["heavy", "Heavy Ball"],
  ["love", "Love Ball"], ["friend", "Friend Ball"], ["moon", "Moon Ball"], ["sport", "Sport Ball"],
  ["dream", "Dream Ball"], ["beast", "Beast Ball"], ["strange", "Strange Ball"],
  ["hisui-poke", "Poké Ball (Hisui)"], ["hisui-great", "Great Ball (Hisui)"], ["hisui-ultra", "Ultra Ball (Hisui)"],
  ["hisui-heavy", "Heavy Ball (Hisui)"], ["leaden", "Leaden Ball"], ["gigaton", "Gigaton Ball"],
  ["feather", "Feather Ball"], ["wing", "Wing Ball"], ["jet", "Jet Ball"], ["origin", "Origin Ball"],
].map(([id, n]) => ({ id, n, icon: `balls/${id}.png` }));

const ids = s => s.split(" ");
const GEN3 = ids("poke great ultra master premier safari net dive nest repeat timer luxury");
const GEN4 = [...GEN3, ...ids("dusk heal quick cherish park fast level lure heavy love friend moon sport")];
const GEN5 = [...GEN4, "dream"];
const GEN7 = [...GEN5, "beast"];
// Switch games: no Park Ball (Pal Park was Gen 4 only).
const SWITCH = GEN7.filter(id => id !== "park");
const HISUI = ids("hisui-poke hisui-great hisui-ultra hisui-heavy leaden gigaton feather wing jet origin");
const BY_GAME = {
  rs: GEN3, frlg: GEN3, emerald: GEN3,
  dp: GEN4, pt: GEN4, hgss: GEN4,
  bw: GEN5, bw2: GEN5, xy: GEN5, oras: GEN5,
  sm: GEN7, usum: GEN7,
  lgpe: ids("poke great ultra master premier"),
  swsh: SWITCH, bdsp: [...SWITCH, "strange"], sv: [...SWITCH, "strange"], lza: SWITCH,
  pla: [...HISUI, "strange"],
  home: ALL.map(b => b.id),
};

export const ballsFor = g => (BY_GAME[g] || []).map(id => ALL.find(b => b.id === id));
export const ballOf = id => (id && ALL.find(b => b.id === id)) || null;

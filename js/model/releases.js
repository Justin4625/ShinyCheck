// Upcoming games: once a release date is announced, the Shiny Dex hero counts down to it
// (js/components/event-cards.js) and keeps showing "Out now" for OUT_NOW_DAYS after release.
// Fill in `date` (YYYY-MM-DD) once it's official and add the English logos to logos/;
// until a logo is there, the name is shown as text. `look` names a hero design of its own in
// css/38-release-looks.css (used while no shiny event is on); without one it's the starry sky.
export const UPCOMING_GAMES = [
  // Announced Feb 27, 2026 for Nintendo Switch 2, "2027" (pokemon.com / Serebii, checked Nov 2026);
  // no date yet. Logos: English ones from eternia.fr; colours picked from them (Winds green, Waves blue).
  { name: "Pokémon Winds & Waves", platform: "Nintendo Switch 2", logos: ["logos/windsLogo.png", "logos/wavesLogo.png"], date: null, accent: "#34d399", accent2: "#3b82f6",
    look: "winds-waves" },
];
const OUT_NOW_DAYS = 14;
const day = d => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const today = () => new Date().toISOString().slice(0, 10);
const daysTo = d => Math.round((new Date(`${d}T12:00:00Z`) - new Date(`${today()}T12:00:00Z`)) / 864e5);
// Games with a date that are still to come, or came out less than OUT_NOW_DAYS ago; soonest first.
export const upcomingReleases = () => UPCOMING_GAMES.filter(g => g.date && daysTo(g.date) > -OUT_NOW_DAYS)
  .map(g => ({ ...g, days: daysTo(g.date), dateLabel: day(g.date) })).sort((a, b) => a.days - b.days);

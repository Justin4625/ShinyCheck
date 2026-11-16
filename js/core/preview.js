// Local release preview, only on localhost: http://localhost:5173/?release shows upcoming games that have
// no date yet (model/releases.js) as if they came out 120 days from now; ?release=YYYY-MM-DD picks the date.
// It also keeps the landing page away (services/cloud.js, index.html's head), so the Shiny Dex hero can be
// seen without signing in. Never active on shinycheck.nl.
const q = new URLSearchParams(location.search);
const on = location.hostname === "localhost" && q.has("release");
const pick = q.get("release");
const fallback = () => new Date(Date.now() + 120 * 864e5).toISOString().slice(0, 10);

export const releasePreview = on ? (/^\d{4}-\d{2}-\d{2}$/.test(pick || "") ? pick : fallback()) : null;

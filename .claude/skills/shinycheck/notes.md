# ShinyCheck notes

Shared project memory for the `/shinycheck` skill, so it works on every device (laptop and the Claude app on the phone).
How features work lives in the code, README and git log. This file keeps only what the code can't tell: the owner's choices, rules, gotchas and open ideas. Update it (and commit) when one of those changes.
**This repo is public:** never put secrets, keys, personal data, other users' names or account details in here.

## Who and how
- The owner (GitHub Justin4625) is a Pokémon shiny hunter. Always reply in **Dutch**; the app's UI text stays **English**.
- Writes short, informal Dutch with typos: read for intent, don't nitpick.
- Likes being surprised with polished design, but wants game data to be **correct**.
- Reads UI copy critically: text must not be misreadable (e.g. "log shinies from GO & HOME" sounded like it worked inside those apps). Say plainly that things happen in ShinyCheck. Game names are written in full in the UI.
- Uses the app on laptop and phone; cares a lot about mobile.

## Project
- Repo → github.com/Justin4625/ShinyCheck (renamed from ShinyCheck-v3 on 2026-10-29; the first version is now ShinyCheck-old; localStorage keys keep the `shinycheck-v3-` prefix on purpose: renaming them would lose local data), live on https://shinycheck.nl (GitHub Pages from main, root).
- Plain HTML/CSS/JS ES modules, no build, no deps. README has the structure and "Adding things".
- Every commit: pre-commit hook runs scripts/bump-version.sh (stamps ?v=, regenerates CSS links, import map and the sw.js offline list — new CSS/JS files need no manual wiring). The hook lives only in the laptop's .git/hooks: in a fresh clone / cloud session, when js/css/html/sprites/types/logos change, run `./scripts/bump-version.sh && git add index.html sw.js` before committing.
- Commit + push directly to main once the smoke test passes.
- Firebase: Auth (Google + email) and Firestore; firestore.rules validated. App Check skipped (needs billing). No Blaze plan: no Cloud Functions, no paid APIs.
- Rule changes: the owner publishes firestore.rules + indexes in the Firebase console themselves; push code that needs them only after they did (give them the full file).

## Rules
**Clean code:** new feature → its own small module in the right folder (components, pages, features, model, data), short header comment per file, match the module style, keep README's structure section up to date, never break existing behaviour.

**Test:** `node tests/smoke.mjs` before every commit (headless Chrome, fixed clock + seeded random; `--record/--compare file.json` for refactors, `--shots dir` for screenshots). It can flake on "pace and ETA"/"evolve and undo" under CPU load. Serve with `python3 -m http.server 5173`. If no Chrome can run (cloud session), say so plainly and don't claim it was tested.

**Mobile:** check every UI change at 360/390/414px and desktop, including dialogs, the login gate and the Hunt Deck. Automated overflow checks miss content clipped by overflow:hidden parents — measure key elements and look at screenshots. Keep: thumb dock (+1/−1, Gotcha) at the bottom of the Hunt Deck on phones, 40px+ tap targets, 16px inputs (no iOS zoom), safe-area insets, no sticky hover on touch, swipeable chip rows. iPhone: images via the share sheet only (one Share button, no separate Save). Real-device-only behaviour (iOS date input, vibration, wake lock, install) can't be verified headless — say so.

**Localhost data:** localhost talks to production Firebase. A real account was once wiped to 0 shinies by being signed in on localhost (empty storage) and the live site at once (fixed: no writes until the first snapshot). When opening localhost, warn not to sign in with a real account, or set localStorage "shinycheck-emulator"="1" and run the emulator. Any change to services/cloud.js sync needs an emulator test with two devices/stale storage before pushing. Delete temporary Firebase test accounts after tests.

**Security:** never ask for or store secret keys (only public keys in code); use the owner's email only for identification; never show users' emails in the app.

**Data accuracy:** game data must be verified, never recalled from memory (the owner has caught wrong dex numbers, Mega Dimension list, BDSP Celebi, Z-A starters).
- Regional dexes: PokeAPI pokedex endpoints. Locations / Outside the dex / Hyperspace: Serebii (pokedex-sm, -swsh, -sv, -xy, -dp, -bw pages). Shiny odds: RotomLabs / PokéTools. Locks: Bulbapedia's shiny-lock table (via web.archive.org, Bulbapedia blocks bots). Logos: eternia.fr, else English logos from Poképédia ("Logo_…_(anglais).png"), Logopedia (headless Chrome, Cloudflare) or Commons; Gen 1/2 cut from EN title screens.
- Dex tabs show exactly the official regional dex; everything else goes to "Outside the dex", which doesn't count unless toggled. Kalos is ONE tab 1–454. Hisui is its own Shiny Dex region (#899–905 only).
- Shiny lock per game only if **every** way to get it in that game is locked. Wild, outbreak, raid, Hyperspace or breedable ⇒ not locked. Locked Pokémon show a lock and don't count toward totals.
- Hunt methods respect game rules (Shiny Charm exceptions per game are in HUNT_SETUP; checked on Bulbapedia 2026-10-03). Gen 4/5 hunts use `rate: 8192`. Sprites are always shiny renders.
- Forms list only what looks different as a SHINY.
- When unsure, say so and name what was assumed.

**What's new + push:** every big feature gets a What's new entry (data/updates.js) and a push notification after it's live: `gh workflow run notify.yml -f title=… -f body=… -f url=/…` (English, short; url = the feature's page; `-f dry_run=true` only counts). Show the proposed title/body in the reply; check with `gh run list --workflow notify.yml`. Small fixes don't get one. Without `gh` (cloud session), give the owner the command to run.

## Owner's decisions (don't undo without asking)
- RBY is a dex-only page (no shinies existed there). HGSS, BW, B2W2, DP and Pt are separate games.
- Sidebar: no Export/Import (backups only via account); Install pill above the bottom bar; bell next to the logo; trainer search only in the feed bar.
- Community: no push for follows; profiles public by default with a private toggle; Share only on your own catches; nickname is private (never in posts/collection/share card), mark is public.
- Profile Collection: game chips only for games in that collection (no long dropdown). Letter avatars not rainbow.
- Buy me a lunch: only in the ⚙ menu and at the bottom of What's new (not in the foot bar or nav). Not a main feature: no What's new/push.
- Admin photo upload uses a crop dialog. Radar chain Reset only in the Hunt Deck, not the pop-out.

## Open ideas
- More shiny details: ball, gender, nature (mark + nickname done).
- Goals, badges, two hunts at once, Play Store (TWA), Stadium?
- Moved-in species a game can't catch (Mew in SV) don't show on that game's page yet.
- Not yet announced in What's new/push: Hunt Deck mark picker, Hisui region, Change Pokémon, Move to game routes.

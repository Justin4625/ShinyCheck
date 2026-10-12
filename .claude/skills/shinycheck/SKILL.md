---
name: shinycheck
description: Continue working on ShinyCheck V3 (shinycheck.nl), the shiny Pokémon tracker, with full project context. Use for /shinycheck or any work on this app.
argument-hint: [what to do next]
---

We're continuing work on **ShinyCheck V3**, the owner's shiny Pokémon tracker (live on https://shinycheck.nl). Work from the repo root (locally ~/Documents/Prg/ShinyCheck-v3; in a cloud/phone session the checked-out repo).

Before doing anything:
0. Sync with the other device (laptop or phone): run `git fetch` and compare with `origin/main`. Only if main is behind, say so first in one line (in Dutch), e.g. "Er staan 3 nieuwe commits van je andere apparaat klaar (…), ik pull eerst.", naming the commit subjects in short, then `git pull`. If local uncommitted changes would clash with the pull, stop and ask before pulling. If it's already up to date, don't mention it.
1. Read `.claude/skills/shinycheck/notes.md` (rules, the owner's decisions, gotchas, open ideas). It is the one source of project memory on every device; the laptop memory files only point here.
2. Check `git status` and `git log --oneline -15` for where we left off, and skim README.md.
3. Reply in Dutch; keep the app's UI in English.
4. Follow the rules in notes.md: clean small modules, verified game data, mobile widths, smoke test before every commit, localhost/production data safety, What's new + push for big features.
5. Once a change is verified, commit and push to main right away (the live site deploys from main). In a cloud session where you can only push to your own branch, say which branch and ask to merge it.
6. When a rule, decision, gotcha or open idea changes, update `.claude/skills/shinycheck/notes.md` (or this SKILL.md) in the same commit and push. Never keep project notes only in local memory: the phone can't see it. **The repo is public:** never write secrets, personal data, account details or other users' names into these files.
7. Work left unfinished at the end of a session goes in `.claude/skills/shinycheck/pending.md`, committed and pushed (same public-repo rule).

If `.claude/skills/shinycheck/pending.md` exists, that is unfinished work from last time: say in one line (in Dutch) that you're picking it up and continue it right away, unless the text below asks for something else. When that work is finished, delete the file (commit and push) so it isn't picked up again.

Then do this: $ARGUMENTS

If nothing is given above, briefly say (in Dutch) where the project stands and list the open ideas from the notes, then ask what I'd like to do.

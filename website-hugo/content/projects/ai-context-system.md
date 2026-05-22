---
title: "AI Context System"
members: ["adam-gautsch"]
project_type: "speaker"
presentation_date: "2026-05-18"
draft: false
---

<!--
  Adam Gautsch
  Profile:     https://mondaiycoffee.com/members/adam-gautsch/
  LinkedIn:    https://www.linkedin.com/in/adamgautsch/
-->

## What are you building?

An Obsidian-first memory system for AI tools. A structured folder, a startup ritual, and a handful of command phrases that give Claude, Codex, or any agent persistent context — so every session can pick up where the last one left off, without re-explaining the project from scratch.

## The core idea

AI tools are stateless by default. Every session starts at zero. The fix isn't a new app or a vector database — it's a well-organized folder and a consistent startup sequence.

The system lives in `AI/` inside my Obsidian vault. When I start a session, Claude reads six files in order:

1. `START.md` — orientation
2. `Adam.md` — who I am, how I work
3. `Context/Preferences.md` — style and working defaults
4. `Context/TechStack.md` — tools I actually use
5. `Context/CurrentState.md` — what I'm actively working on
6. The relevant `Projects/[Project].md` — full project state

After that, the agent knows enough to be useful without a five-minute briefing.

## What's working / not working

**Working:**
- Phase 1 is live — git-tracked `AI/` folder with full folder structure, operating rules, and three seeded domain Brains (House, Car, HomeLab)
- `_System/AI-Behavior.md` is the bootstrap file — Claude reads it on every session start
- `INDEX.md` is the machine-maintained manifest of all projects and Brains
- Session closeout is a command: say "Capture this session" → 8-step workflow writes updates back to Obsidian

**Not working yet:**
- Bridge files for active code projects (`AGENTS.md` / `CLAUDE.md` pointers) aren't in place — agents launched inside a project folder don't yet auto-discover the AI brain
- Placeholder content in `Brains/House/STATE.md` and `Brains/Car/STATE.md`
- No remote git backup yet

## Open questions

- What's the right threshold for "this project needs a bridge file"? Every code repo? Only active ones?
- Should people, contacts, or relationships get their own Brain section eventually?
- How much maintenance is too much — where does "useful system" become "second job"?

## Spicy takes

- Most "AI memory" products are the wrong abstraction. You don't need a proprietary tool or a hosted embedding store. You need a folder, a checklist, and discipline.
- The startup ritual matters more than the folder structure. Six files read in order beats a thousand disorganized notes.
- Plain markdown is the right format — readable by humans, readable by any AI tool, version-controllable, and zero vendor lock-in.
- Context is a habit, not a feature. The system only works if you close sessions properly. "Capture this session" has to become as automatic as saving a file.

## If we only discuss one thing

**What would your startup ritual look like?**

The six-file sequence is the kernel of the whole system. Everything else — folder structure, Brains, commands — is scaffolding around that ritual. If you wanted to steal one thing and adapt it to your own setup, that's the one.

---

*Built on: Obsidian + plain markdown + git. No special tools required.*

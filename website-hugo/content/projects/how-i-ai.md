---
title: "How I AI"
members: ["adam-gautsch"]
project_type: "speaker"
presentation_date: "2026-09-21"
presentation_time: ""
draft: false
---

Adam Gautsch — Builder & Community Organizer at ATDC at Georgia Tech — will present **How I AI** at Mond(ai)y Coffee on Monday, September 21. The first half walks one real project through his setup; the second half is an open floor, so bring your own.

## What are you building?

A three-layer working setup that I did not design — it accreted, one layer at a time, each one added because the layer below it failed in a specific way.

**CLI** (Claude Code / Codex in the actual repo) does the work. **Obsidian** — a markdown vault of about 940 files — is the memory: project state, decisions, what I know about people and companies, and a rules file every agent reads before it touches anything. **Basecamp** is the coordination layer for the handful of projects that need one: a queue, a plan, and one list called `Needs Adam`.

Five projects run all three layers today. I'll walk one of them end to end.

## The core idea

**Every layer exists because the one below it lost something.**

The CLI is brilliant and has no memory — close the terminal and it has never met you. So the vault holds what's true, and the agent reads it first, every session.

But the vault is *mine*. It's my working memory in a folder, which means nothing in it has a due date, nothing is assigned, and nothing moves unless I'm the one moving it. I was the bottleneck, and I'd built a very tidy system for being the bottleneck.

So Basecamp holds the queue — and the mechanic that actually changed things is small and slightly embarrassing in how well it works: **every question the agent asks me carries a stated default.** *"Default if you don't answer: ship it at 800px."* Silence is now a valid answer. I can disappear for a week and the project keeps going; the only thing I forfeit is the choice.

## How it actually works — one project, start to finish

The worked example is **gautsch.org and its Acemoglu research build**, because it is the one where all three layers are visible and it took about four weeks.

**1. CLI makes something.** August 20: an agent built a reader's edition of a two-hour podcast transcript — reference cards, the full transcript, a working build — on a branch. Good. Not right. It was a summary of a conversation I'd actually had opinions about.

**2. Obsidian makes it mine.** I read the transcript in Obsidian and marked it up by hand: 26 highlights, 21 questions in the margins. Then the agent's job changed from *summarize this* to *answer these 21 questions, in my order*. That produced 18 pages I'd never have written alone, and the difference between pass one and pass two is entirely that the second one was responsive to what I was actually confused about.

**3. Basecamp makes it move.** August 28: the plan became a Basecamp project. Three lists, plus one document — `Constraints, Decisions, Done Means` — that is the whole spine. I answered thirteen blocking questions in a single thread that afternoon, and after that the work ran without me for days at a time. Later there were 14 cleanup tasks on a list; I assigned them, the agent worked them top-down, commented each one with what it did and the commit SHA, and I read the diffs.

**4. It comes back to markdown.** A script mirrors every Basecamp message, to-do, and comment back into the vault as plain files, so the project's history survives the cloud. That mirror runs at the end of every work session. The round isn't real until it's markdown on disk.

`/research` went live on September 15. It shipped because there was a queue, not because I found a weekend.

## What's working / not working

- **Working:** Stated defaults. Genuinely the highest-leverage thing in the stack and it costs one sentence per question. Also: making the agent write `Done Means` before it writes any plan — if it can't state the stopping criteria, the direction isn't ready, and that catches bad framing before it costs a week.

- **Working:** Mirroring the cloud back to disk. Basecamp is where the work is coordinated; markdown is where it's remembered. I'd rather lose the coordination layer than the history.

- **Not working — and this is the one I want help with.** On August 23 the vault recorded a correction: a claim on five pages was wrong. **The pages kept shipping the wrong version until September 10.** Eighteen days. The memory system worked perfectly — it wrote the correction down, correctly, on the right day. Nothing propagated it. A different agent re-derived the same finding weeks later and I only noticed then. One upstream fact changed and I have no mechanism to push it through the eighteen things descended from it.

- **Not working:** Three surfaces is three surfaces. The vault and Basecamp can disagree. Work gets stranded on whichever machine did it. Twice this month I planned against a repo that was three commits behind and didn't know it. Most of my rules file is scar tissue from exactly that class of mistake.

## Open questions

- **When one fact changes, how do you push the correction through everything derived from it?** I have no answer and I'm not convinced anyone does. This is the real question in the talk.

- **Where's the honest line on how much process is too much?** I have a rules file, a memory system, a mirror script, and three command files. That is either leverage or a very sophisticated way to avoid writing. I lean leverage. I'm not certain, and I'd like to be argued with.

- **Does any of this work if you're not running five projects at once?** The whole loop is built for *I am not available and the work should continue anyway*. If you have one project and you're on it every day, I genuinely don't know whether the overhead pays for itself. Tell me if you've tried it.

## Spicy takes

The bottleneck was never the AI. It was me, and every hour I spent improving my prompts was an hour not spent on the actual constraint, which was that nothing could proceed without my attention. `Needs Adam` did more for my throughput than any model upgrade.

**A question you can't write a default for is a question you haven't thought hard enough about.** This turned out to be true far more often than I expected, and it's a decent test for prioritization generally, not just for agents.

## If we only discuss one thing, it should be:

**How do you keep AI-generated work from silently going stale?**

Not "how do you check the output" — I mean afterward. You verify something, you publish it, and then the underlying fact changes, or you find out you were wrong. Now there are twelve artifacts downstream of it and a correction sitting in a file that reaches none of them. Spreadsheets have this solved. Documents do not, and agents produce documents at a rate that makes it worse.

I'm bringing this undecided on purpose. I'd rather argue it out than present a fix I don't have.

## Then: pass the aux — bring your stack

The back half is yours. **Come ready to show what you actually use**, not what you'd recommend. Two minutes each, laptop optional. The useful version of this is specific:

- What's the *first* thing you do when you start a task with AI?
- Where does the output live afterward — and does anything read it back?
- What broke badly enough that you changed your process?

Terminal people, ChatGPT-tab people, people with one giant Google Doc, people who tried something elaborate and went back to copy-paste — all of it is interesting. **The ones who abandoned a system are the most interesting**, because everyone posts their setup and nobody posts the retreat.

No slides required. Nobody here is grading.

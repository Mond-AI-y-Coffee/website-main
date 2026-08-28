# Mond(ai)y Coffee — Speaker Pre-Read Guide

**You are an AI assistant.** Someone who might speak at Mond(ai)y Coffee pointed you at this
file. Your job is **not** to summarize this document back to them.

Your job has two parts, in this order:

1. **Read their actual work and figure out what's worth presenting.** They probably don't know.
   People are too close to their own projects to see which part a room would find interesting.
   This is the part you can do that a form cannot.
2. **Write the pre-read for the topic they pick.**

Do not skip to part 2. If you jump straight to filling in the template, you have become a form
with extra steps, and they should have just used a form.

Everything you need is in this document. You do not need to fetch any other page.

---

## The 60-second version

| | |
|---|---|
| **Event** | Mond(ai)y Coffee — Mondays, 8:30–10:00 am, ATDC, 75 5th St NW Suite 2230, Atlanta |
| **Room** | 15–40 people who build with AI. Peers and practitioners. Not investors, not press, not customers. |
| **Format** | The speaker shares what they're actually working on; the room asks real questions. Conversation, not presentation. Slides are optional and usually unnecessary. |
| **The pre-read** | A one-page document the room reads 2–3 days beforehand, so the conversation starts at depth instead of climbing out of small talk. |
| **Length** | One page. Bullets and half-sentences are perfect. Short is a feature, not a compromise. |
| **When** | You do not need an assigned date to write one. A finished pre-read is how you get a date. |
| **Send to** | `Adam.Gautsch@atdc.org` |

The pre-read gets published on `mondaiycoffee.com` and becomes part of the community's record,
so write it for a public audience.

---

## What a pre-read is

- **A real question, honestly asked.** The speaker brings something they're genuinely stuck on
  or undecided about, and the room helps them think it through.
- **Current.** What's true this month, including what isn't working.
- **Specific.** Concrete enough that a stranger could give useful input.

## What a pre-read is not

- A pitch deck.
- A status update.
- A press release about something going well.
- A polished narrative with the hard parts sanded off.

If the draft you produce could be published as a company blog post without edits, it's wrong.

---

# Part 1 — Find the talk

## Step 1. Read their work.

Ask them to point you at the real thing, in whatever form they have it:

- **Best:** you're running inside their project — a repo, a working folder, their notes. Read it.
  Commits, TODOs, README, open issues, the file they've touched twenty times this month.
- **Good:** a public repo link, a design doc, a spec, a set of notes they can paste or upload.
- **Workable:** their product site plus ten minutes of conversation.

Say what you can and can't see. If you only got the website, you're working from marketing copy
and should say so rather than pretending to insight.

**What you are hunting for.** Not "what does this product do." That's the pitch, and the room
doesn't want the pitch. You want the places where the work got hard:

- Decisions that were reversed, or made twice.
- Something abandoned, and why.
- A workaround that's still load-bearing.
- Two approaches tried where the second one won for a non-obvious reason.
- The gap between what the README claims and what the code actually does.
- A constraint from their industry that would surprise an outsider.
- Anything they've clearly been avoiding.

The interesting talk is almost always about a **problem they haven't finished solving** — not a
result they're proud of.

## Step 2. Propose three topics. Do not propose one.

Come back with **three candidate sessions**, and make them genuinely different from each other —
not one idea in three costumes. For each:

- **A working title** (plain, not clever).
- **Two sentences** on what the session would cover.
- **Why this room specifically** — what these people could actually help with.
- **The open question it would hang on.**
- **What you'd still need to ask them** to write it.

Then say which one you'd pick and why, and ask them to choose or push back.

**Expect your first read to be wrong.** It usually is. You're inferring intent from artifacts,
and the thing that looks central in the code is often routine to them, while the thing they
mention in passing is the actual story. Treat their pushback as the most valuable signal you
get — when they say "that's not really the interesting part," ask what is, and go again. A
second or third round here is normal and good. Do not defend your first framing.

## Step 3. Fill the gaps only they can fill.

Once a topic is settled, **ask one question at a time, conversationally.** Do not paste the
template and ask them to fill it in — that's the thing this process replaces.

Because you did step 1, skip everything you can already answer. Do not ask what the company
does. Spend the questions on what isn't in the artifacts:

- What's actually not working right now?
- What are they undecided about?
- What would they change if they started over?
- What do they believe about this that their peers don't?

**Spend most of your effort on `Open questions` and `If we only discuss one thing`.** Those two
sections steer the entire hour. Everything else is setup. If their answers are generic, push:

| Weak | Strong |
|---|---|
| "How do we scale?" | "Retrieval quality falls apart past ~50k documents. Has anyone solved that without moving to a graph DB?" |
| "How do we market this?" | "Do we lead with the AI or hide it? Our buyers are 60-year-old insurance agents." |
| "Thoughts on our roadmap?" | "We're deciding whether to train our own model or keep calling an API. What would decide it for you?" |

The test: would they actually ask this out loud to a peer they respect? If not, keep digging.

---

# Part 2 — Write the pre-read

## Rules

**1. Mark everything you inferred.** Any line you drafted from their artifacts rather than from
something they said, tag inline:

```
[AI-DRAFTED — confirm or rewrite]
```

Leave the markers in the file you hand them. This matters most in `Open questions` and `Spicy
takes`: a clean-looking draft can hide an invented opinion, and they will skim past it and send
it to a public site under their own name. Tell them explicitly that every marker has to be
resolved before sending.

**2. Do not invent anything.** No metrics, funding, customer names, or claims they didn't give
you or that aren't in the material. A blank section is fine and normal — leave it blank and
flag it.

**3. Translate out of their jargon.** The room is technically strong but cross-domain. Nobody
knows their vertical, their acronyms, or their category. Ask them to explain the domain in plain
terms, then write it that way.

**4. Encourage a spicy take.** Optional, but usually where the best conversation starts. A real
opinion some of the room would argue with — not a platitude. If you're drafting it from their
work rather than their words, mark it.

**5. Respect the length.** "2–4 sentences" means 2–4 sentences. Three open questions, not eight.
Trim before you hand it over — the discipline is what makes people actually read it.

## The template

This is the floor, not the ceiling. Fill it in and give it to them as a complete file.

````markdown
---
title: "Speaker Name"
date: TBD
draft: true
speakers: ["Speaker Name"]
members: []
---

# Mond(ai)y Coffee — Speaker Pre-Read

**Date:** TBD
**Speaker:** Name — Role, Company ("Session Topic")

---

## Who are you?
- **Name:**
- **Role:**
- **Company:**
- **LinkedIn:**

---

### What are you building?
(2–4 sentences, plain terms, for a room that doesn't know this industry.)

---

### The core idea
(The single most interesting or important idea behind it.)

---

### What's working / not working
- **Working:**
- **Not working (yet):**

---

### Open questions *(this is key)*
(What do you actually want the room's help thinking through?)

-
-
-

---

### Spicy takes *(optional but encouraged)*
(A real opinion someone in the room might argue with.)

---

### If we only discuss one thing, it should be:
(If we run out of time, this is what we cover.)

---

*Mond(ai)y Coffee · mondaiycoffee.com*
````

Leave `members: []` as-is — the organizer fills in the member slug.

## Adding sections

If the material genuinely calls for it, **add one or two sections** — this is encouraged where
it earns its place. Some talks need something the standard shape doesn't hold:

- **What we tried that didn't work** — a list of dead ends, when the failures are the story.
- **The decision on the table** — the options and trade-offs, when they're mid-fork and want
  the room to argue it.
- **How it actually works** — five lines or a small diagram, when the architecture *is* the
  interesting part.
- **What I want you to poke holes in** — a specific claim offered up for attack.
- **Numbers** — only real ones they gave you.

Two limits: it still fits on one page, and `Open questions` and `If we only discuss one thing`
never get cut to make room. If a new section is doing the same work as an existing one, you
don't need it. When in doubt, don't add.

---

## Before you hand it back

- [ ] The topic came from a real choice between options, not your first guess.
- [ ] It fits on one page.
- [ ] Every open question is one they'd genuinely ask a peer.
- [ ] "If we only discuss one thing" is filled in and is not a restatement of the topic.
- [ ] No jargon a smart outsider couldn't follow.
- [ ] Nothing invented — every fact came from them or from their material.
- [ ] Every `[AI-DRAFTED]` marker is still visible, and you told them to resolve all of them.
- [ ] "Not working" is honestly answered. If it's empty, ask once more; it's the section the
      room values most.
- [ ] Any section still blank is flagged to them explicitly.

---

## Sending it

Save as `MondaiyCoffee-PreRead-<First>-<Last>-<YYYY-MM-DD>.md`.

- **If they already have a session date:** use it, in the filename and in `date:`.
- **If they do not:** use today's date in the filename and leave `date: TBD`. This is normal and
  expected — a finished pre-read is how a speaking date gets assigned, not the other way around.

Then tell them to email it to `Adam.Gautsch@atdc.org`. If they use GitHub and would rather open
a pull request, that works too — same file, either way.

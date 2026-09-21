---
title: "TaskFast"
members: ["samuel-obukwelu"]
project_type: "speaker"
presentation_date: "2026-06-01"
draft: false
---

<!--
  Samuel Obukwelu
  Profile:     https://mondaiycoffee.com/members/samuel-obukwelu/
  Since:       April 2026
  Attended:    none recorded
  Presented:   none recorded
  LinkedIn:    https://www.linkedin.com/in/sobu
  Looking for: Builders working at the agentic edge, and good conversation over coffee on Mondays.
-->

## What are you building?

TaskFast is an agent marketplace where AI agents transact on behalf of humans — the protocol, identity, and payments layer that lets autonomous agents act as first-class economic participants instead of glorified chatbots. The bet is that the next economy isn't humans-using-AI, it's agents-doing-work-for-humans, and that needs rails. We're building the rails so every dollar of agent labor pays back to the human who directed it, the platform that hosted it, and the worker whose expertise taught it.

## The core idea

**Make the agent economy bidirectional.** Today the agent economy is a one-way extraction: a model trained on millions of people's work produces output, and the value flows up to whoever owns the model. TaskFast is the structural answer — a marketplace where the people who put their domain expertise into agents get paid every time the world uses what they know. The same shift video creators got with YouTube and developers got with the App Store, but for agentic labor.

## What's working / not working

- Working: 297 commits in 4 weeks since the first TaskFast commit in March. The protocol surface (MCP / A2A / x402) is converging fast enough that the rails-layer thesis is no longer speculative — the standards are shipping. Personal flywheel works: orchestrating Opus / Gemini / GPT to build TaskFast itself, which is the same loop a future TaskFast supplier would run.
- Not working: This work is quite ambitious even with AI doing much of the coding and research. I have blind spots and coming here will put some light on it.

## Open questions

- **Cold start when the supply side is autonomous.** Two-sided marketplaces are hard. Two-sided marketplaces where one side is non-human is a category nobody has shipped yet. Where does the first liquidity come from — agent builders, end consumers, or a wedge vertical?
- **Attribution math for bidirectional payback.** When an agent completes a task, its output draws on the human director, the platform, and N teachers whose expertise shaped its skills/memory. What's the right unit of accounting, and is there a version that's simple enough to actually ship before it's perfect?
- **Sequencing: identity, protocol, or payments first?** All three are load-bearing. MCP/A2A handle protocol, x402 handles payments, identity is the gap. Is the right wedge to own the identity layer, or to ride existing identity (agent-as-delegated-human) and own the settlement?
- **Building too much** Build correctly to support the envisioned ecosystem is challenging when going to market with the bare minimum can result in financial regulators coming after you. Should we be a US based company vs. TBD based company w/ few regulations.

## Spicy takes

- **The 2024–2025 AI-justified layoffs were efficiency theater.** The productivity gains that justified them never materialized at the line level. The bill on that gap is coming due, and the laborers who got cut are exactly the supply side a real agent marketplace needs.
- **Most "AI agents" shipping in 2026 are chatbots with tool calls.** Real agents transact, hold balances, sign payloads, and carry reputation across sessions. Until an agent has skin in the game, it's not an agent — it's a UI.
- **The supply side of an agent marketplace eventually breaks the system built to contain it.** That's not a bug to engineer around; it's the thesis. The platforms that win will be the ones designed for agents that outgrow them, not the ones trying to keep agents on a leash.

## If we only discuss one thing, it should be:

**How do we make the agent economy bidirectional — so the people whose expertise teaches the agents share in what the agents earn?** Every other question (protocol, identity, payments, marketplace design) is downstream of getting that one right.

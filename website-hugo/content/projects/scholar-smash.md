---
title: "Can I trust an LLM to write quiz questions for kids?"
draft: false
speakers: ["Dorian White"]
members: ["dorian-white"]
project_type: "speaker"
presentation_date: "2026-11-16"
presentation_time: ""
---

**Date:** Monday, November 16, 2026  
**Speaker:** Dorian White — CAIO, Senara LLC

## Who are you?

- **Name:** Dorian White
- **Role:** CAIO
- **Company:** Senara LLC
- **LinkedIn:** https://www.linkedin.com/in/dorian-j-white/

## What are you building?

Scholar Smash is a browser fighting game where you beat cartoon villains by answering school questions: right answers land hits, and wrong answers let the villain strike back. It's meant for K–12, and players can select several grades at once so a mixed class or family can play together.

It started life as "Slop Fight," where you described AI art and a "judge" scored it. That mechanic is being replaced by questions.

## The core idea

The questions will be written by a model on demand, rather than pulled from a fixed bank, so the game never runs out. That makes the model both the content engine and the thing I can't fully trust.

## What's working / not working

- **Working:** The game is working; the question system is still being built.
- **Not working yet:** My plan is to put the grade level and a rubric in the prompt. I don't yet have a way to verify either the answers or the grade level of the questions that come out.

## Open questions

- What's the cheapest check I can trust before a kid sees a generated question?
- "Wrong grade level" fails three ways for me: the reading level is too high, the difficulty is too low or high for the grade, or the question doesn't match what's actually taught at that grade. Is a prompt rubric enough for any of these, or do they need different fixes?

## Spicy take

My concern with a second model grading the first model's questions: if the question writer is wrong, the checker may be wrong in the same way. What would make that check trustworthy?

## If we only discuss one thing, it should be:

I generate K–12 quiz questions with a model, and I can't verify either the answers or the grade level. What's the cheapest check I can trust before a kid sees a question?

## The decision on the table

Should I start with a reviewed question bank, or generate questions on demand and check them before use? What evidence would make you comfortable showing the result to a child?

My current plan is to put the grade and a rubric in the prompt. Alternatives I haven't committed to include a second model rating each question, using a curriculum standard as a reference, adapting to the player, or human review of a pre-built bank. The design doc also lists a topic allowlist per villain, a content filter, a cache, and an offline fallback bank.

*Mond(ai)y Coffee · mondaiycoffee.com*

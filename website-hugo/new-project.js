#!/usr/bin/env node
// Usage:
//   node new-project.js <member-slug>                          (slug + title from company)
//   node new-project.js <member-slug> <topic-slug>             (explicit slug override)
//   node new-project.js <slug1> <slug2>                        (co-presenters, slug from first member's company)
//   node new-project.js <slug1> <slug2> <topic-slug>           (co-presenters with explicit slug)
//   node new-project.js <member-slug> [slugs] --previous <old-slug>

const fs   = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, 'content', 'projects');
const MEMBERS_DIR  = path.join(__dirname, 'content', 'members');

function isMemberSlug(s) {
  return fs.existsSync(path.join(MEMBERS_DIR, `${s}.md`));
}

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// Parse --previous flag
const rawArgs = process.argv.slice(2);
let previousSlug = '';
const args = [];
for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i] === '--previous') {
    previousSlug = rawArgs[++i] || '';
  } else {
    args.push(rawArgs[i]);
  }
}

if (args.length < 1) {
  console.error('Usage: node new-project.js <member-slug> [member-slug-2 ...] [topic-slug] [--previous <old-slug>]');
  process.exit(1);
}

// Split args into member slugs and optional topic slug override
// An arg is a member slug if its file exists; otherwise it's the topic slug
const memberSlugs = args.filter(isMemberSlug);
const overrides   = args.filter(a => !isMemberSlug(a));

if (!memberSlugs.length) {
  console.error('No valid member slugs found. Check that member files exist in content/members/.');
  process.exit(1);
}
if (overrides.length > 1) {
  console.error(`Unexpected arguments: ${overrides.join(', ')}`);
  process.exit(1);
}

function parseYaml(text) {
  const result = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (!m) continue;
    const [, key, val] = m;
    if (val === '[]') {
      result[key] = [];
    } else if (val.startsWith('[') && val.endsWith(']')) {
      result[key] = val.slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^"|"$/g, ''))
        .filter(Boolean);
    } else {
      result[key] = val.replace(/^"|"$/g, '');
    }
  }
  return result;
}

function extractSection(body, heading) {
  const m = body.match(new RegExp(`##\\s+${heading}\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n##\\s|$)`, 'i'));
  return m ? m[1].trim() : '';
}

function formatDate(raw) {
  try {
    return new Date(raw).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return raw;
  }
}

function readMember(slug) {
  const file = path.join(__dirname, 'content', 'members', `${slug}.md`);
  if (!fs.existsSync(file)) {
    console.error(`Member file not found: ${file}`);
    process.exit(1);
  }
  const raw   = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    console.error(`Could not parse front matter in: ${file}`);
    process.exit(1);
  }
  const fm   = parseYaml(match[1]);
  const body = match[2].trim();
  return {
    slug,
    fm,
    workingOn:   extractSection(body, 'What are you working on\\?'),
    aiInterests: extractSection(body, 'AI interests'),
    lookingFor:  extractSection(body, 'What are you looking for\\?'),
    attended:    Array.isArray(fm.meetings_attended) ? fm.meetings_attended : [],
    presented:   Array.isArray(fm.presented_at)      ? fm.presented_at      : [],
  };
}

function contextComment(m) {
  const attended  = m.attended.length  ? m.attended.join(', ')  : 'none recorded';
  const presented = m.presented.length ? m.presented.join(', ') : 'none recorded';
  const since     = m.fm.date ? formatDate(m.fm.date) : '(not set)';
  return `<!--
  ${m.fm.title}
  Profile:     https://mondaiycoffee.com/members/${m.slug}/
  Since:       ${since}
  Attended:    ${attended}
  Presented:   ${presented}
  LinkedIn:    ${m.fm.linkedin || '(not set)'}
  Looking for: ${m.lookingFor || '(not set)'}
-->`;
}

function blockquote(text) {
  if (!text) return '';
  return `> _From member profile:_\n> ${text.split('\n').join('\n> ')}\n\n`;
}

function prereadSection(m) {
  return `## What are you building?

${blockquote(m.workingOn)}## The core idea

## What's working / not working
- Working:
- Not working:

## Open questions

-
-
-

## Spicy takes

${m.aiInterests ? blockquote(m.aiInterests) : ''}## If we only discuss one thing, it should be:`;
}

const members     = memberSlugs.map(readMember);
const membersYaml = `[${members.map(m => `"${m.slug}"`).join(', ')}]`;
const previousLine = previousSlug ? `\nprevious: "${previousSlug}"` : '';

// Derive title and slug from first member's company, or fall back to their name
const derivedTitle = members[0].fm.company || members[0].fm.title || '';
const topicSlug    = overrides[0] || toSlug(derivedTitle);
const projectTitle = overrides[0] ? '' : derivedTitle;

const frontMatter = `---
title: "${projectTitle}"
members: ${membersYaml}
type: "speaker"
presentation_date: ""${previousLine}
draft: true
---`;

const contextComments = members.map(contextComment).join('\n\n');

const body = members.length === 1
  ? prereadSection(members[0])
  : members.map(m => `## ${m.fm.title}\n\n${prereadSection(m)}`).join('\n\n---\n\n');

const output = `${frontMatter}\n\n${contextComments}\n\n${body}\n`;

if (!fs.existsSync(PROJECTS_DIR)) fs.mkdirSync(PROJECTS_DIR, { recursive: true });

const outFile = path.join(PROJECTS_DIR, `${topicSlug}.md`);
if (fs.existsSync(outFile)) {
  console.error(`Project file already exists: ${outFile}`);
  process.exit(1);
}

fs.writeFileSync(outFile, output, 'utf8');
console.log(`Created: content/projects/${topicSlug}.md`);

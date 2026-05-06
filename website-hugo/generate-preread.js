#!/usr/bin/env node
// Usage: node generate-preread.js <member-slug> [member-slug-2 ...]
// Examples:
//   node generate-preread.js hunter-harris
//   node generate-preread.js hunter-harris adam-gautsch

const fs   = require('fs');
const path = require('path');

const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error('Usage: node generate-preread.js <member-slug> [member-slug-2 ...]');
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, 'output');

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
  return `<!--
  CONTEXT: ${m.fm.title} — remove before sending to speaker
  Profile:   https://mondaiycoffee.com/members/${m.slug}/
  Since:     ${formatDate(m.fm.date)}
  Attended:  ${attended}
  Presented: ${presented}
  LinkedIn:  ${m.fm.linkedin || '(not set)'}
  Looking for: ${m.lookingFor || '(not set)'}
-->`;
}

function blockquote(text) {
  if (!text) return '';
  return `> _From member profile:_\n> ${text.split('\n').join('\n> ')}\n`;
}

function prereadSection(m) {
  return `### What are you building?
(2–4 sentences max)

${blockquote(m.workingOn)}
### The core idea
What's the most interesting or important idea behind this?

### What's working / not working
- Working:
- Not working:

### Open questions (this is key)
What do you want help thinking through?

-
-
-

### Spicy takes (optional but encouraged)
Opinions, contrarian views, or things you believe that might spark discussion.

${m.aiInterests ? blockquote(m.aiInterests) : ''}
### If we only discuss one thing, it should be:
(single most valuable discussion topic)`;
}

const members = slugs.map(readMember);
let output;

if (members.length === 1) {
  const m = members[0];
  output = `${contextComment(m)}

# ${m.fm.title} — Talk Pre-Read

## Who are you?
- **Name:** ${m.fm.title}
- **Role:** ${m.fm.role || ''}
- **Company:** ${m.fm.company || ''}${m.fm.linkedin ? `\n- **LinkedIn:** ${m.fm.linkedin}` : ''}

---

${prereadSection(m)}

---

## Meeting Notes

`;
} else {
  const comments = members.map(contextComment).join('\n\n');
  const sections = members
    .map(m => `## ${m.fm.title} · [time]\n\n${prereadSection(m)}`)
    .join('\n\n---\n\n');

  output = `${comments}

# Pre-Read — ${members.map(m => m.fm.title).join(' & ')}

${sections}

---

## Meeting Notes

`;
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

const label   = slugs.length === 1 ? slugs[0] : new Date().toISOString().slice(0, 10);
const outFile = path.join(OUTPUT_DIR, `preread-${label}.md`);
fs.writeFileSync(outFile, output, 'utf8');
console.log(`Written: ${outFile}`);

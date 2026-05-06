#!/usr/bin/env node
// Usage: node assign-date.js <topic-slug> <YYYY-MM-DD>

const fs   = require('fs');
const path = require('path');

const [topicSlug, date] = process.argv.slice(2);

if (!topicSlug || !date) {
  console.error('Usage: node assign-date.js <topic-slug> <YYYY-MM-DD>');
  process.exit(1);
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('Date must be YYYY-MM-DD');
  process.exit(1);
}

// Update project file
const projectPath = path.join(__dirname, 'content', 'projects', `${topicSlug}.md`);
if (!fs.existsSync(projectPath)) {
  console.error(`Project file not found: content/projects/${topicSlug}.md`);
  process.exit(1);
}

let projectContent = fs.readFileSync(projectPath, 'utf8');
if (!/^presentation_date:/m.test(projectContent)) {
  console.error(`No presentation_date field found in: content/projects/${topicSlug}.md`);
  process.exit(1);
}
projectContent = projectContent.replace(/^presentation_date:.*$/m, `presentation_date: "${date}"`);
fs.writeFileSync(projectPath, projectContent, 'utf8');
console.log(`Updated: content/projects/${topicSlug}.md  →  presentation_date: "${date}"`);

// Create or update meeting file
const NOTES_DIR = path.join(__dirname, 'content', 'notes');
const notePath  = path.join(NOTES_DIR, `${date}.md`);

if (fs.existsSync(notePath)) {
  let noteContent = fs.readFileSync(notePath, 'utf8');
  noteContent = noteContent.replace(/^draft:.*$/m, 'draft: false');
  fs.writeFileSync(notePath, noteContent, 'utf8');
  console.log(`Updated: content/notes/${date}.md  →  draft: false`);
} else {
  const noteContent = `---
date: "${date}"
draft: false
---

## Meeting Notes
`;
  fs.writeFileSync(notePath, noteContent, 'utf8');
  console.log(`Created: content/notes/${date}.md`);
}

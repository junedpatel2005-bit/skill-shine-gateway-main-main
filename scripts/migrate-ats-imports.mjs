#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = path.resolve(new URL(import.meta.url).pathname.split(/\\/).slice(1).join("\\"), "..");
// On Windows, import.meta.url path handling above yields an absolute path; ensure root is repo root
// But to be robust, use cwd
const repoRoot = process.cwd();

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const dir = path.dirname(filePath);
  let changed = false;
  const newContent = content.replace(/(?:from|import)\s+(['"])(@\/[^'";]+)\1/g, (m, q, spec) => {
    const withoutAt = spec.slice(2); // remove @/
    const target = path.join(repoRoot, 'src', withoutAt);
    let rel = path.relative(dir, target);
    rel = toPosix(rel);
    if (!rel.startsWith('.')) rel = './' + rel;
    changed = true;
    return m.replace(spec, rel);
  }).replace(/require\(\s*(['"])(@\/[^'"\)]+)\1\s*\)/g, (m, q, spec) => {
    const withoutAt = spec.slice(2);
    const target = path.join(repoRoot, 'src', withoutAt);
    let rel = path.relative(dir, target);
    rel = toPosix(rel);
    if (!rel.startsWith('.')) rel = './' + rel;
    changed = true;
    return `require('${rel}')`;
  }).replace(/import\(\s*(['"])(@\/[^'"\)]+)\1\s*\)/g, (m, q, spec) => {
    const withoutAt = spec.slice(2);
    const target = path.join(repoRoot, 'src', withoutAt);
    let rel = path.relative(dir, target);
    rel = toPosix(rel);
    if (!rel.startsWith('.')) rel = './' + rel;
    changed = true;
    return `import('${rel}')`;
  });
  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated', path.relative(repoRoot, filePath));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      walk(full);
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      processFile(full);
    }
  }
}

console.log('Running @/ import migration across src/');
walk(path.join(repoRoot, 'src'));
console.log('Done');

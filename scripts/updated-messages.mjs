#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { file: 'src/locale/messages.json', ref: 'HEAD', out: null };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--file' && args[i + 1]) opts.file = args[++i];
    else if (a === '--ref' && args[i + 1]) opts.ref = args[++i];
    else if (a === '--out' && args[i + 1]) opts.out = args[++i];
    else if (a === '-h' || a === '--help') opts.help = true;
  }
  return opts;
}

function usage() {
  console.log(
    'Usage: node scripts/updated-messages.mjs [--file path] [--ref git-ref] [--out path]\n' +
      '\nOutputs a minimal messages-like JSON with only updated keys (added or changed) compared to the given Git ref.\n' +
      'If --out is omitted, prints to stdout.'
  );
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function readJsonFromGit(ref, p) {
  const gitPath = p.replace(/\\/g, '/');
  const content = execSync(`git show ${ref}:${gitPath}`, { encoding: 'utf8' });
  return JSON.parse(content);
}

function main() {
  const opts = parseArgs();
  if (opts.help) return usage();

  const abs = path.resolve(opts.file);
  if (!fs.existsSync(abs)) {
    console.error(`File not found: ${opts.file}`);
    process.exit(1);
  }

  let curr, prev;
  try {
    curr = readJson(abs);
  } catch (e) {
    console.error(`Failed to parse current JSON at ${opts.file}: ${e.message}`);
    process.exit(1);
  }
  try {
    prev = readJsonFromGit(opts.ref, opts.file);
  } catch (e) {
    // If file did not exist at ref, treat all keys as updated
    prev = { translations: {} };
  }

  const prevT = prev.translations || {};
  const currT = curr.translations || {};

  const minimal = { locale: curr.locale || 'en', translations: {} };
  // Keep source order from current messages.json
  for (const k of Object.keys(currT)) {
    const prevVal = Object.prototype.hasOwnProperty.call(prevT, k) ? prevT[k] : undefined;
    const currVal = currT[k];
    const isAdded = !Object.prototype.hasOwnProperty.call(prevT, k);
    const isChanged = !isAdded && (prevVal ?? '') !== (currVal ?? '');
    if (isAdded || isChanged) {
      minimal.translations[k] = currVal;
    }
  }

  const output = JSON.stringify(minimal, null, 2) + '\n';
  if (opts.out) {
    const outPath = path.resolve(opts.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output, 'utf8');
    console.log(`Wrote updated messages to: ${outPath} (${Object.keys(minimal.translations).length} keys)`);
  } else {
    process.stdout.write(output);
  }
}

main();


#!/usr/bin/env node
// Writes registry.json from adapters/*. With --check it only verifies that the
// committed registry.json lists the current adapters and digests (registry CI);
// the mirrors are read-only, so CI never commits a regenerated file.
// `digest` hashes the file bytes (installers verify downloads with it);
// `grant_digest` is the semantic digest grants bind as adapter_digest.

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { loadShapes } from './shapes-module.mjs'

const ROOT = new URL('..', import.meta.url).pathname
const ADAPTERS_DIR = join(ROOT, 'adapters')
const OUTPUT = join(ROOT, 'registry.json')

function sha256(content) {
  return `SHA-256:${createHash('sha256').update(content).digest('hex')}`
}

const shapes = await loadShapes()

function buildRegistry() {
  const dirs = readdirSync(ADAPTERS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort()

  const adapters = []
  const errors = []

  for (const dir of dirs) {
    const adapterPath = join(ADAPTERS_DIR, dir, 'adapter.toml')
    const metaPath = join(ADAPTERS_DIR, dir, 'meta.json')

    if (!existsSync(adapterPath)) {
      errors.push(`${dir}: missing adapter.toml`)
      continue
    }
    if (!existsSync(metaPath)) {
      errors.push(`${dir}: missing meta.json`)
      continue
    }

    const tomlContent = readFileSync(adapterPath, 'utf-8')
    const meta = JSON.parse(readFileSync(metaPath, 'utf-8'))

    if (meta.id !== dir) {
      errors.push(`${dir}: meta.json id "${meta.id}" does not match directory name`)
      continue
    }

    adapters.push({
      id: meta.id,
      name: meta.name,
      description: meta.description,
      category: meta.category,
      tags: meta.tags,
      author: meta.author,
      executable: meta.executable,
      min_shapes_version: meta.min_shapes_version,
      digest: sha256(tomlContent),
      grant_digest: shapes.loadAdapter(dir, adapterPath).digest,
      download_url: `https://raw.githubusercontent.com/openape-ai/shapes-registry/main/adapters/${dir}/adapter.toml`,
    })
  }

  if (errors.length > 0) {
    console.error('Errors:')
    for (const err of errors) console.error(`  - ${err}`)
    process.exit(1)
  }

  if (process.argv.includes('--check')) {
    const committed = existsSync(OUTPUT) ? JSON.parse(readFileSync(OUTPUT, 'utf-8')).adapters : null
    if (JSON.stringify(committed) !== JSON.stringify(adapters)) {
      console.error('registry.json is stale: run `node scripts/build-registry.mjs` and commit it')
      process.exit(1)
    }
    console.log(`registry.json is current: ${adapters.length} adapters`)
    return
  }

  const registry = {
    version: 1,
    generated_at: new Date().toISOString(),
    adapters,
  }

  writeFileSync(OUTPUT, JSON.stringify(registry, null, 2) + '\n')
  console.log(`registry.json generated: ${adapters.length} adapters`)
  for (const a of adapters) {
    console.log(`  ${a.id} (${a.digest.slice(0, 20)}...)`)
  }
}

buildRegistry()

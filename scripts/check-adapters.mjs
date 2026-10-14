#!/usr/bin/env node
// Registry CI: every adapter must parse with the strict @openape/shapes parser,
// match the JSON schemas, keep its golden argv fixtures, reject hostile options
// on non-exact operations and, where the CLI is installed in a tested version,
// declare only options its help output lists.
//
// Usage:
//   npm ci && npm run check                 # all adapters
//   node scripts/check-adapters.mjs git     # selected adapters
//   node scripts/check-adapters.mjs --record git   # rewrite golden expectations from the adapter (review the diff)
//   SHAPES_MODULE=/path/to/monorepo/packages/shapes/dist/index.js npm run check
//     verifies against an unpublished @openape/shapes build.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import Ajv from 'ajv/dist/2020.js'
import { parse as parseToml } from 'smol-toml'

const ROOT = new URL('..', import.meta.url).pathname
const ADAPTERS = join(ROOT, 'adapters')
const shapes = await import(process.env.SHAPES_MODULE ? pathToFileURL(process.env.SHAPES_MODULE).href : '@openape/shapes')

// Options that make CLIs run other programs, read configuration or write files.
const HOSTILE_OPTIONS = [
  ['--upload-pack=x'], ['--upload-pack', 'x'], ['--receive-pack=x'], ['--exec=x'], ['--exec', 'x'],
  ['-c', 'core.sshCommand=x'], ['--config', 'core.sshCommand=x'], ['--config=x'], ['-u', 'x'], ['-x', 'x'],
  ['--output=/tmp/x'], ['-o', '/tmp/x'], ['--eval', 'x'], ['-e', 'x'],
]

const ajv = new Ajv({ allErrors: true, strict: true })
ajv.addFormat('uri', value => URL.canParse(value))
const schema = name => ajv.compile(JSON.parse(readFileSync(join(ROOT, 'schemas', name), 'utf8')))
const validate = {
  adapter: schema('adapter.schema.json'),
  meta: schema('meta.schema.json'),
  golden: schema('golden.schema.json'),
  checks: schema('checks.schema.json'),
}

const failures = []
const notes = []
const fail = (id, message) => failures.push(`${id}: ${message}`)
const note = (id, message) => notes.push(`${id}: ${message}`)

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function schemaErrors(check) {
  return check.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
}

async function outcome(loaded, argv) {
  try {
    const resolved = await shapes.resolveCommand(loaded, [loaded.adapter.cli.executable, ...argv])
    return { operation_id: resolved.detail.operation_id, permission: resolved.permission, display: resolved.detail.display, exact_command: resolved.detail.constraints?.exact_command === true }
  }
  catch (error) {
    return /No adapter operation matched/.test(error.message) ? null : { error: error.message }
  }
}

function declaresOptions(operation) {
  return operation.value_options !== undefined || operation.flag_options !== undefined
}

function optionNames(tokens) {
  return tokens.filter(token => token.startsWith('-')).map(token => token.replace(/^-+/, '').split('=')[0])
}

async function checkGolden(id, loaded, cases, record, unreachable) {
  const covered = new Set()
  const recorded = []
  for (const entry of cases) {
    const actual = await outcome(loaded, entry.argv)
    if (actual && 'operation_id' in actual) covered.add(actual.operation_id)
    // A permission must never contain a template: an unbound {binding} would match every value.
    if (actual?.permission && /[{}]/.test(actual.permission)) fail(id, `golden ${JSON.stringify(entry.argv)} derives ${actual.permission}, which contains an unresolved template`)
    recorded.push({ ...entry, expected: actual })
    if (!record && JSON.stringify(actual) !== JSON.stringify(entry.expected))
      fail(id, `golden ${JSON.stringify(entry.argv)} expected ${JSON.stringify(entry.expected)}, got ${JSON.stringify(actual)}`)
  }
  for (const operation of loaded.adapter.operations) {
    if (unreachable.has(operation.id) && covered.has(operation.id)) fail(id, `${operation.id} is listed in unreachable_operations but golden fixtures match it`)
    if (!unreachable.has(operation.id) && !covered.has(operation.id)) fail(id, `golden fixtures never match operation ${operation.id}`)
  }
  return recorded
}

/** The hostile option after the argv, after the command prefix, before it (after global options such as git -C) and first. */
function insertions(argv, operation, option) {
  const prefix = operation.command.length
  const start = Math.max(0, argv.findIndex((_, index) => argv.slice(index, index + prefix).join('\0') === operation.command.join('\0')))
  return [
    [...argv, ...option],
    [...argv.slice(0, start + prefix), ...option, ...argv.slice(start + prefix)],
    [...argv.slice(0, start), ...option, ...argv.slice(start)],
    [...option, ...argv],
  ]
}

async function checkHostileOptions(id, loaded, cases, legacy) {
  const operations = new Map(loaded.adapter.operations.map(operation => [operation.id, operation]))
  const undeclared = new Set()
  let attempts = 0
  for (const entry of cases) {
    const operation = entry.expected && operations.get(entry.expected.operation_id)
    if (!operation || entry.expected.exact_command) continue
    if (legacy.has(operation.id)) continue
    if (!declaresOptions(operation)) {
      undeclared.add(operation.id)
      continue
    }
    for (const option of HOSTILE_OPTIONS) {
      for (const argv of insertions(entry.argv, operation, option)) {
        attempts += 1
        const actual = await outcome(loaded, argv)
        if (!actual || 'error' in actual || actual.exact_command) continue
        const matched = operations.get(actual.operation_id)
        const declared = new Set([...(matched.value_options ?? []), ...(matched.flag_options ?? []), ...(matched.required_options ?? [])])
        if (optionNames(option).every(name => declared.has(name))) continue
        fail(id, `hostile ${JSON.stringify(argv)} matched non-exact operation ${actual.operation_id}`)
      }
    }
  }
  for (const name of undeclared) fail(id, `operation ${name} accepts undeclared options; declare value_options/flag_options, bind it to the exact command or list it in checks.json legacy_operations`)
  if (legacy.size) note(id, `operations accepting undeclared options (legacy_operations): ${[...legacy].join(', ')}`)
  return attempts
}

function run(executable, args, cwd) {
  const result = spawnSync(executable, args, { cwd, encoding: 'utf8', timeout: 10000, env: { ...process.env, LANG: 'C', LC_ALL: 'C', PAGER: 'cat', GIT_PAGER: 'cat' } })
  if (result.error) return { missing: result.error.code === 'ENOENT', output: '' }
  return { missing: false, output: `${result.stdout}\n${result.stderr}` }
}

function listed(help, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  if (name.length === 1) return new RegExp(`(^|[\\s,[(|])-${escaped}\\b`, 'm').test(help)
  const negated = name.startsWith('no-') ? name.slice(3).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : null
  return new RegExp(`--(\\[no-\\])?${escaped}\\b`).test(help) || (negated !== null && new RegExp(`--\\[no-\\]${negated}\\b`).test(help))
}

function checkRealCli(id, adapter, checks) {
  const { cli } = adapter
  // Some CLIs print command help only inside a repository (git diff, git worktree); the registry checkout is one.
  const cwd = ROOT
  if (!cli.tested_versions) {
    if (checks.help) fail(id, 'checks.json help needs [cli] tested_versions')
    note(id, 'no tested_versions declared; real-CLI check skipped')
    return
  }
  const probe = run(cli.executable, cli.version_command, cwd)
  if (probe.missing) {
    note(id, `${cli.executable} is not installed on this runner; real-CLI check skipped`)
    return
  }
  const version = new RegExp(cli.version_pattern, 'm').exec(probe.output)?.[1] ?? null
  if (!version) {
    fail(id, `version_pattern does not match the output of ${cli.executable} ${cli.version_command.join(' ')}`)
    return
  }
  if (!cli.tested_versions.includes(version)) {
    note(id, `runner has ${cli.executable} ${version}, adapter is tested with ${cli.tested_versions.join(', ')}; option check skipped`)
    return
  }
  if (!checks.help) {
    fail(id, 'tested_versions needs checks.json help to compare declared options with the CLI')
    return
  }
  const globalHelp = run(cli.executable, checks.help, cwd).output
  for (const option of (adapter.operations[0]?.global_options ?? []).map(entry => entry.split('=')[0])) {
    if (!listed(globalHelp, option)) fail(id, `global option -${option.length === 1 ? '' : '-'}${option} is not listed by ${cli.executable} ${checks.help.join(' ')}`)
  }
  for (const operation of adapter.operations) {
    const words = operation.command.filter(token => !token.startsWith('-'))
    const declared = [...optionNames(operation.command), ...(operation.required_options ?? []), ...(operation.value_options ?? []), ...(operation.flag_options ?? [])]
    if (!declared.length) continue
    const help = run(cli.executable, [...words, ...checks.help], cwd).output
    const unlisted = new Set(checks.unlisted_options?.[operation.id] ?? [])
    for (const name of declared) {
      const present = listed(help, name)
      if (!present && !unlisted.has(name)) fail(id, `${operation.id} declares ${name}, which ${cli.executable} ${version} ${words.join(' ')} ${checks.help.join(' ')} does not list`)
      if (present && unlisted.has(name)) fail(id, `${operation.id} lists ${name} in unlisted_options although the help shows it`)
    }
  }
  note(id, `real-CLI check passed with ${cli.executable} ${version}`)
}

async function checkAdapter(id, record) {
  const dir = join(ADAPTERS, id)
  for (const file of ['adapter.toml', 'meta.json', 'README.md', 'golden.json']) {
    if (!existsSync(join(dir, file))) fail(id, `missing ${file}`)
  }
  if (!existsSync(join(dir, 'adapter.toml')) || !existsSync(join(dir, 'meta.json'))) return

  const raw = parseToml(readFileSync(join(dir, 'adapter.toml'), 'utf8'))
  if (!validate.adapter(raw)) fail(id, `adapter.toml violates schemas/adapter.schema.json: ${schemaErrors(validate.adapter)}`)
  const meta = readJson(join(dir, 'meta.json'))
  if (!validate.meta(meta)) fail(id, `meta.json violates schemas/meta.schema.json: ${schemaErrors(validate.meta)}`)
  const checks = existsSync(join(dir, 'checks.json')) ? readJson(join(dir, 'checks.json')) : {}
  if (!validate.checks(checks)) fail(id, `checks.json violates schemas/checks.schema.json: ${schemaErrors(validate.checks)}`)

  let loaded
  try { loaded = shapes.loadAdapter(id, join(dir, 'adapter.toml')) }
  catch (error) {
    fail(id, `adapter.toml is rejected by @openape/shapes: ${error.message}`)
    return
  }
  const { cli, operations } = loaded.adapter
  if (cli.id !== id || meta.id !== id) fail(id, `directory, meta.json id and [cli] id must be equal (${meta.id}, ${cli.id})`)
  if (meta.executable !== cli.executable) fail(id, `meta.json executable ${meta.executable} differs from [cli] executable ${cli.executable}`)
  const ids = operations.map(operation => operation.id)
  if (new Set(ids).size !== ids.length) fail(id, 'operation ids must be unique')
  const legacy = new Set(checks.legacy_operations ?? [])
  for (const name of legacy) {
    const operation = operations.find(entry => entry.id === name)
    if (!operation) fail(id, `legacy_operations lists unknown operation ${name}`)
    else if (declaresOptions(operation) || operation.exact_command) fail(id, `legacy_operations lists ${name}, which already rejects undeclared options`)
  }

  if (!existsSync(join(dir, 'golden.json'))) return
  const cases = readJson(join(dir, 'golden.json'))
  if (!validate.golden(cases)) {
    fail(id, `golden.json violates schemas/golden.schema.json: ${schemaErrors(validate.golden)}`)
    return
  }
  const unreachable = new Set(checks.unreachable_operations ?? [])
  for (const name of unreachable) {
    if (!operations.some(entry => entry.id === name)) fail(id, `unreachable_operations lists unknown operation ${name}`)
  }
  const recorded = await checkGolden(id, loaded, cases, record, unreachable)
  if (record) writeFileSync(join(dir, 'golden.json'), `${JSON.stringify(recorded, null, 2)}\n`)
  const attempts = await checkHostileOptions(id, loaded, recorded, legacy)
  checkRealCli(id, loaded.adapter, checks)
  console.log(`${id}: ${operations.length} operations, ${cases.length} golden cases, ${attempts} hostile-option attempts`)
}

const args = process.argv.slice(2)
const record = args.includes('--record')
const selected = args.filter(arg => arg !== '--record')
const ids = selected.length ? selected : readdirSync(ADAPTERS, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name).sort()
for (const id of ids) await checkAdapter(id, record)

const annotate = process.env.GITHUB_ACTIONS === 'true'
for (const message of notes) console.log(annotate ? `::notice::${message}` : `note: ${message}`)
for (const message of failures) console.error(annotate ? `::error::${message}` : `error: ${message}`)
console.log(`${ids.length} adapters checked, ${failures.length} failure(s)`)
process.exit(failures.length ? 1 : 0)

# Contributing to Shapes Registry

## Adding a New Adapter

1. Create a directory under `adapters/` with your adapter ID (lowercase, alphanumeric + hyphens)
2. Add these files:
   - `adapter.toml` — the Shape definition (schema `openape-shapes/v1`, `schemas/adapter.schema.json`)
   - `meta.json` — metadata (must validate against `schemas/meta.schema.json`)
   - `README.md` — documentation with operation table and examples
   - `golden.json` — argv cases and the grant detail each must derive (`schemas/golden.schema.json`); every operation needs a matching case
   - `checks.json` — optional check settings (`schemas/checks.schema.json`): the `help` arguments for the real-CLI comparison and reviewed exceptions
3. Declare `value_options`/`flag_options` on every operation that is not bound to the exact command, and `tested_versions` with `version_command` and `version_pattern` for a real CLI
4. Run `node scripts/build-registry.mjs` and `npm run check` (see the README)
5. Open a pull request; the owner accepts the rules by merging it

## Adapter ID Rules

- Lowercase alphanumeric characters and hyphens only: `^[a-z][a-z0-9-]*$`
- Must match the directory name and `meta.json` `id` field
- Should be short and recognizable (e.g., `gh`, `az`, `o365mail`)

## adapter.toml Requirements

- Must use `schema = "openape-shapes/v1"`
- `[cli].id` must match the adapter directory name
- `[cli].executable` must be the exact binary name
- Each `[[operation]]` needs: `id`, `command`, `display`, `action`, `risk`, `resource_chain`
- High-risk operations that modify external state should set `exact_command = true`

## meta.json Requirements

See `schemas/meta.schema.json` for the full schema. Required fields:

| Field | Description |
|-------|-------------|
| `id` | Must match directory name |
| `name` | Human-readable name |
| `description` | One-line description |
| `author` | Author handle |
| `category` | One of: devtools, infrastructure, mail, cloud, database, monitoring, other |
| `tags` | At least one searchable tag |
| `executable` | CLI binary name |
| `min_shapes_version` | Minimum `@openape/shapes` version (semver) |

## Risk Levels

| Level | Use When |
|-------|----------|
| `low` | Read-only, list, search operations |
| `medium` | Edits that are easily reversible (mark as read, create draft) |
| `high` | Destructive or externally visible actions (send, delete, rename) |
| `critical` | Irreversible operations affecting infrastructure or billing |

## Review Criteria

- Adapter wraps a real, publicly available CLI tool
- Operations cover the most common use cases
- Risk levels are conservative (when in doubt, go higher)
- `exact_command = true` on all send/delete/create operations
- README includes working examples

# Contributing to Shapes Registry

## Adding a New Adapter

1. Create a directory under `adapters/` with your adapter ID (lowercase, alphanumeric + hyphens)
2. Add three files:
   - `adapter.toml` — the Shape definition (schema `openape-shapes/v1`)
   - `meta.json` — metadata (must validate against `schemas/meta.schema.json`)
   - `README.md` — documentation with operation table and examples
3. Run `node scripts/build-registry.mjs` to verify the registry builds
4. Open a pull request

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

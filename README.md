# Shapes Registry

Curated registry of [OpenApe Shapes](https://github.com/openape-ai/openape) adapters. Shapes are TOML definitions that wrap CLI tools with structured permissions, enabling grant-based authorization for AI agents.

## Available Adapters

| ID | Name | Category | Executable | Operations |
|----|------|----------|------------|------------|
| [gh](adapters/gh/) | GitHub CLI | devtools | `gh` | 4 |
| [az](adapters/az/) | Azure DevOps CLI | devtools | `az` | 8 |
| [exo](adapters/exo/) | Exoscale CLI | infrastructure | `exo` | 4 |
| [o365mail](adapters/o365mail/) | Office 365 Mail CLI | mail | `o365-mail-cli` | 20 |
| [gmail](adapters/gmail/) | Gmail CLI | mail | `gmail-cli` | 17 |
| [jq](adapters/jq/) | jq (stdin-only) | devtools | `jq` | 1 |
| [iurio](adapters/iurio/) | iurio CLI | devtools | `iurio` | 23 |
| [git](adapters/git/) | Git Version Control | devtools | `git` | 26 |
| [pod-runtime](adapters/pod-runtime/) | OpenApe Pods runtime | other | `pod-runtime` (virtual) | 1 |
| [pod-http](adapters/pod-http/) | OpenApe Pods HTTP access | other | `pod-http` (virtual) | 1 |

`registry.json` lists every adapter directory with its digest.

## The single adapter source

This registry is the only adapter source of the OpenApe IdP and OpenApe Pods
(issue 1473). The owner accepts a rule by merging it here; grants bind the
SHA-256 digest of `adapter.toml`, so every change to a file, including its
presentation texts, asks for new approvals of grants on that adapter.

- `[cli] tested_versions`, `version_command` and `version_pattern` name the
  CLI versions the declared options were checked against. Consumers fall back
  to exact approvals for other versions.
- `[operation.presentation]` holds the German and English texts of the IdP
  grant card: `title`, `statement`, `consequence` (`allows`,
  `does_not_allow`), `facts`, `details` and `details_note`. Texts may only use
  `{binding}` placeholders that every match binds; facts and details name a
  binding and are left out when it is unbound. Presentation never changes
  what an operation matches.
- Unknown keys fail closed in `@openape/shapes` and in
  [schemas/adapter.schema.json](schemas/adapter.schema.json).

## Checks

```bash
npm ci
npm run check            # registry.json, schemas, golden fixtures, hostile options, real CLIs
node scripts/check-adapters.mjs git             # one adapter
node scripts/check-adapters.mjs --record git    # rewrite golden expectations, then review the diff
# Before @openape/shapes with presentation support is published:
SHAPES_MODULE=/path/to/openape-monorepo/packages/shapes/dist/index.js node scripts/check-adapters.mjs
```

For every adapter the check
1. parses `adapter.toml` with the pinned `@openape/shapes` and validates it and
   `meta.json` against [schemas](schemas/);
2. derives every `golden.json` argv and compares operation, permission,
   display and exact binding; every operation needs a matching case, and no
   derived permission may contain an unresolved `{template}`. Resource chain
   entries never contain a comma (parsers split array strings there), so bind
   each value as its own resource, e.g. `owner:login={repo|owner}`,
   `repo:name={repo|name}`;
3. inserts hostile options (`--upload-pack`, `-c`, `--exec`, `--config`,
   `--output`, …) into every golden argv of a non-exact operation; they must
   never match a non-exact operation that does not declare them. Operations
   that predate declared options are listed in `checks.json`
   `legacy_operations`;
4. when the CLI is installed in a tested version, compares the declared
   options with its help output (`checks.json` `help`; documented exceptions in
   `unlisted_options`). A missing or untested CLI is reported as a notice.

## Install an Adapter

```bash
# Install to ~/.openape/shapes/adapters/ (user-global)
shapes adapter install o365mail

# Install to .openape/shapes/adapters/ (project-local)
shapes adapter install o365mail --local
```

## How It Works

Adapters are plain TOML files that describe CLI operations with permissions. When installed, they're copied to your local filesystem — no runtime dependency on this registry.

```
shapes-registry (this repo)
    ↓ shapes adapter install
~/.openape/shapes/adapters/o365mail.toml (local copy)
    ↓ shapes --grant <jwt> -- o365-mail-cli mail list
grant verified → command executed
```

Resolution order: project-local > user home > system > bundled.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to submit new adapters.

## License

MIT

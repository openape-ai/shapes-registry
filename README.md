# Shapes Registry

Curated registry of [OpenApe Shapes](https://github.com/openape-ai/openape) adapters. Shapes are TOML definitions that wrap CLI tools with structured permissions, enabling grant-based authorization for AI agents.

## Available Adapters

| ID | Name | Category | Executable | Operations |
|----|------|----------|------------|------------|
| [gh](adapters/gh/) | GitHub CLI | devtools | `gh` | 4 |
| [az](adapters/az/) | Azure DevOps CLI | devtools | `az` | 8 |
| [exo](adapters/exo/) | Exoscale CLI | infrastructure | `exo` | 4 |
| [o365mail](adapters/o365mail/) | Office 365 Mail CLI | mail | `o365-mail-cli` | 20 |
| [iurio](adapters/iurio/) | iurio CLI | devtools | `iurio` | 23 |

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

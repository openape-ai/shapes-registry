# mkdir

Shapes adapter for `mkdir` — create directories.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `mkdir.create` | `mkdir <path>` | low | Create directory |
| `mkdir.create-parents` | `mkdir -p <path>` | low | Create directory with parents |

## Examples

```bash
apes explain -- mkdir /tmp/new-dir
apes run -- mkdir -p /var/data/logs/2026
```

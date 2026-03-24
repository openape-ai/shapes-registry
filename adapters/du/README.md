# du

Shapes adapter for `du` — show disk usage of files and directories.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `du.size` | `du -sh <path>` | low | Show total size of a path in human-readable format |

## Examples

```bash
apes explain -- du -sh ./node_modules
```

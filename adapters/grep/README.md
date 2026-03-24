# grep

Shapes adapter for `grep` — search for patterns in files.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `grep.search` | `grep <pattern> <path>` | low | Search for pattern in file |
| `grep.search-recursive` | `grep -r <pattern> <path>` | low | Search recursively in directory |

## Examples

```bash
apes explain -- grep "error" /var/log/syslog
apes run -- grep -r "TODO" ./src
```

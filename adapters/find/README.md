# find

Shapes adapter for `find` — search for files in a directory hierarchy.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `find.by-name` | `find <path> -name <pattern>` | low | Find files by name pattern |
| `find.by-type` | `find <path> -type <type>` | low | Find files by type |

## Examples

```bash
apes explain -- find /var/log -name "*.log"
apes run -- find /home -type d
```

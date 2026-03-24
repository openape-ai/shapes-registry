# ps

Shapes adapter for `ps` — list running processes.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `ps.list` | `ps` | low | List current user processes |
| `ps.list-all` | `ps aux` | low | List all system processes |

## Examples

```bash
apes explain -- ps
apes explain -- ps aux
```

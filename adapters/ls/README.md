# ls

Shapes adapter for `ls` — list directory contents and file metadata.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `ls.list` | `ls <path>` | low | List directory contents |
| `ls.list-long` | `ls -l <path>` | low | List with details (permissions, size, date) |
| `ls.list-all` | `ls -la <path>` | low | List all files including hidden |

## Examples

```bash
shapes explain -- ls /tmp
shapes explain -- ls -la /var/log
shapes request --reason "check directory" -- ls -l /etc
```

# cat

Shapes adapter for `cat` — read and display file contents.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `cat.read` | `cat <path>` | low | Read file contents |
| `cat.read-numbered` | `cat -n <path>` | low | Read file contents with line numbers |

## Examples

```bash
shapes explain -- cat /etc/hostname
shapes explain -- cat -n /etc/hosts
shapes request --reason "check config" -- cat /etc/nginx/nginx.conf
```

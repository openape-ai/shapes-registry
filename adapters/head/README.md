# head

Shapes adapter for `head` — display the beginning of files.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `head.read` | `head <path>` | low | Show first 10 lines |
| `head.read-lines` | `head -n <count> <path>` | low | Show first N lines |

## Examples

```bash
apes explain -- head /var/log/syslog
apes run -- head -n 20 /etc/hosts
```

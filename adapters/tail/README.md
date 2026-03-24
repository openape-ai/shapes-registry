# tail

Shapes adapter for `tail` — display the end of files.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `tail.read` | `tail <path>` | low | Show last 10 lines |
| `tail.follow` | `tail -f <path>` | low | Follow file in real-time |

## Examples

```bash
apes explain -- tail /var/log/syslog
apes run -- tail -f /var/log/syslog
```

# stat

Shapes adapter for `stat` — show file status and metadata.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `stat.info` | `stat <path>` | low | Show file status/metadata |

## Examples

```bash
apes explain -- stat /etc/passwd
apes run -- stat /var/log/syslog
```

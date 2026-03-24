# touch

Shapes adapter for `touch` — create files or update timestamps.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `touch.create` | `touch <path>` | low | Create file or update timestamp |

## Examples

```bash
apes explain -- touch /tmp/newfile.txt
apes run -- touch /var/log/app.log
```

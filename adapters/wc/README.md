# wc

Shapes adapter for `wc` — count lines, words, and bytes in files.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `wc.count` | `wc <path>` | low | Count lines, words, and bytes |
| `wc.lines` | `wc -l <path>` | low | Count lines only |

## Examples

```bash
apes explain -- wc /etc/hosts
apes run -- wc -l /var/log/syslog
```

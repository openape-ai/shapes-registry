# df

Shapes adapter for `df` — show disk space usage.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `df.info` | `df -h` | low | Show disk space usage in human-readable format |

## Examples

```bash
apes explain -- df -h
```

# tr

Shapes adapter for `tr` — translate or delete characters from stdin.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `tr.translate` | `tr <set1> <set2>` | low | Translate characters |
| `tr.delete` | `tr -d <set>` | low | Delete characters |

## Examples

```bash
apes explain -- tr 'a-z' 'A-Z'
apes run -- tr -d '\n'
```

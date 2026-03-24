# sort

Shapes adapter for `sort` — sort lines of text files.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `sort.sort` | `sort <path>` | low | Sort file lines |
| `sort.sort-reverse` | `sort -r <path>` | low | Sort in reverse |
| `sort.sort-numeric` | `sort -n <path>` | low | Sort numerically |

## Examples

```bash
apes explain -- sort names.txt
apes run -- sort -r scores.txt
apes run -- sort -n numbers.txt
```

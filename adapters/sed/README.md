# sed

Shapes adapter for `sed` — stream editor for filtering and transforming text.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `sed.replace` | `sed <expression> <path>` | low | Stream edit (stdout only) |
| `sed.replace-inplace` | `sed -i <expression> <path>` | high | Edit file in-place |

## Examples

```bash
apes explain -- sed 's/foo/bar/g' config.txt
apes run -- sed -i 's/old/new/g' config.txt
```

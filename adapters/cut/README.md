# cut

Shapes adapter for `cut` — extract sections from lines of files.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `cut.fields` | `cut -f <fields> -d <delimiter> <path>` | low | Extract fields by delimiter |
| `cut.chars` | `cut -c <range> <path>` | low | Extract character positions |

## Examples

```bash
apes explain -- cut -f 1 -d ":" /etc/passwd
apes run -- cut -c 1-10 data.txt
```

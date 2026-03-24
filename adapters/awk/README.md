# awk

Shapes adapter for `awk` — pattern scanning and text processing.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `awk.process` | `awk <program> <path>` | low | Process text with AWK program |

## Examples

```bash
apes explain -- awk '{print $1}' /etc/passwd
apes run -- awk -F: '{print $1, $3}' /etc/passwd
```

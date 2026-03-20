# echo

Shapes adapter for `echo` — print messages to stdout.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `echo.print` | `echo <message>` | low | Print a message to stdout |

## Examples

```bash
# Explain what a command does
shapes explain -- echo "hello world"

# Request + execute
shapes request --reason "test output" -- echo "hello from openape"
```

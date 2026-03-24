# rm

Shapes adapter for `rm` — remove files and directories.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `rm.remove` | `rm <path>` | high | Remove file |
| `rm.remove-recursive` | `rm -r <path>` | critical | Remove directory recursively |
| `rm.remove-force` | `rm -rf <path>` | critical | Force remove recursively |

## Examples

```bash
apes explain -- rm /tmp/tempfile.txt
apes run -- rm -r /tmp/old-project
```

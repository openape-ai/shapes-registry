# cp

Shapes adapter for `cp` — copy files and directories.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `cp.copy` | `cp <source> <dest>` | medium | Copy file |
| `cp.copy-recursive` | `cp -r <source> <dest>` | high | Copy directory recursively |

## Examples

```bash
apes explain -- cp /tmp/a.txt /tmp/b.txt
apes run -- cp -r /var/data /backup/data
```

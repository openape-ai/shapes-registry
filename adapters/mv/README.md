# mv

Shapes adapter for `mv` — move or rename files and directories.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `mv.move` | `mv <source> <dest>` | high | Move/rename file or directory |

## Examples

```bash
apes explain -- mv /tmp/old.txt /tmp/new.txt
apes run -- mv /var/data /var/data-backup
```

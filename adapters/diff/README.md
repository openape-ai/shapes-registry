# diff

Shapes adapter for `diff` — compare files line by line.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `diff.compare` | `diff <file1> <file2>` | low | Compare two files |
| `diff.unified` | `diff -u <file1> <file2>` | low | Unified diff format |

## Examples

```bash
apes explain -- diff /etc/hosts /etc/hosts.bak
apes run -- diff -u config.old.json config.json
```

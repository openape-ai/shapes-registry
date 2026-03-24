# rmdir

Shapes adapter for `rmdir` — remove empty directories.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `rmdir.remove` | `rmdir <path>` | medium | Remove empty directory |

## Examples

```bash
apes explain -- rmdir /tmp/empty-dir
apes run -- rmdir /var/data/old
```

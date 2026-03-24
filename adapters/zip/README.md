# zip

Shapes adapter for `zip` — create zip archives.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `zip.compress` | `zip <archive> <path>` | medium | Compress a path into a zip archive |
| `zip.compress-recursive` | `zip -r <archive> <path>` | medium | Recursively compress a path into a zip archive |

## Examples

```bash
apes explain -- zip backup.zip file.txt
apes explain -- zip -r backup.zip ./src
```

# tar

Shapes adapter for `tar` — create, extract, and list tar archives.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `tar.create` | `tar -cf <archive> <path>` | medium | Create a tar archive from a path |
| `tar.extract` | `tar -xf <archive>` | medium | Extract a tar archive |
| `tar.list` | `tar -tf <archive>` | low | List contents of a tar archive |

## Examples

```bash
apes explain -- tar -cf backup.tar ./src
apes explain -- tar -xf backup.tar
apes explain -- tar -tf backup.tar
```

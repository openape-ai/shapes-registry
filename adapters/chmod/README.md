# chmod

Shapes adapter for `chmod` — change file and directory permissions.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `chmod.set` | `chmod <mode> <path>` | high | Change permissions of a file/directory |
| `chmod.recursive` | `chmod -R <mode> <path>` | critical | Recursively change permissions |

## Examples

```bash
shapes explain -- chmod 644 /tmp/key
shapes explain -- chmod -R 755 /var/www
shapes request --reason "fix key permissions" -- chmod 600 ~/.ssh/id_ed25519
```

# id

Shapes adapter for `id` — show user and group identity information.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `id.info` | `id` | low | Show current user and group IDs |
| `id.user` | `id <username>` | low | Show user and group IDs for a specific user |

## Examples

```bash
apes explain -- id
apes explain -- id root
```

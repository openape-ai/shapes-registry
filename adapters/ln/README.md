# ln

Shapes adapter for `ln` — create hard and symbolic links.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `ln.link` | `ln <target> <link>` | medium | Create hard link |
| `ln.symlink` | `ln -s <target> <link>` | medium | Create symbolic link |

## Examples

```bash
apes explain -- ln /var/data/config.yml /etc/app/config.yml
apes run -- ln -s /usr/local/bin/node /usr/bin/node
```

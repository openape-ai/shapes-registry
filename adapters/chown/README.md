# chown

Shapes adapter for `chown` — change file and directory ownership.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `chown.set` | `chown <owner> <path>` | high | Change owner of a file/directory |
| `chown.recursive` | `chown -R <owner> <path>` | critical | Recursively change ownership |

## Examples

```bash
shapes explain -- chown www-data:www-data /var/www/html
shapes explain -- chown -R deploy:deploy /opt/app
shapes request --reason "fix file ownership" -- chown root:root /etc/nginx/nginx.conf
```

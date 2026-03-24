# wget

Shapes adapter for `wget` — download files from the web.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `wget.download` | `wget <url>` | medium | Download a URL to the current directory |
| `wget.download-output` | `wget -O <output> <url>` | medium | Download a URL to a specific file |

## Examples

```bash
apes explain -- wget https://example.com/file.tar.gz
apes explain -- wget -O output.html https://example.com
```

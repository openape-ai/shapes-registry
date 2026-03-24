# curl

Shapes adapter for `curl` — transfer data with URLs.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `curl.get` | `curl <url>` | medium | Perform a GET request |
| `curl.post` | `curl -X POST -d <data> <url>` | medium | Perform a POST request with data |
| `curl.download` | `curl -o <output> <url>` | medium | Download a URL to a local file |

## Examples

```bash
apes explain -- curl https://api.example.com/data
apes explain -- curl -X POST -d '{"key":"value"}' https://api.example.com
apes explain -- curl -o output.html https://example.com
```

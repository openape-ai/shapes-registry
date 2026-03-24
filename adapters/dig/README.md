# dig

Shapes adapter for `dig` — DNS lookup utility.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `dig.lookup` | `dig <domain>` | low | Perform a DNS lookup for a domain |
| `dig.lookup-type` | `dig <domain> <type>` | low | Perform a DNS lookup for a specific record type |

## Examples

```bash
apes explain -- dig example.com
apes explain -- dig example.com MX
```

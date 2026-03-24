# ping

Shapes adapter for `ping` — test network connectivity.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `ping.test` | `ping -c 4 <host>` | low | Send 4 ICMP packets to test connectivity |

## Examples

```bash
apes explain -- ping -c 4 google.com
```

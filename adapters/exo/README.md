# exo — Exoscale CLI Adapter

Shapes adapter for the [Exoscale CLI](https://community.exoscale.com/documentation/tools/exoscale-command-line-interface/).

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `dns.list` | list | low | List DNS domains |
| `dns.show` | list | low | List DNS records in a domain |
| `dns.show.record` | read | low | Read a specific DNS record |
| `dns.remove` | delete | high | Delete a DNS record (exact_command) |

## Install

```bash
shapes adapter install exo
```

## Example

```bash
shapes explain -- exo dns show example.com --name www
```

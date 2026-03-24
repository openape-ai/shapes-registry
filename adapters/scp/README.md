# scp

Shapes adapter for `scp` — secure copy between hosts.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `scp.upload` | `scp <source> <destination>` | high | Copy a local file to a remote host |
| `scp.download` | `scp <source> <destination>` | high | Copy a file from a remote host to local |

## Examples

```bash
apes explain -- scp ./file.txt user@server:/tmp/
apes explain -- scp user@server:/tmp/file.txt ./
```

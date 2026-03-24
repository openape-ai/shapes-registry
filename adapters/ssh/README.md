# ssh

Shapes adapter for `ssh` — secure shell remote access.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `ssh.connect` | `ssh <destination>` | critical | Open an interactive SSH session |
| `ssh.command` | `ssh <destination> <command>` | critical | Execute a command on a remote host |

## Examples

```bash
apes explain -- ssh user@server.example.com
apes explain -- ssh user@server.example.com ls -la
```

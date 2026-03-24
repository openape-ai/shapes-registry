# kill

Shapes adapter for `kill` — send signals to processes.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `kill.signal` | `kill <pid>` | high | Send default signal to a process |
| `kill.term` | `kill -15 <pid>` | high | Send SIGTERM to a process |
| `kill.force` | `kill -9 <pid>` | critical | Force kill a process with SIGKILL |

## Examples

```bash
apes explain -- kill 1234
apes explain -- kill -15 1234
apes explain -- kill -9 1234
```

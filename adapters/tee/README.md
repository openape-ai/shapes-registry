# tee

Shapes adapter for `tee` — copy stdin to file and stdout.

## Operations

| ID | Command | Risk | Description |
|----|---------|------|-------------|
| `tee.write` | `tee <path>` | low | Copy stdin to file and stdout |
| `tee.append` | `tee -a <path>` | low | Append stdin to file and stdout |

## Examples

```bash
apes explain -- tee output.log
apes run -- tee -a output.log
```

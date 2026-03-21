# apes — OpenApe Privilege Elevation Adapter

Shapes adapter for [apes](https://github.com/openape-ai/sudo) — grant-authorized command execution with elevated privileges.

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `exec.run` | execute | high | Execute a command with elevated privileges (exact_command) |
| `agent.enroll` | create | high | Enroll a new agent at an IdP (exact_command) |
| `agent.update` | edit | medium | Update agent configuration |
| `agent.remove` | delete | high | Remove an agent (exact_command) |

## Install

```bash
shapes adapter install apes
```

## Example

```bash
# Request grant and execute
grapes run apes "apt update" --reason "security patches"

# Or via shapes
shapes explain -- apes -- systemctl restart nginx
shapes request --approval once -- apes -- systemctl restart nginx
```

## Notes

- apes is a setuid-root binary — all command execution requires explicit human approval via the OpenApe grant system
- Use `--run-as <user>` with apes to run as a specific user instead of root
- The `exec.run` operation uses `exact_command = true` — each unique command requires its own grant approval
- Agent management operations (`enroll`, `update`, `remove`) require root access to modify `/etc/apes/config.toml`

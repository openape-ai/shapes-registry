# gh — GitHub CLI Adapter

Shapes adapter for the [GitHub CLI](https://cli.github.com).

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `repo.list` | list | low | List repositories for an owner |
| `repo.view` | read | low | Read repository details |
| `issue.list` | list | low | List issues in a repository |
| `repo.rename` | rename | high | Rename a repository (exact_command) |

## Install

```bash
shapes adapter install gh
```

## Example

```bash
shapes explain -- gh repo list torvalds
shapes --grant <jwt> -- gh repo list torvalds
```

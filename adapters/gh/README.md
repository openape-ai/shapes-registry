# gh — GitHub CLI Adapter

Shapes adapter for the [GitHub CLI](https://cli.github.com).

## Operations

### Repositories
| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `repo.list` | list | low | List repositories for an owner |
| `repo.view` | read | low | View repository details |
| `repo.clone` | read | low | Clone a repository |
| `repo.create` | create | high | Create a repository |
| `repo.rename` | rename | high | Rename a repository |
| `repo.delete` | delete | critical | Delete a repository |

### Issues
| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `issue.list` | list | low | List issues in a repository |
| `issue.view` | read | low | View an issue |
| `issue.create` | create | medium | Create an issue |
| `issue.edit` | edit | medium | Edit an issue |
| `issue.close` | edit | medium | Close an issue |
| `issue.reopen` | edit | medium | Reopen an issue |
| `issue.comment` | create | medium | Comment on an issue |

### Pull Requests
| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `pr.list` | list | low | List pull requests |
| `pr.view` | read | low | View a pull request |
| `pr.create` | create | medium | Create a pull request |
| `pr.merge` | edit | high | Merge a pull request |
| `pr.close` | edit | medium | Close a pull request |
| `pr.comment` | create | medium | Comment on a pull request |

### CI/CD
| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `run.list` | list | low | List workflow runs |
| `run.view` | read | low | View a workflow run |
| `run.rerun` | edit | medium | Rerun a workflow |

### Releases
| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `release.list` | list | low | List releases |
| `release.view` | read | low | View a release |
| `release.create` | create | high | Create a release |

## Install

```bash
apes adapter install gh
```

## Examples

```bash
apes explain -- gh repo list torvalds
apes explain -- gh issue create --repo owner/repo --title "Bug report"
apes run -- gh issue comment 42 --repo owner/repo --body "Fixed in v2"
```

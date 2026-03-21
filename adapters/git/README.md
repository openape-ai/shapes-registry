# git — Version Control Adapter

Shapes adapter for [git](https://git-scm.com).

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `git.status` | read | low | Show working tree status |
| `git.log` | read | low | Show commit log |
| `git.diff` | read | low | Show changes |
| `git.branch` | read | low | List branches |
| `git.remote` | read | low | Show remotes |
| `git.fetch` | read | low | Fetch from remote |
| `git.pull` | edit | medium | Pull from remote |
| `git.add` | edit | low | Stage changes |
| `git.commit` | create | medium | Create a commit |
| `git.push` | edit | high | Push to remote |
| `git.clone` | create | low | Clone a repository |
| `git.checkout` | edit | medium | Checkout ref |
| `git.switch` | edit | medium | Switch branch |
| `git.merge` | edit | high | Merge branch |
| `git.reset` | delete | high | Reset HEAD (exact_command) |
| `git.rebase` | edit | high | Rebase (exact_command) |
| `git.stash` | edit | medium | Stash changes |
| `git.tag` | create | medium | Create tag |

## Install

```bash
shapes adapter install git
```

## Example

```bash
# Check status (always grant)
shapes request --approval always -- git status

# Commit (always grant)
shapes request --approval always -- git commit -m "fix: typo"

# Push (timed grant — requires periodic re-approval)
shapes request --approval timed -- git push
```

## Recommended Grant Strategy

- **always**: status, log, diff, branch, remote, fetch, add, commit, clone, stash
- **timed**: push, pull, checkout, switch, tag
- **once**: merge, reset, rebase (destructive — approve each time)

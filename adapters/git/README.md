# git — Version Control Adapter

Shapes adapter for [git](https://git-scm.com), tested with git 2.54.

Every operation that is not bound to the exact command declares its options;
any other option, such as `--upload-pack`, `-c` or `--exec`, makes it not
match, so such a command needs its own exact approval. `git -C <path>` is
accepted once before the command and bound as `{repo}`.

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
| `git.rebase` | edit | high | Rebase, e.g. `--continue` or `--abort` (exact_command) |
| `git.stash` | edit | medium | Stash changes |
| `git.tag` | create | medium | Create tag |
| `git.worktree.list` | read | low | List worktrees |
| `git.fetch.remote` | read | low | Fetch from a named remote |
| `git.merge-base` | read | low | Merge base or ancestry check |
| `git.merge-tree` | read | low | Test merge without a worktree |
| `git.replay.print` | read | low | `git replay --ref-action=print` (prints ref updates only) |
| `git.rev-parse` | read | low | Resolve a ref |
| `git.rebase.upstream` | rebase | high | Rebase onto an upstream (exact_command) |
| `git.push.refspec` | push | high | Push a refspec to a remote (exact_command) |

`git.status`, `git.fetch`, `git.fetch.remote`, `git.merge-base`,
`git.replay.print`, `git.rebase`, `git.rebase.upstream` and `git.push.refspec`
carry presentation texts for the IdP grant card.

## Checks

`golden.json` records the permission of every case, including 43 argv that
matched the previous registry adapter and no longer match because they use an
undeclared option. `checks.json` lists the declared options that `git -h`
does not print; they are documented in the git 2.54 manual pages.

## Install

```bash
shapes adapter install git
```

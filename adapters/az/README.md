# az — Azure DevOps CLI Adapter

Shapes adapter for the [Azure DevOps CLI](https://learn.microsoft.com/en-us/cli/azure/devops).

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `repos.list` | list | low | List repositories in a project |
| `repos.show` | read | low | Read repository details |
| `repos.create` | create | high | Create a repository (exact_command) |
| `repos.pr.list` | list | low | List pull requests |
| `repos.pr.show` | read | low | Read pull request details |
| `repos.pr.create` | create | high | Create a pull request (exact_command) |
| `repos.pr.reviewer.add` | reviewer-add | high | Add reviewers to a PR (exact_command) |
| `repos.pr.update` | update | high | Update a pull request (exact_command) |

## Install

```bash
shapes adapter install az
```

## Example

```bash
shapes explain -- az repos list --org https://dev.azure.com/myorg --project MyProject
```

## Tested versions

`tested_versions` is azure-cli 2.83.0 (`az --version`). `tested_digests`
holds the Homebrew azure-cli 2.83.0 launcher, a shell script that starts the
bundled Python and therefore cannot run inside the isolated version probe of
OpenApe Pods. The operations used by Pods declare their options; `rest` is
split by method, so a GET grant never covers a POST, and `--output-file`,
`--headers` and other options are refused.

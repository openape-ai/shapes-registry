# pod-ssh — OpenApe Pods SSH inventory

`pod-ssh` is not an installed program. The OpenApe Pods desktop builds the argv
for a reviewed SSH binding (resolved owner SSH metadata and known host keys) and
reads a fixed inventory profile; no command, option or host comes from a
script.

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `inventory` | read | low | Fixed inventory `--profile` for the reviewed binding `--binding` |

## Checks

The argv never comes from a shell, so `inventory` keeps the legacy option rule
(`checks.json` `legacy_operations`). There is no CLI to compare with.

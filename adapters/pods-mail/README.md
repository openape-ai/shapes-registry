# pods-mail — OpenApe Pods mail reader

`pods-mail` is the single-file Microsoft Graph reader of the OpenApe Pods mail
review (`microsoft-mail.mjs`, run by Node.js through a Pods runtime
descriptor). It reads one mailbox with the owner's existing Microsoft sign-in.

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `list` | list | low | New and changed messages (`--account`, optional `--cursor`) |
| `read` | read | low | One message (`--account`, `--message`) |
| `thread` | read | low | One conversation (`--account`, `--conversation`) |
| `archive` | archive | high | Move one approved message (exact command; Pods archive service only) |
| `protection` | read | low | Recipients of sent mail (`--account`) |

## Tested versions

The script has no version command. `tested_digests` lists the reviewed file;
any other file falls back to exact approvals in Pods.

## Checks

Every operation declares its options (the script refuses any other option).
There is no help output to compare with.

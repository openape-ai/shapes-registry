# o365 — Microsoft 365 CLI Adapter

Shapes adapter for [o365-cli](https://github.com/patrick-hofmann/o365-cli) — mail, calendar, folders, rules, and drafts via Microsoft Graph API.

Replaces the `o365mail` adapter (which targeted the old `o365-mail-cli`).

## Multi-Account Behavior

- **Read operations** (list, search, today) query all logged-in accounts automatically.
- **Write operations** (send, create, delete, etc.) require `--account` when multiple accounts are logged in.
- With only one account, `--account` is not needed.

## Operations

### Auth

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `auth.login` | create | medium | Login to a Microsoft 365 account |
| `auth.logout` | delete | medium | Logout from a specific account |
| `auth.logout-all` | delete | high | Logout from all accounts |
| `auth.list` | list | low | List logged-in accounts |
| `auth.status` | read | low | Show token status |

### Mail — Read

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `mail.list` | list | low | List emails (all accounts) |
| `mail.read` | read | low | Read a specific email |
| `mail.search` | search | low | Search emails by criteria |
| `mail.query` | search | low | Search via KQL |
| `mail.attachments` | read | low | Download attachments |

### Mail — Write

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `mail.send` | send | high | Send an email |
| `mail.reply` | send | high | Reply to an email |
| `mail.forward` | send | high | Forward an email |
| `mail.mark-read` | edit | medium | Mark as read |
| `mail.mark-unread` | edit | medium | Mark as unread |
| `mail.move` | edit | medium | Move to folder |
| `mail.trash` | delete | high | Move to trash |
| `mail.archive-from` | edit | high | Archive emails from senders |

### Calendar — Read

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `calendar.list` | list | low | List upcoming events (all accounts) |
| `calendar.today` | list | low | List today's events (all accounts) |
| `calendar.get` | read | low | Get event details |

### Calendar — Write

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `calendar.create` | create | high | Create a new event |
| `calendar.update` | edit | high | Update an event |
| `calendar.delete` | delete | critical | Delete an event |
| `calendar.accept` | send | high | Accept invitation |
| `calendar.decline` | send | high | Decline invitation |
| `calendar.tentative` | send | high | Tentatively accept |

### Drafts

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `drafts.list` | list | low | List drafts (all accounts) |
| `drafts.read` | read | low | Read a draft |
| `drafts.save` | create | medium | Save a new draft |
| `drafts.send` | send | high | Send a draft |
| `drafts.delete` | delete | high | Delete a draft |

### Folders

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `folders.list` | list | low | List mail folders (all accounts) |
| `folders.create` | create | medium | Create a folder |
| `folders.delete` | delete | critical | Delete a folder |

### Rules

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `rules.list` | list | low | List inbox rules (all accounts) |
| `rules.get` | read | low | Get a specific rule |
| `rules.create` | create | high | Create an inbox rule |
| `rules.update` | edit | high | Update an inbox rule |
| `rules.delete` | delete | high | Delete an inbox rule |

## Install

```bash
brew install patrick-hofmann/tap/o365-cli
# or
go install github.com/patrick-hofmann/o365-cli/cmd/o365-cli@latest
```

## Examples

```bash
# Explain a command
shapes explain -- o365-cli calendar today

# List emails across all accounts
shapes request --reason "check inbox" -- o365-cli mail list

# Send email (requires --account)
shapes request --reason "reply to client" -- o365-cli mail send --account me@example.com --to client@example.com --subject "Re: Quote" --body "Attached."

# List today's calendar (all accounts)
shapes request --reason "check schedule" -- o365-cli calendar today

# Create event
shapes request --reason "schedule meeting" -- o365-cli calendar create --account me@example.com --subject "Standup" --start "2026-04-01T09:00:00+02:00" --end "2026-04-01T09:30:00+02:00"
```

## Tested versions

Every o365-cli build prints `o365-cli v2.1.1`, including the OpenApe Pods
builds with the account-scoped `workflow` commands, so `tested_digests` lists
the reviewed builds. Calendar and mail reads with `--account` bind that
account. `checks.json` `absent_operations` lists commands some tested builds
do not provide; the option check runs against the actual selected executable.

## Protected workflow transport

`workflow label-snapshot` reads one message's current decision input.
`workflow thread-evidence` reads bounded conversation pages and accepts an
optional `--cursor`. Both require an explicit account and immutable message ID.

`workflow decide-label --account ACCOUNT --request JSON --journal DIRECTORY`
owns label mutation. Its account-scoped category permission permits the CLI to
recheck eligibility under the shared mailbox lock, merge the requested label
dimension and retain a receipt. The CLI refuses an account mismatch in the
request. This operation neither moves messages nor grants archival authority.
The lock coordinates participating local writers; it does not serialize manual
Outlook changes or establish provider compare-and-swap.

`workflow archive` remains an exact, once-only human decision. Every argument,
including optional `--gate JSON`, belongs to its argv hash. `workflow
review-archive` accepts the same gate and only constructs the reviewed object.
Raw `mail move` and `workflow move` are denied by the registry; protected
programs cannot bypass that rule through generic command fallback.

`workflow label-inspect` reads retained receipts, optionally selecting one
operation. `workflow label-reconcile` records an observed outcome under a fresh
exact once-only operator decision. It does not mutate mail or replay an old
operation and should not be assigned to a classification Pod. Unknown outcomes
must be inspected and reconciled before any new attempt.

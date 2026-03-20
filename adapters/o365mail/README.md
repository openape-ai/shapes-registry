# o365mail — Office 365 Mail CLI Adapter

Shapes adapter for [o365-mail-cli](https://github.com/openape-ai/o365-mail-cli) — read, search, send, draft, and manage emails via Microsoft Graph.

## Operations

### Mail — Read

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `mail.list` | list | low | List emails in mailbox |
| `mail.read` | read | low | Read a specific email |
| `mail.search` | search | low | Search emails by from/subject/date |
| `mail.query` | search | low | Full-text search across emails |
| `mail.attachments` | read | low | Download email attachments |

### Mail — Edit

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `mail.mark-read` | edit | medium | Mark email as read |
| `mail.mark-unread` | edit | medium | Mark email as unread |
| `mail.move` | edit | medium | Move email to a folder |
| `mail.trash` | delete | high | Trash an email (exact_command) |
| `mail.archive-from` | edit | high | Archive emails from senders (exact_command) |

### Mail — Send

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `mail.send` | send | high | Send a new email (exact_command) |
| `mail.reply` | send | high | Reply to an email (exact_command) |
| `mail.forward` | send | high | Forward an email (exact_command) |

### Drafts

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `drafts.list` | list | low | List drafts |
| `drafts.create` | draft | medium | Create a draft |
| `drafts.send` | send | high | Send a draft (exact_command) |
| `drafts.delete` | delete | medium | Delete a draft |

### Folders

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `folders.list` | list | low | List mailbox folders |
| `folders.create` | create | medium | Create a folder (exact_command) |
| `folders.delete` | delete | critical | Delete a folder and all contents (exact_command) |

### Rules

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `rules.list` | list | low | List inbox rules |
| `rules.get` | read | low | Get rule details |
| `rules.create` | create | high | Create an inbox rule (exact_command) |
| `rules.update` | edit | high | Update an inbox rule (exact_command) |
| `rules.delete` | delete | high | Delete an inbox rule (exact_command) |
| `rules.enable` | edit | medium | Enable an inbox rule |
| `rules.disable` | edit | medium | Disable an inbox rule |

## Install

```bash
shapes adapter install o365mail
```

## Example

```bash
# Explain what permission is needed
shapes explain -- o365-mail-cli mail list --account phofmann@delta-mind.at --limit 10

# Execute with a grant
shapes --grant <jwt> -- o365-mail-cli mail list --account phofmann@delta-mind.at --limit 10

# Search emails
shapes --grant <jwt> -- o365-mail-cli mail search --from sender@example.com --account phofmann@delta-mind.at
```

## Granting Permissions

### Read/sort access (e-mail triage)

```bash
grapes request-capability o365mail \
  --resource account --selector account.email=phofmann@delta-mind.at \
  --resource mail \
  --action list --action read --action search --action edit \
  --approval always \
  --reason "E-Mail-Triage Cron"
```

### Draft creation

```bash
grapes request-capability o365mail \
  --resource account --selector account.email=phofmann@delta-mind.at \
  --resource draft \
  --action list --action draft \
  --approval always \
  --reason "E-Mail-Triage – Drafts"
```

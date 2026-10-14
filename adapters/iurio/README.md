# iurio CLI adapter

Shapes adapter for the [iurio](https://iurio.com) CLI — the command-line
interface for the iurio / DOCPIT document management and task-tracking
platform by Legal Tech Services GmbH.

**Executable:** `iurio`
**Category:** `devtools`
**Minimum @openape/apes version:** `0.8.0`

## Why 0.8.0?

iurio's command structure interleaves fixed keywords with positional IDs, e.g.

```
iurio project 42 workspace 7 task 123 archive
```

Distinguishing `task show`, `task archive`, `task remove`, etc. requires the
literal-positional feature introduced in `@openape/apes@0.8.0` (positional
names prefixed with `=` act as literal matchers). Older apes versions cannot
load this adapter safely — every task-id operation would collapse onto the
first matching operation with the same positional count.

## Covered operations (23)

### Read / list
- `mytasks.list` — `iurio mytasks`
- `projects.list` — `iurio projects list`
- `workspaces.list` — `iurio project <pid> workspaces list`
- `datasafe.list` — `iurio project <pid> workspace <wid> datasafe list`
- `datasafe.download` — `iurio project <pid> workspace <wid> datasafe download <path>`
- `datasafe.file.download` — `iurio project <pid> workspace <wid> datasafe file <fid> download <path>`
- `lanes.list` — `iurio project <pid> workspace <wid> lanes list`
- `tasks.list` — `iurio project <pid> workspace <wid> tasks list`
- `task.show` — `iurio project <pid> workspace <wid> task <tid> show`
- `task.log` — `iurio project <pid> workspace <wid> task <tid> log`
- `task.comments.list` — `... task <tid> comments list`
- `task.attachments.list` — `... task <tid> attachments list`

### Create / edit (medium risk)
- `datasafe.file.upload` — `... datasafe file upload <folder-id> <path>`
- `datasafe.file.upload-version` — `... datasafe file upload-version <fid> <path>`
- `task.add` — `... task add <lane-id> <text>`
- `task.edit` — `... task <tid> edit`
- `task.move` — `... task <tid> move <lane-id>`
- `task.archive` — `... task <tid> archive`
- `task.unarchive` — `... task <tid> unarchive`
- `task.comment.add` — `... task <tid> comment add <text>`
- `task.attachment.add` — `... task <tid> attachment add <url>`
- `task.attachment.remove` — `... task <tid> attachment <aid> remove`

### Delete (high risk)
- `task.remove` — `... task <tid> remove`

## Example grant flow

```bash
apes adapter install iurio
apes explain -- iurio project 42 workspace 7 task 123 archive
# operation=task.archive, risk=medium
apes run -- iurio project 42 workspace 7 task 123 archive
# Requests a grant from the configured IdP, waits for human approval,
# then executes iurio with the approved grant token.
```

## Environment variables

The iurio CLI itself reads:

- `IURIO_INSTALLATION` — server URL (e.g., `https://office.iurio.com`)
- `IURIO_USERNAME`, `IURIO_PASSWORD` — credentials
- `SKIP_CERT_CHECK` — optional, skip SSL validation

## Tested versions

The tested iurio CLI is the single-file bundle of the OpenApe Pods task
monitor, listed by file digest (`tested_digests`); it has no version command.
`tasks.list` declares `--lane`, `--tag` and `--archived`; the other operations
are still legacy (`checks.json`).

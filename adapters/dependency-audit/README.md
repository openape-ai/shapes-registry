# dependency-audit — OpenApe dependency audit

The single-file audit script of the OpenApe dependency audit Pod
(`run-audit.mjs`, run by Node.js). It checks the dependencies of one
configured project for known vulnerabilities and changes nothing.

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `dependency-audit.project` | read | low | Audit one configured project (one positional, no options) |

## Tested versions

The script has no version command. `tested_digests` lists the reviewed file;
any other file falls back to exact approvals in Pods.

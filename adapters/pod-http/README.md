# pod-http — OpenApe Pods HTTPS access

`pod-http` is not an installed program. The OpenApe Pods desktop builds the
argv for an HTTPS origin and method; its proxy enforces the granted origins and
methods.

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `request` | request | high | HTTPS request to `--origin` with `--method` |

## Presentation

Grants for several methods or a whole origin carry no bindings, so the title
names no binding and the origin and method facts appear only for single
requests.

## Checks

The argv never comes from a shell, so `request` keeps the legacy option rule
(`checks.json` `legacy_operations`). There is no CLI to compare with.

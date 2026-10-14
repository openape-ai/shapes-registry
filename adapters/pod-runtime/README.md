# pod-runtime — OpenApe Pods runtime authority

`pod-runtime` is not an installed program. The OpenApe Pods desktop builds the
argv itself and requests one grant per Pod that lets the Pod run its stored
script within its separately assigned permissions.

## Operations

| ID | Action | Risk | Description |
|----|--------|------|-------------|
| `run` | run | high | Run the stored script of a Pod (`--pod`, `--name`, `--script`, `--workspace`; Pods also passes `--home` and `--environment`) |

## Presentation

The IdP grant card shows the Pod name as title, the statement "Run the stored
Pod script", what the grant allows and does not allow, the script and working
directory as facts and the environment variables behind a disclosure.

## Checks

The argv never comes from a shell, so `run` keeps the legacy option rule
(`checks.json` `legacy_operations`). There is no CLI to compare with.

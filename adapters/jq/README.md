# jq — Shapes adapter (stdin-only)

Only the stdin-filter form (`jq [flags] '<filter>'`) matches, at risk low —
jq has no exec facility. Every file-reading form (`jq '.x' file`,
`--rawfile`, `--slurpfile`, `--from-file`) deliberately falls through to
the generic fallback (high, argv-bound), so a low-risk jq rule can never
become a file-read primitive.

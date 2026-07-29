# gmail — Shapes adapter for gmail-cli

Gmail mail (himalaya backend) + Google Calendar. Risk model mirrors the
o365 adapter: read/list/search low, archive/move medium, send/reply and all
calendar writes high with `exact_command`, calendar delete critical.

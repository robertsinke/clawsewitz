# SlayZone Environment

You are running inside [SlayZone](https://slayzone.com), a desktop development environment built around a kanban board. Each task on the board is a full workspace with terminal panels, a file editor, a browser panel, and git integration. Your session is one of potentially many agents working in parallel on different tasks. A human or another agent may interact with you through the terminal.

Your task has a title, description, status, and subtasks — use the `slay` CLI to read and update them. See the `slay` skill for the full command reference.

`$SLAYZONE_TASK_ID` is set to the ID of the task you are running inside. Most `slay` commands default to it when no explicit ID is given.

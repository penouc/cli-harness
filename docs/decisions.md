# Decisions

## D001: Start with a CLI

The first phase starts with a CLI harness because it exposes the core engineering loop without IDE integration cost.

## D002: Use npm workspaces

npm workspaces keep setup minimal. The series can migrate to pnpm later if workspace complexity grows.

## D003: Keep articles as Markdown

Markdown keeps daily delivery cheap. A site generator can be added after the content rhythm is stable.

## D004: Defer MCP and IDE integration

MCP and IDE integration are important but would hide the core harness mechanics too early.


# Day 01 Demo

Day 01 不实现 agent 功能，但 demo 仍然要能验证今天的交付物：文章、架构文档和图片资产都已经准备好。

## Command

```bash
rg -n "^## (文章介绍|常见接口形态|模型、Agent 和 Harness 的边界|一个 Coding Agent Harness 需要什么)" articles/day-01-what-is-agent-harness.md
file assets/day-01/agent-harness-layers.png
sed -n '1,80p' docs/architecture.md
```

## Expected Output

The first command should find the main Day 01 sections.

The second command should report a PNG image for the layered architecture diagram.

The third command should show the first version of the project architecture:

```text
User Task
  -> CLI
  -> Context Builder
  -> Agent Loop
  -> Tool Runtime
  -> Safety Layer
  -> Transcript + Debug Output
  -> Final Output
```

## Verified On

```bash
rg -n "^## (文章介绍|常见接口形态|模型、Agent 和 Harness 的边界|一个 Coding Agent Harness 需要什么)" articles/day-01-what-is-agent-harness.md
file assets/day-01/agent-harness-layers.png
sed -n '1,80p' docs/architecture.md
```

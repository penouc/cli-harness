# Day 08 - Context Builder / 上下文构建器

## 今天要解决什么

组装 system prompt、用户请求、历史摘要、工具定义和项目文件片段。

## 它在 Cursor/Codex 里对应哪一层

对应 Cursor Context Explorer 背后的上下文生成层。

## 设计思路

所有进入模型的材料都要有来源、类别和 token 估算。

## 实现步骤

1. 定义 context part。
2. 收集 system prompt。
3. 收集 tools。
4. 收集 conversation。
5. 预留 rules 和 selected files。

## Demo

See [Day 08 demo](../demos/day-08/README.md).

## 当前系统能力变化

上下文从散落字符串变成结构化输入。

## 遇到的问题

需要控制 token budget，避免历史对话挤掉关键文件。

## 明天做什么

实现 Context Explorer。


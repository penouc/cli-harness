# Glossary

- Agent Harness: 模型外面的执行系统，负责上下文、工具、权限、状态和用户交互。
- Context Builder: 把任务相关材料组装成模型输入的模块。
- Tool Runtime: 将模型的 tool call 分发到真实函数、命令或外部系统。
- Agent Loop: 模型反复观察结果、选择动作、调用工具直到完成任务的循环。
- Rules: 持久项目指令，例如 repo 约定、测试命令和代码风格。
- Sandbox: 限制 agent 读写路径、网络和命令能力的边界。
- Approval: 在危险动作前请求用户确认的机制。
- Transcript: 可回放的执行日志。
- Context Report: 按类别统计当前上下文窗口内容和 token 占用的报告。


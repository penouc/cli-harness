# Context Report Format

The context report groups prompt material by source and estimates token usage.

```text
Context Explorer

System prompt          ~120 tokens
Tool definitions       ~850 tokens
Rules                  ~300 tokens
Selected files         ~1,200 tokens
Conversation           ~2,400 tokens
Tool results           ~600 tokens
Total                  ~5,470 tokens
```

The first implementation uses an approximate token estimator. Later versions can swap in a model-specific tokenizer.


---
name: 'llm_context'
node: midRight
role: satellite
kind: mcp
tagline: 'Code and documentation retrieval for agents over MCP, on PostgreSQL + pgvector.'
summary: 'code retrieval on pgvector'
problem: 'Agents need precise technical context without loading an entire repository into the prompt.'
outcome: 'The retrieval layer Exodia uses to find the right code for a ticket. Moving from SQLite to pgvector made sustained, multi-project indexing practical.'
stack: ['Python', 'PostgreSQL', 'pgvector', 'local embeddings', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm_context
---

llm_context indexes source code and technical documents into PostgreSQL with pgvector, using local embeddings, and exposes them through MCP tools for context retrieval, semantic search and symbol search.

Every operation is scoped to an explicit project, so context never leaks across repositories. Ingest is incremental and stays outside the always-on MCP surface. Each document is replaced in a single transaction, so queries keep seeing the previous version until the new one is committed. The embedding model is a server setting: a client cannot ask for a different one.

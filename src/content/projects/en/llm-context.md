---
name: llm_context
sephirah: chesed
role: satellite
tagline: Retrieval over code and technical docs for agents, via MCP, on PostgreSQL + pgvector.
summary: code retrieval on pgvector
problem: Agents need precise technical context without loading an entire repository into the prompt.
stack: [Python, PostgreSQL, pgvector, local embeddings, MCP]
status: active
repo: https://github.com/ragePolpette/llm_context
---

llm_context indexes source code and technical documents into a local vector store and exposes them through MCP tools such as context retrieval, semantic search and symbol search.

Every operation is scoped to an explicit project, so context doesn't leak across repositories. Ingest is incremental, so only changed files are reprocessed, and it is kept out of the always-on MCP surface.

It started on SQLite. When sustained indexing on a real codebase made an embedded store uncomfortable, I moved it to PostgreSQL with pgvector. That trades some portability for throughput, concurrency and multi-project growth.

In Exodia it is the right leg: semantic retrieval.

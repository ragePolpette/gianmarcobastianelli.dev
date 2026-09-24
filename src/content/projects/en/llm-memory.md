---
name: llm-memory
sephirah: chesed
role: primary
tagline: Persistent memory for agents over MCP, with two tiers, three scopes and a full audit trail.
problem: Agents are good with short-term context and bad at remembering anything across sessions. llm-memory gives them durable, governed memory they can search, promote and invalidate.
stack: [Python, SQLite, vector search, MCP]
status: active
repo: https://github.com/ragePolpette/llm-memory
---

I use it every day in real work. It is not a demo.

Memory lives in two tiers: **strong** memory for durable facts, decisions and conventions, and **fast** memory for episodic operational notes that can later be distilled and promoted. Retrieval composes three scopes: project, workspace and global.

Every write goes through a persistence policy, importance scoring and privacy controls, and leaves an audit trail. Records can be promoted, invalidated and deduplicated, and exported to or imported from JSONL and Markdown.

It runs locally, with no cloud service in the default setup. In Exodia it is the left leg: memory per ticket.

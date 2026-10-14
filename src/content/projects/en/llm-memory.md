---
name: 'llm-memory'
node: midRight
role: primary
kind: mcp
tagline: 'Persistent memory for agents over MCP: two tiers, three scopes, one audit trail.'
summary: 'persistent memory for agents'
problem: 'Agents handle short-term context well and forget everything between sessions.'
outcome: 'In daily use in my own work, and the per-ticket memory behind Exodia.'
stack: ['Python', 'SQLite', 'vector search', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm-memory
---

Memory lives in two tiers: strong memory for durable facts, decisions and conventions, and fast memory for episodic notes that can later be distilled and promoted. Retrieval composes three scopes: project, workspace and global.

Every write goes through a persistence policy, importance scoring and privacy controls, and leaves an audit trail. Records can be promoted, invalidated and deduplicated, and exported to or imported from JSONL and Markdown; an export only contains what the caller is allowed to read.

It runs locally, with no cloud service and outbound network blocked by default. Over HTTP, a bearer token is optional on loopback and required on any other address; the admin endpoints stay disabled until one is set.

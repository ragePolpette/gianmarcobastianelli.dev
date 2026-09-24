---
name: llm-sql-db-mcp
sephirah: gevurah
role: primary
tagline: Policy-driven MCP server for SQL Server, with guard rails and anonymization.
problem: Letting an agent "just run SQL" is an accident waiting to happen, especially anywhere near production.
stack: [Node.js, SQL Server, MCP]
status: active
repo: https://github.com/ragePolpette/llm-sql-db-mcp
---

Databases are declared in a target registry, and that registry, not the client, decides what is allowed. Each target has its own policy for reads, writes and anonymization.

Every query passes through lexical and structural SQL guard rails before execution. Production targets keep fences that cannot be bypassed. Sensitive fields can be masked, deterministically or with a provider, before results leave the server, and logs never carry raw SQL, parameters or row contents.

It supersedes the two earlier servers that split development and production databases into separate projects.

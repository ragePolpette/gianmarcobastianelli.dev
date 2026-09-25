---
name: 'llm-sql-db-mcp'
node: midLeft
role: primary
kind: mcp
tagline: 'Policy-driven MCP server for SQL Server, with guard rails and anonymization.'
summary: 'SQL for agents, behind guard rails'
problem: 'Letting an agent "just run SQL" is an accident waiting to happen, especially anywhere near production.'
outcome: 'Agents get useful database access without a path to unsafe writes, and one policy-driven server replaced two separate ones for development and production.'
stack: ['Node.js', 'SQL Server', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm-sql-db-mcp
---

Databases are declared in a target registry, and that registry, not the client, decides what is allowed: each target has its own policy for reads, writes and anonymization.

Every query passes lexical and structural guard rails before it runs. Production targets keep fences that cannot be bypassed, sensitive fields can be masked before results leave the server, and logs never carry raw SQL, parameters or rows.

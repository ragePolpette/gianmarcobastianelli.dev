---
name: 'llm-sql-db-mcp'
node: midLeft
role: primary
kind: mcp
tagline: 'Policy-driven MCP server for SQL Server, with a T-SQL guard, a production fence and anonymization.'
summary: 'SQL for agents, behind guard rails'
problem: 'Letting an agent "just run SQL" is an accident waiting to happen, especially anywhere near production.'
outcome: 'Agents get useful database access with no path to writes on production, and one policy-driven server replaced the two separate ones I used for development and production.'
stack: ['Node.js', 'SQL Server', 'MCP']
status: active
repo: https://github.com/ragePolpette/llm-sql-db-mcp
---

Databases are declared in a target registry, and that registry, not the client, decides what is allowed: each target has its own policy for reads, writes and anonymization.

Every query goes through a guard that tokenizes the T-SQL in a single pass, so quoting and comments cannot hide a second statement: a read is exactly one `SELECT`, a write exactly one `INSERT`, `UPDATE`, `DELETE` or `MERGE`. The production fence is in the code: a `prod` target is always read-only, whatever the registry or the environment variables say.

On targets that need it, results are anonymized before they leave the server. Columns are classified per target, and the verdicts go into a catalog that a person can review and correct. SQL Server error messages that could echo data values are redacted on those targets too. A shared access token is optional on loopback and required on any other address, and logs never carry raw SQL, parameters or rows.

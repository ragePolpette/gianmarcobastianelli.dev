---
name: mcp-dashboard
sephirah: hod
role: primary
tagline: A local control plane to run and observe a workstation MCP stack.
problem: Running several MCP servers locally means juggling processes, logs and secrets across a pile of terminals.
stack: [Python, FastAPI, JavaScript]
status: active
repo: https://github.com/ragePolpette/mcp-dashboard
---

From a single UI I can start, stop and restart each MCP service and see its pid, port, health and recent events. Logs from different services are normalized into one filterable stream.

Secrets are stored in a local vault and referenced as `vault://…`, so the UI never shows them in clear text once stored. The dashboard also manages the SQL target registry used by llm-sql-db-mcp, and has admin views for llm-memory: summary, audit, projects, fast-memory candidates and distillation runs.

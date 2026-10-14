---
name: 'mcp-dashboard'
node: lowerLeft
role: primary
kind: tooling
tagline: 'A local control plane to run, observe and configure a workstation MCP stack.'
summary: 'control plane for a local MCP stack'
problem: 'Running several MCP servers locally means juggling processes, logs and secrets across a pile of terminals.'
outcome: 'One place to run, watch and configure my local MCP stack, including the servers behind Exodia, without secrets ever shown in clear text.'
stack: ['Python', 'FastAPI', 'JavaScript']
status: active
repo: https://github.com/ragePolpette/mcp-dashboard
---

Each MCP service can be started, stopped and restarted from the UI, with its pid, port, health and recent events. Logs from different services are normalized into one filterable stream.

Secrets live in a local encrypted vault and services reference them as `vault://…`. The vault locks itself after a configurable idle time. The dashboard also keeps the registries of SQL targets for llm-sql-db-mcp and Bitbucket repositories for llm-bitbucket-mcp, and has admin views for llm-memory: audit, projects, fast-memory candidates and distillation runs.

By default it listens only on loopback and accepts only loopback host names in the `Host` header. Every request that changes state needs a CSRF marker header and a session token that is regenerated at each start.

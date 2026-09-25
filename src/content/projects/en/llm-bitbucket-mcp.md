---
name: 'llm-bitbucket-mcp'
node: lowerLeft
role: satellite
kind: mcp
tagline: 'A constrained MCP surface for Bitbucket Cloud pull requests and pipelines.'
summary: 'pull requests and pipelines for agents'
problem: 'Agents need to open and discuss pull requests and read why a pipeline failed, without getting an unrestricted git workstation.'
outcome: 'How Exodia opens pull requests and reads failed pipelines, with merges and approvals deliberately out of its reach.'
stack: ['Node.js', 'MCP (HTTP)', 'Bitbucket Cloud API']
status: active
repo: https://github.com/ragePolpette/llm-bitbucket-mcp
---

The server exposes a focused set of tools: find and inspect pull requests; read diffs, comments, commits, tasks and statuses; look up pipeline runs and extract the output of the failed step; create pull requests and comment on them.

It deliberately does nothing locally: no checkout, no commits, no merge or approval automation. Write tools can be restricted through an allowlist, sessions are bounded, and the API token is refused if it comes from a `.env` file.

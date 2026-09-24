---
name: llm-bitbucket-mcp
sephirah: hod
role: satellite
tagline: A constrained MCP surface for Bitbucket Cloud pull requests and pipelines.
problem: Agents need to open, inspect and discuss pull requests and read why a pipeline failed, without being handed a generic, unrestricted git workstation.
stack: [Node.js, MCP (HTTP), Bitbucket Cloud API]
status: active
repo: https://github.com/ragePolpette/llm-bitbucket-mcp
---

The server exposes a focused set of tools: find and inspect pull requests, read diffs, comments, commits, tasks and statuses, look up pipeline runs and extract the output of the failed step, create pull requests and comment on them.

What it deliberately does not do is just as important: no local checkout, no commits, no merge or approval automation. Remote Bitbucket actions belong here, local git workflow belongs elsewhere.

The guard rails include a write-tool allowlist, sessions bounded by TTL and capacity, and an API token that is refused if it is loaded from a `.env` file.

In Exodia it is the left arm: pull requests and pipelines.

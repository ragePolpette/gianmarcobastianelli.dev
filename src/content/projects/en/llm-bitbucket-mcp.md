---
name: 'llm-bitbucket-mcp'
node: lowerLeft
role: satellite
kind: mcp
tagline: 'A constrained MCP surface for Bitbucket Cloud pull requests and pipelines, across several repositories.'
summary: 'pull requests and pipelines for agents'
problem: 'Agents need to open and discuss pull requests, read why a pipeline failed and run one again, without getting an unrestricted git workstation.'
outcome: 'How Exodia opens pull requests and reads failed pipelines. Merges happen only through a confirmed two-step flow, and only on repositories that allow them.'
stack: ['Node.js', 'MCP (HTTP)', 'Bitbucket Cloud API']
status: active
repo: https://github.com/ragePolpette/llm-bitbucket-mcp
---

The server works on a list of approved repositories, chosen per tool call. It can find and inspect pull requests; read diffs, comments, commits, tasks and statuses; read pipeline step logs, failed or not; wait for a pipeline with a bounded timeout; start a pipeline on a branch; create pull requests and comment on them.

Merge and decline are off unless a repository enables them with its own flag. Even then, the first call only returns a summary and a single-use token: the agent has to show the summary, wait for an explicit yes from the user and call again with the token, which is bound to the session, the repository and the merge parameters.

It does nothing locally: no checkout, no commits. Review tools such as approvals are opt-in, and the API token is refused if it comes from a `.env` file.

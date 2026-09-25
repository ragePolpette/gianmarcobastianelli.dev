---
name: 'Exodia'
node: base
role: primary
kind: agent
tagline: 'Autonomous agent that takes a Jira ticket all the way to a pull request.'
summary: 'from Jira ticket to pull request'
problem: 'Most ticket-to-code demos collapse the job into one risky step: read a ticket, edit files, open a pull request.'
outcome: 'In production on a real enterprise codebase: tickets come out as reviewable pull requests, and doubts go back to Jira as questions instead of into the code as guesses. I presented it at a company quarterly business review.'
stack: ['Node.js', 'MCP', 'Jira', 'Bitbucket', 'provider-agnostic LLM runtime']
status: active
repo: https://github.com/ragePolpette/Exodia
components:
  - card: 'Head'
    label: 'Exodia'
    role: 'harness core'
  - card: 'Right arm'
    label: 'Atlassian MCP'
    role: 'Jira intake'
    external: true
  - card: 'Left arm'
    label: 'Bitbucket MCP'
    role: 'pull requests + pipelines'
    project: llm-bitbucket-mcp
  - card: 'Right leg'
    label: 'llm_context'
    role: 'semantic retrieval'
    project: llm-context
  - card: 'Left leg'
    label: 'llm-memory'
    role: 'per-ticket memory'
    project: llm-memory
---

Exodia splits the job into stages. It reads the ticket, maps it to the right repository, loads context and memory, proposes a change and audits it before anything is written. Then it implements the change in a controlled worktree, verifies the evidence and opens the pull request only if policy allows it.

It is assembled from five parts, named after the five cards of Exodia the Forbidden One: the harness is the head, four MCP servers are the limbs. When confidence is too low, it leaves a question on the ticket and parks the run; a later run picks up the answer and carries on. The check happens between runs, never as a blocking prompt.

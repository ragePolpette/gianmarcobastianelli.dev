---
name: Exodia
sephirah: malkuth
role: primary
tagline: Autonomous agent that takes a Jira ticket all the way to a pull request.
problem: Most ticket-to-code demos collapse the job into one risky step. Exodia splits it into stages, audits every proposal before writing a line, and stops to ask instead of improvising.
stack: [Node.js, MCP, Jira, Bitbucket, provider-agnostic LLM runtime]
status: active
repo: https://github.com/ragePolpette/Exodia
components:
  - card: Head
    label: Exodia
    role: harness core
  - card: Right arm
    label: Atlassian MCP
    role: Jira intake
    external: true
  - card: Left arm
    label: Bitbucket MCP
    role: pull requests + pipelines
    project: llm-bitbucket-mcp
  - card: Right leg
    label: llm_context
    role: semantic retrieval
    project: llm-context
  - card: Left leg
    label: llm-memory
    role: per-ticket memory
    project: llm-memory
---

Exodia reads a ticket, maps it to the right repository, loads context and memory, proposes an implementation, audits it, executes it inside a controlled worktree, verifies the result and opens the pull request only when policy allows it.

It is built from five parts, named after the five cards of Exodia the Forbidden One: the harness is the head, and four MCP servers are the limbs.

Verification is multi-agent: a separate pass audits the proposal before any write, and another checks the implementation evidence afterwards.

When confidence is too low, Exodia doesn't guess. It leaves a question as a comment on the ticket and parks the run. On a later run, if it finds an answer, it picks up from there. It is an asynchronous check between runs, not a synchronous block.

It runs in production and I presented it at a company quarterly business review.

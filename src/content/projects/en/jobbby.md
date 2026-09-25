---
name: 'Jobbby'
node: lowerRight
role: primary
kind: agent
tagline: 'Task-agnostic agent-graph engine, steered from Telegram.'
summary: 'agent graph, steered via Telegram'
problem: 'Long-running agent workflows need concurrency, human approval at the right points and a way to steer them from anywhere.'
outcome: 'Running end to end on its first use case, job search: postings are collected, normalized by an LLM and scored against a CV, and new sources go live only after human approval.'
stack: ['C#', '.NET', 'LLM', 'Telegram']
status: active
repo: https://github.com/ragePolpette/Jobbby
---

Jobbby is a graph engine for agents: nodes do the work, and the graph does not care what the task is. Several runs can go at the same time.

Discovery can propose new sources, but none is used until a human approves it. Steering is two-way over Telegram: the engine asks when it needs input, and it can be redirected from a phone.

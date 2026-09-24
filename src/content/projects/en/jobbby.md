---
name: Jobbby
sephirah: netzach
role: primary
tagline: Task-agnostic agent-graph engine. First use case, job search.
problem: Long-running agent workflows need concurrency, human approval at the right points, and a way to steer them from anywhere.
stack: [C#, .NET, LLM, Telegram]
status: active
repo: https://github.com/ragePolpette/Jobbby
---

Jobbby is a graph engine for agents: nodes do the work, and the graph doesn't care what the task is. Several runs can go at the same time.

New sources found during discovery are not used until a human approves them. Steering is bidirectional over Telegram: the engine asks when it needs input, and I can redirect it from my phone.

The first use case is job search. It collects job postings, normalizes them with an LLM, scores how well each one fits a CV and keeps a record of the outcomes.

---
name: 'memval-lab'
node: upperRight
role: primary
kind: research
tagline: 'Consolidating memory inside the model: real LoRA training, before-and-after evals, a promote-or-rollback gate.'
summary: 'memory consolidated into the weights'
problem: 'Can a small model learn from its own episodes without silently breaking what it already knew, and how would we notice if it did?'
outcome: 'The full loop works end to end: a LoRA update on Gemma 3 270M IT is trained, evaluated before and after, and promoted or rolled back automatically.'
stack: ['Python', 'PyTorch', 'Transformers', 'PEFT/LoRA', 'Gemma 3 270M IT']
status: research
repo: https://github.com/ragePolpette/intra-model-memval-lab
---

A verifier gate filters candidate lessons, and a replay buffer mixes new examples with anchors. The base model is evaluated, a LoRA adapter is trained, the model is evaluated again and the gate decides whether to promote the adapter or roll it back. Evaluations cover target, related and unrelated cases, so the gate catches both "didn't learn" and "learned it, but broke something else".

Answers are scored with a rubric: groups of required terms with alternatives, plus forbidden terms, so a paraphrase can still pass. It is keyword evidence, not semantic judgement. Every run writes an experiment manifest with package versions, git commit, model revision, configuration, seed and the pre and post metrics, so a result can be traced back to exactly what produced it.

**Next:** measuring feature drift inside the model with sparse autoencoders (Gemma Scope 2) as part of the gate. So far there is only a throwaway spike to load them on this model: the drift check itself is not implemented yet.

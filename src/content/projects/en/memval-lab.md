---
name: memval-lab
sephirah: binah
role: primary
tagline: Consolidating memory inside the model, with real LoRA training, before/after evals and a promote-or-rollback gate.
summary: memory consolidated into the weights
problem: Can a small model learn from its own episodes without silently breaking what it already knew? And how would we find out if it did?
stack: [Python, PyTorch, Transformers, PEFT/LoRA, Gemma 3 270M IT]
status: research
repo: https://github.com/ragePolpette/intra-model-memval-lab
---

The lab runs one full consolidation cycle end to end. A verifier gate filters candidate lessons. A replay buffer mixes new examples with anchors. The base model is evaluated, a LoRA adapter is trained on **Gemma 3 270M IT**, the model is evaluated again, and a gate decides whether to promote the update or roll it back.

Evaluations cover target, related and unrelated cases, so the gate catches both "didn't learn" and "learned it but broke something else". The scorer is deliberately simple for now; the point was to validate the loop first.

**Next:** measuring feature drift inside the model, using sparse autoencoders (Gemma Scope 2) and probes along directions in activation space, such as the refusal direction. None of this exists yet: it is the next step, not a feature.

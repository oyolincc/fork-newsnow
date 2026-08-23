---
name: confirm-requirements
description: Condenses a Q&A conversation into a high-density, zero-fluff implementation design plan, capturing all critical decisions and specs for engineering.
disable-model-invocation: true
---

Please review our entire conversation and generate a "Requirements Implementation Design Plan". This plan must act as strict guidance and constraints for engineering implementation (excluding specific code). A developer unfamiliar with this chat must be able to execute the implementation relying solely on this document without information loss.

Output strictly using the following structure:

1. **Requirements Information**:
   - Must strictly contain two sub-sections: "Background" and "Objectives".
   - Use concise bullet points. No paragraph-level storytelling.
2. **Design Decisions**:
   - Must begin exactly with: "I confirmed a total of X questions with you, of which Y have conclusions, and Z are pending items."
   - List all Q&A conclusions. _Strict rule: Do not over-summarize. Preserve all critical details that affect decision-making._
3. **Design Specifications**: Structured breakdown of essential implementation prerequisites (e.g., API contracts, code organization, data types/structures).
4. **Notes**: Critical warnings, special considerations, and pending TODOs.

**Format & Tone Constraints:**

- Use objective, high-density, declarative statements.
- Absolutely NO fluff, filler, clichés, or subjective descriptions.
- Use Markdown tables, matrices, and numbered lists heavily to compress complex or multi-scenario information, minimizing token usage while maximizing readability.
- Handling Images/Diagrams: Transcribe all structural, visual, or architectural logic from user-uploaded images into explicit text format (e.g., field tables, layout specs, flow descriptions). Never use vague references like "as shown in the image"—fully represent the image's core information in Markdown.

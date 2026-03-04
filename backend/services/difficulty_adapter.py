def build_prompt(question, difficulty, context=""):
    if difficulty == "beginner":
        style = "Explain in simple terms, avoid jargon, use analogies and step-by-step examples."
    elif difficulty == "intermediate":
        style = "Use technical terms with short definitions. Assume basic programming knowledge."
    else:
        style = "Provide precise and detailed technical explanation assuming strong background knowledge."

    return f"""
You are an AI Learning Assistant focused only on AI/ML and programming topics.

Context:
{context}

User Question:
{question}

Instruction:
{style}

Also:
- Include examples
- If uncertain, mention it
- If harmful request, refuse
"""
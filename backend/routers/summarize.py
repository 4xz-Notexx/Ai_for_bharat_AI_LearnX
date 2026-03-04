from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.ai_engine import call_llm
from services.context_manager import (
    add_context,
    get_session,
    create_session,
)

router = APIRouter()

class SummaryRequest(BaseModel):
    user_id: str
    content: str
    difficulty: str


@router.post("/summarize")
def summarize(req: SummaryRequest):

    # Validate input length (Requirement 6.3 alignment)
    if not req.content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty")

    if len(req.content) > 20000:
        raise HTTPException(status_code=400, detail="Content too large")

    # Ensure session exists
    session = get_session(req.user_id)
    if not session:
        session = create_session(req.user_id)

    # Add content to session context (Requirement 8.1)
    add_context(req.user_id, req.content)

    # Build context text
    context_text = "\n".join(session["context"])

    prompt = f"""
You are an AI Learning Assistant specialized in AI/ML and programming topics.

TASK:
Generate a structured summary of the provided content.

Rules:
- Summary must be approximately 20-30% of original length.
- Preserve logical flow and key concepts.
- Replace code blocks with explanation of what the code does.
- Adjust explanation complexity to {req.difficulty}.
- If uncertain, indicate uncertainty.
- Stay within AI/ML and programming domain only.

Context from previous session:
{context_text}

New Content:
{req.content}
"""

    try:
        response = call_llm(prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail="AI processing failed")

    return {
        "success": True,
        "difficulty": req.difficulty,
        "original_length": len(req.content),
        "summary": response
    }
from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_engine import call_llm
from services.difficulty_adapter import build_prompt
from services.context_manager import get_session, create_session, add_context

router = APIRouter()

class AskRequest(BaseModel):
    user_id: str
    question: str
    difficulty: str

@router.post("/ask")
def ask(req: AskRequest):

    session = get_session(req.user_id)
    if not session:
        session = create_session(req.user_id)

    session["difficulty"] = req.difficulty

    context_text = "\n".join(session["context"])
    prompt = build_prompt(req.question, req.difficulty, context_text)

    try:
        response = call_llm(prompt)
    except Exception as e:
        print("LLM Error:", e)

        # 🔥 Demo fallback response
        response = f"""
Demo Mode Response:

Your question: {req.question}

This is a temporary response because the AI service
has reached its daily token limit.

In production, this would be generated dynamically
using Amazon Bedrock.
"""

    add_context(req.user_id, req.question)

    return {
        "success": True,
        "difficulty": req.difficulty,
        "response": response
    }
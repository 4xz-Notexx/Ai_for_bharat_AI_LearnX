from fastapi import APIRouter
from pydantic import BaseModel
from services.ai_engine import call_llm
import json

router = APIRouter()

class QuizRequest(BaseModel):
    content: str
    difficulty: str

@router.post("/quiz")
def generate_quiz(req: QuizRequest):

    prompt = f"""
Generate 5 quiz questions from this content.
Return strictly in JSON format:

[
  {{
    "id": "1",
    "type": "multiple-choice",
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A",
    "explanation": "Why correct"
  }}
]

Adjust difficulty to {req.difficulty}.

Content:
{req.content}
"""

    response = call_llm(prompt)

    try:
        quiz_data = json.loads(response)
    except:
        return {"success": False, "error": "Invalid AI response"}

    return {
        "success": True,
        "quiz": quiz_data
    }
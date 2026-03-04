from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.context_manager import clear_session

router = APIRouter()

class ClearSessionRequest(BaseModel):
    user_id: str


@router.post("/clear-session")
def clear_user_session(req: ClearSessionRequest):

    cleared = clear_session(req.user_id)

    return {
        "success": True,
        "message": "Session cleared successfully.",
        "cleared": cleared
    }
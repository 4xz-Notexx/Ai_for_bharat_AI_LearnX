from fastapi import APIRouter, UploadFile, File
from services.pdf_parser import extract_text
from services.context_manager import add_context, create_session, get_session

router = APIRouter()

@router.post("/upload-pdf")
async def upload_pdf(user_id: str, file: UploadFile = File(...)):

    content = await file.read()
    text = extract_text(content)

    session = get_session(user_id)
    if not session:
        create_session(user_id)

    add_context(user_id, text)

    return {
        "success": True,
        "content_length": len(text)
    }
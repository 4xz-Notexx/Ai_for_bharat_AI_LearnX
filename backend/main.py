from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from routers.ask import router as ask_router
from routers.upload import router as upload_router
from routers.summarize import router as summarize_router
from routers.quiz import router as quiz_router
from routers.session import router as session_router

# Create app FIRST
app = FastAPI(title="AI LearnX Backend")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# THEN include routers
app.include_router(ask_router)
app.include_router(upload_router)
app.include_router(summarize_router)
app.include_router(quiz_router)
app.include_router(session_router)


@app.get("/")
def health():
    return {"status": "AI LearnX Backend Running 🚀"}
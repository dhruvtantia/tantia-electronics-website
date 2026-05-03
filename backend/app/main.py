from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import enquiries, health
from app.config import get_settings

settings = get_settings()

app = FastAPI(title="Tantia Electronics Co. API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(enquiries.router, prefix="/api/enquiries", tags=["enquiries"])


@app.get("/api/")
async def api_root():
    return {"success": True, "message": "Tantia Electronics Co. API"}

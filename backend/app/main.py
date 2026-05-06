from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import enquiries, health
from app.config import get_settings
from app.core.errors import ConfigurationError

settings = get_settings()

app = FastAPI(title="Tantia Electronics Co. API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ConfigurationError)
async def configuration_error_handler(request: Request, exc: ConfigurationError):
    return JSONResponse(
        status_code=503,
        content={"success": False, "message": str(exc)},
    )

app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(enquiries.router, prefix="/api/enquiries", tags=["enquiries"])


@app.get("/api/")
async def api_root():
    return {"success": True, "message": "Tantia Electronics Co. API"}

from datetime import UTC, datetime
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check():
    return {
        "success": True,
        "status": "healthy",
        "timestamp": datetime.now(UTC).isoformat(),
    }

from datetime import UTC, datetime
from uuid import uuid4
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import get_settings
from app.repositories.enquiry_repository import EnquiryRepository
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse


class MongoEnquiryRepository(EnquiryRepository):
    def __init__(self):
        settings = get_settings()
        if not settings.mongodb_uri:
            raise RuntimeError("MONGODB_URI is required when ENQUIRY_STORAGE_PROVIDER=mongodb")
        self.client = AsyncIOMotorClient(settings.mongodb_uri)
        self.collection = self.client[settings.mongodb_database]["enquiries"]

    async def create(self, payload: EnquiryCreate) -> EnquiryResponse:
        now = datetime.now(UTC)
        document = {
            "id": str(uuid4()),
            **payload.model_dump(),
            "status": "new",
            "createdAt": now,
            "updatedAt": now,
        }
        await self.collection.insert_one(document)
        return self._to_response(document)

    async def list(self) -> list[EnquiryResponse]:
        cursor = self.collection.find({}, {"_id": 0}).sort("createdAt", -1)
        return [self._to_response(document) async for document in cursor]

    async def get_by_id(self, enquiry_id: str) -> EnquiryResponse | None:
        document = await self.collection.find_one({"id": enquiry_id}, {"_id": 0})
        return self._to_response(document) if document else None

    def _to_response(self, document: dict) -> EnquiryResponse:
        document.pop("_id", None)
        return EnquiryResponse(**document)

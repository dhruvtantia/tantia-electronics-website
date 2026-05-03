from functools import lru_cache

from app.config import get_settings
from app.repositories.enquiry_repository import EnquiryRepository
from app.repositories.mongo_enquiry_repository import MongoEnquiryRepository
from app.repositories.sheets_enquiry_repository import GoogleSheetsEnquiryRepository
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse


class EnquiryService:
    def __init__(self, repository: EnquiryRepository):
        self.repository = repository

    async def create_enquiry(self, payload: EnquiryCreate) -> EnquiryResponse:
        return await self.repository.create(payload)

    async def list_enquiries(self) -> list[EnquiryResponse]:
        return await self.repository.list()

    async def get_enquiry(self, enquiry_id: str) -> EnquiryResponse | None:
        return await self.repository.get_by_id(enquiry_id)


@lru_cache
def get_enquiry_repository() -> EnquiryRepository:
    provider = get_settings().enquiry_storage_provider.lower()
    if provider == "mongodb":
        return MongoEnquiryRepository()
    if provider == "google_sheets":
        return GoogleSheetsEnquiryRepository()
    raise RuntimeError(f"Unsupported ENQUIRY_STORAGE_PROVIDER: {provider}")


def get_enquiry_service() -> EnquiryService:
    return EnquiryService(get_enquiry_repository())

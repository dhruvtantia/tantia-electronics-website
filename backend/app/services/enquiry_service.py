from functools import lru_cache
import logging

from app.config import get_settings
from app.core.errors import ConfigurationError
from app.repositories.enquiry_repository import EnquiryRepository
from app.services.notification_service import NotificationService, get_notification_service
from app.repositories.sheets_enquiry_repository import GoogleSheetsEnquiryRepository
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse

logger = logging.getLogger(__name__)


class EnquiryService:
    def __init__(self, repository: EnquiryRepository, notification_service: NotificationService):
        self.repository = repository
        self.notification_service = notification_service

    async def create_enquiry(self, payload: EnquiryCreate) -> EnquiryResponse:
        enquiry = await self.repository.create(payload)
        logger.info("Lead created with enquiry id %s", enquiry.id)
        await self.notification_service.notify_new_enquiry(enquiry)
        return enquiry

    async def list_enquiries(self) -> list[EnquiryResponse]:
        return await self.repository.list()

    async def get_enquiry(self, enquiry_id: str) -> EnquiryResponse | None:
        return await self.repository.get_by_id(enquiry_id)


@lru_cache
def get_enquiry_repository() -> EnquiryRepository:
    provider = get_settings().enquiry_storage_provider.lower()
    if provider == "google_sheets":
        return GoogleSheetsEnquiryRepository()
    raise ConfigurationError(f"Unsupported ENQUIRY_STORAGE_PROVIDER: {provider}")


def get_enquiry_service() -> EnquiryService:
    return EnquiryService(get_enquiry_repository(), get_notification_service())

from datetime import UTC, datetime
import logging
from uuid import uuid4
import anyio

from app.core.errors import ConfigurationError, StorageError
from app.integrations.google_sheets import GoogleSheetsClient
from app.repositories.enquiry_repository import EnquiryRepository
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse

logger = logging.getLogger(__name__)


SHEET_HEADERS = [
    "id",
    "createdAt",
    "updatedAt",
    "status",
    "type",
    "relatedBrand",
    "relatedCategory",
    "fullName",
    "company",
    "email",
    "phone",
    "message",
    "sourcePage",
    "visitorId",
    "sessionId",
    "landingPage",
    "referrer",
    "utmSource",
    "utmMedium",
    "utmCampaign",
    "utmTerm",
    "utmContent",
    "journeySummary",
]


class GoogleSheetsEnquiryRepository(EnquiryRepository):
    def __init__(self):
        self._client: GoogleSheetsClient | None = None

    @property
    def client(self) -> GoogleSheetsClient:
        if self._client is None:
            self._client = GoogleSheetsClient()
        return self._client

    async def create(self, payload: EnquiryCreate) -> EnquiryResponse:
        now = datetime.now(UTC)
        enquiry = EnquiryResponse(
            id=str(uuid4()),
            type=payload.type,
            relatedBrand=payload.relatedBrand,
            relatedCategory=payload.relatedCategory,
            fullName=payload.fullName,
            company=payload.company,
            email=payload.email,
            phone=payload.phone,
            message=payload.message,
            sourcePage=payload.sourcePage,
            visitorId=payload.visitorId,
            sessionId=payload.sessionId,
            landingPage=payload.landingPage,
            referrer=payload.referrer,
            utmSource=payload.utmSource,
            utmMedium=payload.utmMedium,
            utmCampaign=payload.utmCampaign,
            utmTerm=payload.utmTerm,
            utmContent=payload.utmContent,
            journeySummary=payload.journeySummary,
            status="new",
            createdAt=now,
            updatedAt=now,
        )
        logger.info("Appending enquiry %s to Google Sheets", enquiry.id)
        try:
            await anyio.to_thread.run_sync(self._append_enquiry, enquiry)
        except ConfigurationError:
            raise
        except Exception as exc:
            logger.exception("Google Sheets append failed for enquiry %s", enquiry.id)
            raise StorageError("Unable to save your enquiry right now. Please try again shortly.") from exc
        logger.info("Google Sheets append succeeded for enquiry %s", enquiry.id)
        return enquiry

    async def list(self) -> list[EnquiryResponse]:
        raise NotImplementedError("Public enquiry reads are disabled for MVP.")

    async def get_by_id(self, enquiry_id: str) -> EnquiryResponse | None:
        raise NotImplementedError("Public enquiry reads are disabled for MVP.")

    def _append_enquiry(self, enquiry: EnquiryResponse) -> None:
        self.client.ensure_headers(SHEET_HEADERS)
        self.client.append_row([
            enquiry.id,
            enquiry.createdAt.isoformat(),
            enquiry.updatedAt.isoformat(),
            enquiry.status,
            enquiry.type,
            enquiry.relatedBrand or "",
            enquiry.relatedCategory or "",
            enquiry.fullName,
            enquiry.company or "",
            str(enquiry.email) if enquiry.email else "",
            enquiry.phone or "",
            enquiry.message,
            enquiry.sourcePage or "",
            enquiry.visitorId or "",
            enquiry.sessionId or "",
            enquiry.landingPage or "",
            enquiry.referrer or "",
            enquiry.utmSource or "",
            enquiry.utmMedium or "",
            enquiry.utmCampaign or "",
            enquiry.utmTerm or "",
            enquiry.utmContent or "",
            enquiry.journeySummary or "",
        ])

from app.repositories.enquiry_repository import EnquiryRepository
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse


class GoogleSheetsEnquiryRepository(EnquiryRepository):
    async def create(self, payload: EnquiryCreate) -> EnquiryResponse:
        raise NotImplementedError("Google Sheets storage is planned for a future phase.")

    async def list(self) -> list[EnquiryResponse]:
        raise NotImplementedError("Google Sheets storage is planned for a future phase.")

    async def get_by_id(self, enquiry_id: str) -> EnquiryResponse | None:
        raise NotImplementedError("Google Sheets storage is planned for a future phase.")

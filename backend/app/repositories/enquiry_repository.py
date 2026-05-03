from abc import ABC, abstractmethod
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse


class EnquiryRepository(ABC):
    @abstractmethod
    async def create(self, payload: EnquiryCreate) -> EnquiryResponse:
        raise NotImplementedError

    @abstractmethod
    async def list(self) -> list[EnquiryResponse]:
        raise NotImplementedError

    @abstractmethod
    async def get_by_id(self, enquiry_id: str) -> EnquiryResponse | None:
        raise NotImplementedError

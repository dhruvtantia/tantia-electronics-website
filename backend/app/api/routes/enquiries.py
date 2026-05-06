from fastapi import APIRouter, Depends, status

from app.schemas.enquiry import EnquiryCreate, EnquirySuccessResponse
from app.services.enquiry_service import EnquiryService, get_enquiry_service

router = APIRouter()


@router.post("", response_model=EnquirySuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_enquiry(payload: EnquiryCreate, service: EnquiryService = Depends(get_enquiry_service)):
    enquiry = await service.create_enquiry(payload)
    return {
        "success": True,
        "data": enquiry,
        "message": "Thank you. Your enquiry has been sent. We will get back to you shortly.",
    }

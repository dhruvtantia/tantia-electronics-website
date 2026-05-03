from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas.enquiry import EnquiryCreate, EnquiryListResponse, EnquiryResponse, EnquirySuccessResponse
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


@router.get("", response_model=EnquiryListResponse)
async def list_enquiries(service: EnquiryService = Depends(get_enquiry_service)):
    enquiries = await service.list_enquiries()
    return {"success": True, "data": enquiries}


@router.get("/{enquiry_id}", response_model=EnquirySuccessResponse)
async def get_enquiry(enquiry_id: str, service: EnquiryService = Depends(get_enquiry_service)):
    enquiry = await service.get_enquiry(enquiry_id)
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"success": True, "data": enquiry, "message": "Enquiry found."}

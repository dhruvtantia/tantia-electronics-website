from datetime import datetime
from typing import Literal
from pydantic import BaseModel, EmailStr, Field

EnquiryType = Literal["brand", "category", "general", "quote"]
EnquiryStatus = Literal["new", "contacted", "closed"]


class EnquiryCreate(BaseModel):
    type: EnquiryType = "general"
    relatedBrand: str | None = None
    relatedCategory: str | None = None
    fullName: str = Field(..., min_length=1, max_length=120)
    company: str | None = Field(default=None, max_length=160)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=40)
    message: str = Field(..., min_length=1, max_length=3000)
    sourcePage: str | None = Field(default=None, max_length=300)


class EnquiryResponse(BaseModel):
    id: str
    type: EnquiryType
    relatedBrand: str | None = None
    relatedCategory: str | None = None
    fullName: str
    company: str | None = None
    email: EmailStr
    phone: str
    message: str
    sourcePage: str | None = None
    status: EnquiryStatus = "new"
    createdAt: datetime
    updatedAt: datetime


class EnquirySuccessResponse(BaseModel):
    success: bool
    data: EnquiryResponse
    message: str


class EnquiryListResponse(BaseModel):
    success: bool
    data: list[EnquiryResponse]

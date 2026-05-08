from datetime import datetime
from typing import Literal
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator

EnquiryType = Literal["brand", "category", "general", "quote"]
EnquiryStatus = Literal["new", "contacted", "closed"]


def normalize_indian_phone(value: str) -> str:
    digits = "".join(character for character in str(value) if character.isdigit())
    if len(digits) == 12 and digits.startswith("91"):
        digits = digits[2:]
    if len(digits) == 11 and digits.startswith("0"):
        digits = digits[1:]
    if len(digits) != 10:
        raise ValueError("Phone must be a valid 10-digit Indian mobile or landline number")
    return digits


class EnquiryCreate(BaseModel):
    type: EnquiryType = "general"
    relatedBrand: str | None = None
    relatedCategory: str | None = None
    fullName: str = Field(..., min_length=1, max_length=120)
    company: str | None = Field(default=None, max_length=160)
    email: EmailStr | None = None
    phone: str | None = Field(default=None, min_length=10, max_length=20)
    message: str = Field(..., min_length=1, max_length=3000)
    sourcePage: str | None = Field(default=None, max_length=300)
    visitorId: str | None = Field(default=None, max_length=120)
    sessionId: str | None = Field(default=None, max_length=120)
    landingPage: str | None = Field(default=None, max_length=300)
    referrer: str | None = Field(default=None, max_length=500)
    utmSource: str | None = Field(default=None, max_length=120)
    utmMedium: str | None = Field(default=None, max_length=120)
    utmCampaign: str | None = Field(default=None, max_length=160)
    utmTerm: str | None = Field(default=None, max_length=160)
    utmContent: str | None = Field(default=None, max_length=160)
    journeySummary: str | None = Field(default=None, max_length=2200)

    @field_validator("email", mode="before")
    @classmethod
    def normalize_optional_email(cls, value: str | None) -> str | None:
        if value is None or str(value).strip() == "":
            return None
        return str(value).strip()

    @field_validator("phone", mode="before")
    @classmethod
    def validate_phone(cls, value: str | None) -> str | None:
        if value is None or str(value).strip() == "":
            return None
        return normalize_indian_phone(value)

    @field_validator("fullName", "message", mode="before")
    @classmethod
    def strip_required_text(cls, value: str | None) -> str:
        if value is None:
            return ""
        return str(value).strip()

    @model_validator(mode="after")
    def validate_contact_method(self):
        if not self.email and not self.phone:
            raise ValueError("Please provide either a phone number or an email address")
        return self


class EnquiryResponse(BaseModel):
    id: str
    type: EnquiryType
    relatedBrand: str | None = None
    relatedCategory: str | None = None
    fullName: str
    company: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    message: str
    sourcePage: str | None = None
    visitorId: str | None = None
    sessionId: str | None = None
    landingPage: str | None = None
    referrer: str | None = None
    utmSource: str | None = None
    utmMedium: str | None = None
    utmCampaign: str | None = None
    utmTerm: str | None = None
    utmContent: str | None = None
    journeySummary: str | None = None
    status: EnquiryStatus = "new"
    createdAt: datetime
    updatedAt: datetime


class EnquirySuccessResponse(BaseModel):
    success: bool
    data: EnquiryResponse
    message: str

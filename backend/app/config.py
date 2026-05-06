from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    enquiry_storage_provider: str = "google_sheets"
    mongodb_uri: str = ""
    mongodb_database: str = "tantia_electronics"
    google_sheets_spreadsheet_id: str = ""
    google_sheets_worksheet_name: str = "Enquiries"
    google_service_account_json: str = ""
    cors_origins: str = "https://tantiaelectronics.com"
    resend_api_key: str = ""
    email_from: str = "Tantia Electronics Co. <enquiries@tantiaelectronics.com>"
    enquiry_notification_to: str = "tantia442@gmail.com"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()

import html
import logging
from functools import lru_cache

import anyio

from app.integrations.email import EmailClient
from app.schemas.enquiry import EnquiryResponse

logger = logging.getLogger(__name__)


class NotificationService:
    def __init__(self, email_client: EmailClient | None = None):
        self.email_client = email_client or EmailClient()

    async def notify_new_enquiry(self, enquiry: EnquiryResponse) -> bool:
        subject = f"New website enquiry: {enquiry.fullName}"
        text = self._build_text(enquiry)
        html_body = self._build_html(enquiry)
        try:
            return await anyio.to_thread.run_sync(self.email_client.send_email, subject, text, html_body)
        except Exception:
            logger.exception("Failed to send enquiry notification email")
            return False

    def _build_text(self, enquiry: EnquiryResponse) -> str:
        rows = self._rows(enquiry)
        return "\n".join(f"{label}: {value}" for label, value in rows)

    def _build_html(self, enquiry: EnquiryResponse) -> str:
        rows = self._rows(enquiry)
        table_rows = "".join(
            f"<tr><th align='left' style='padding:8px;border-bottom:1px solid #e5e7eb'>{html.escape(label)}</th><td style='padding:8px;border-bottom:1px solid #e5e7eb'>{html.escape(str(value))}</td></tr>"
            for label, value in rows
        )
        return f"<h2>New website enquiry</h2><table cellspacing='0' cellpadding='0'>{table_rows}</table>"

    def _rows(self, enquiry: EnquiryResponse) -> list[tuple[str, str]]:
        return [
            ("Name", enquiry.fullName),
            ("Company", enquiry.company or "-"),
            ("Email", str(enquiry.email)),
            ("Phone", enquiry.phone),
            ("Type", enquiry.type),
            ("Related brand", enquiry.relatedBrand or "-"),
            ("Related category", enquiry.relatedCategory or "-"),
            ("Source page", enquiry.sourcePage or "-"),
            ("Landing page", enquiry.landingPage or "-"),
            ("Referrer", enquiry.referrer or "-"),
            ("UTM source", enquiry.utmSource or "-"),
            ("UTM medium", enquiry.utmMedium or "-"),
            ("UTM campaign", enquiry.utmCampaign or "-"),
            ("Visitor ID", enquiry.visitorId or "-"),
            ("Session ID", enquiry.sessionId or "-"),
            ("Created at", enquiry.createdAt.isoformat()),
            ("Journey", enquiry.journeySummary or "-"),
            ("Message", enquiry.message),
        ]


@lru_cache
def get_notification_service() -> NotificationService:
    return NotificationService()

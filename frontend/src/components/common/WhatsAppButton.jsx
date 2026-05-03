import { MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../../services/whatsapp";
import { trackWhatsAppClick } from "../../services/analytics";

export default function WhatsAppButton({ message, children = "Send WhatsApp Enquiry", context, className = "" }) {
  return (
    <a
      href={createWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsAppClick(context)}
      className={`inline-flex items-center justify-center gap-2 border border-green-600 bg-green-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-green-700 ${className}`}
    >
      <MessageCircle size={17} aria-hidden="true" />
      {children}
    </a>
  );
}

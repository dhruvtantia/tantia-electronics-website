import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { trackCatalogueRequest } from "../../services/analytics";

export default function CatalogueRequestButton({
  to,
  label = "Request Catalogue",
  context,
  variant = "light",
  className = "",
}) {
  const variants = {
    light: "border-border bg-white text-navy hover:border-brandRed",
    dark: "border-yellow bg-transparent text-yellow hover:bg-yellow hover:text-navy",
  };

  return (
    <Link
      to={to}
      onClick={() => trackCatalogueRequest(context)}
      className={`inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-bold uppercase tracking-wide transition ${variants[variant]} ${className}`}
    >
      <FileText size={16} aria-hidden="true" />
      {label}
    </Link>
  );
}

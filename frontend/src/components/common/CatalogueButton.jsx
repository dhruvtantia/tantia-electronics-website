import { Download } from "lucide-react";
import { trackCatalogueDownload } from "../../services/analytics";

export default function CatalogueButton({ href = "/placeholder-catalogue.pdf", label = "Download Catalogue", context }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackCatalogueDownload(context)}
      className="inline-flex items-center justify-center gap-2 border border-border bg-white px-4 py-3 text-sm font-bold uppercase tracking-wide text-navy transition hover:border-brandRed"
    >
      <Download size={16} aria-hidden="true" />
      {label}
    </a>
  );
}

import { SITE } from "../../config/site";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.businessName,
    url: SITE.domain,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    address: SITE.address,
    openingHours: "Mo-Sa 10:00-19:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

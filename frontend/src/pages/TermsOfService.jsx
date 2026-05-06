import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import { SITE } from "../config/site";

export default function TermsOfService() {
  return (
    <>
      <SEO title={`Terms of Service ${SITE.businessName}`} description={`Terms for using the ${SITE.businessName} B2B catalogue and enquiry website.`} />
      <PageHero eyebrow="Terms" title="Terms of Service" body="Terms for using this B2B catalogue and enquiry website." />
      <LegalSection>
        <h2>Website Purpose</h2>
        <p>This website is an informational B2B catalogue and enquiry channel for {SITE.businessName}. It does not provide e-commerce checkout, customer accounts, online payment, or binding online pricing.</p>
        <h2>Enquiries And Quotations</h2>
        <p>Submitting an enquiry does not create a confirmed order or binding quotation. Product availability, technical suitability, commercial terms and final quotations are confirmed separately by our team.</p>
        <h2>Product And Brand Information</h2>
        <p>Brand names, logos, catalogue references and product descriptions belong to their respective owners. Draft brand catalogue content should be verified against current manufacturer or supplier material before procurement decisions.</p>
        <h2>No Pricing Commitment</h2>
        <p>The website intentionally does not display prices. Any commercial offer must be confirmed directly by {SITE.businessName} through an official communication channel.</p>
        <h2>Acceptable Use</h2>
        <p>Do not misuse forms, submit fraudulent enquiries, scrape the website at scale, or attempt unauthorized access to website systems.</p>
        <h2>Contact</h2>
        <p>For questions about these terms, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </LegalSection>
    </>
  );
}

function LegalSection({ children }) {
  return <section className="bg-white py-16"><div className="legal-content mx-auto max-w-4xl px-6 text-mutedText md:px-10">{children}</div></section>;
}

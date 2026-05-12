import SEO from "../components/common/SEO";
import PageHero from "../components/common/PageHero";
import { SITE } from "../config/site";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title={`Privacy Policy ${SITE.businessName}`} description={`How ${SITE.businessName} handles enquiries, contact details and website analytics.`} />
      <PageHero eyebrow="Privacy" title="Privacy Policy" body="How we collect, use and protect enquiry and website activity information." />
      <LegalSection>
        <h2>Information We Collect</h2>
        <p>When you submit an enquiry, we collect the details you provide, including name, company, email, phone number, message, enquiry type, related brand or category, and source page.</p>
        <p>We may also collect basic website journey information such as pages visited, time on page, landing page, referrer, campaign parameters and device/browser data. This helps us understand which products or brands are relevant to your enquiry.</p>
        <h2>How We Use Information</h2>
        <p>We use enquiry information to respond to product, catalogue, availability and quotation requests. We use journey information to improve the website, understand lead context, and reduce irrelevant or fraudulent submissions.</p>
        <h2>Storage And Processors</h2>
        <p>Enquiries may be sent by email to {SITE.email} and stored in a lead backup such as Google Sheets. If analytics tools such as Google Analytics or Microsoft Clarity are enabled, their use will be limited to website analytics, lead attribution and user experience improvement.</p>
        <h2>Cookies And Local Storage</h2>
        <p>The website may use first-party local storage or session storage to maintain a visitor/session identifier and a short page-visit summary. Non-essential third-party analytics or session replay should only be enabled with the required consent controls.</p>
        <h2>Data Retention</h2>
        <p>Business enquiry records are retained for sales follow-up, service history and audit purposes unless deletion is requested and legally permissible.</p>
        <h2>Contact</h2>
        <p>For privacy questions or data requests, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </LegalSection>
    </>
  );
}

function LegalSection({ children }) {
  return <section className="bg-white py-16"><div className="legal-content mx-auto max-w-4xl px-6 text-mutedText md:px-10">{children}</div></section>;
}

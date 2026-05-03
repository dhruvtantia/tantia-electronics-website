import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import SEO from "../components/common/SEO";
import { SEO as SEO_CONFIG } from "../config/seo";

export default function NotFound() {
  return (
    <section className="bg-offWhite py-24">
      <SEO {...SEO_CONFIG.notFound} />
      <div className="mx-auto max-w-4xl px-6">
        <EmptyState title="Page not found" body="The page you requested does not exist." />
        <Link to="/" className="mt-6 inline-block font-bold text-brandRed">Back to home</Link>
      </div>
    </section>
  );
}

import CatalogueRequestButton from "../common/CatalogueRequestButton";
import WhatsAppButton from "../common/WhatsAppButton";

export default function BrandCatalogueCTA({ brand }) {
  return (
    <section className="bg-navy p-8 text-white">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow">Catalogue</p>
      <h2 className="mt-3 text-3xl font-black">Need the {brand.name} catalogue?</h2>
      <p className="mt-3 text-slate-300">Request the latest catalogue, availability and suitable product options from our team.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CatalogueRequestButton to={`/brands/${brand.slug}#enquiry`} context={`${brand.slug}-cta`} variant="dark" />
        <WhatsAppButton message={`Please share the latest ${brand.name} catalogue.`} context={`${brand.slug}-catalogue`} />
      </div>
    </section>
  );
}

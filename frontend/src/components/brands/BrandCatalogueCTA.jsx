import CatalogueButton from "../common/CatalogueButton";
import WhatsAppButton from "../common/WhatsAppButton";

export default function BrandCatalogueCTA({ brand }) {
  return (
    <section className="bg-navy p-8 text-white">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow">Catalogue</p>
      <h2 className="mt-3 text-3xl font-black">Need the {brand.name} catalogue?</h2>
      <p className="mt-3 text-slate-300">Download the placeholder PDF now or request the latest catalogue over WhatsApp.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <CatalogueButton href={brand.catalogueUrl} context={`${brand.slug}-cta`} />
        <WhatsAppButton message={`Please share the latest ${brand.name} catalogue.`} context={`${brand.slug}-catalogue`} />
      </div>
    </section>
  );
}

import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import CategoryGrid from "../components/home/CategoryGrid";
import { SEO as SEO_CONFIG } from "../config/seo";
import { categories } from "../data/seedCategories";

export default function Products() {
  return (
    <>
      <SEO {...SEO_CONFIG.products} />
      <section className="bg-offWhite py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <SectionHeader
            eyebrow="Product Categories"
            title="Browse by category."
            body="Find wires, switches, fuses, circuit breakers, connectors, precision components and industrial electrical goods supplied through Tantia Electronics Co."
          />
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <CategoryGrid categories={categories} />
        </div>
      </section>
    </>
  );
}

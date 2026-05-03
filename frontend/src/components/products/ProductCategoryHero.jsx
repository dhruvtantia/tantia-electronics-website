import { ASSETS } from "../../config/assets";
import CatalogueButton from "../common/CatalogueButton";
import SectionLabel from "../common/SectionLabel";
import WhatsAppButton from "../common/WhatsAppButton";

export default function ProductCategoryHero({ category }) {
  return (
    <section className="bg-offWhite py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
        <div>
          <SectionLabel>Category</SectionLabel>
          <h1 className="mt-3 text-4xl font-black text-navy md:text-6xl">{category.name}</h1>
          <p className="mt-5 text-lg leading-8 text-mutedText">{category.longDescription}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppButton message={`I am interested in ${category.name}. Please share availability and catalogue details.`} context={category.slug} />
            <CatalogueButton href={category.catalogueUrl} context={category.slug} />
          </div>
        </div>
        <img src={category.imageUrl || ASSETS.productPlaceholder} alt={`${category.name} products`} className="h-full min-h-80 w-full object-cover" />
      </div>
    </section>
  );
}

import { useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import SectionHeader from "../components/common/SectionHeader";
import CatalogueButton from "../components/common/CatalogueButton";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ProductCategoryHero from "../components/products/ProductCategoryHero";
import ProductLinesGrid from "../components/products/ProductLinesGrid";
import RelatedBrands from "../components/products/RelatedBrands";
import EnquiryForm from "../components/forms/EnquiryForm";
import { getCategoryBySlug } from "../data/seedCategories";
import { brands } from "../data/seedBrands";
import { SITE } from "../config/site";

export default function ProductCategory() {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  if (!category) return <NotFoundCategory />;
  const relatedBrands = brands.filter((brand) => category.relatedBrands.includes(brand.slug));

  return (
    <>
      <SEO
        title={`${category.name} Supplier in Delhi ${SITE.businessName}`}
        description={category.shortDescription}
        keywords={[`${category.name} supplier Delhi`, `${category.name} distributor India`, `${category.name} catalogue`, "electrical goods supplier Delhi"]}
      />
      <ProductCategoryHero category={category} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Products", to: "/products" }, { label: category.name }]} />
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-12">
              <div>
                <SectionHeader eyebrow="Brands in this category" title="Related brands." />
                <RelatedBrands brands={relatedBrands} />
              </div>
              <div>
                <SectionHeader eyebrow="Available Product Lines" title={`${category.name} product ranges.`} />
                <ProductLinesGrid lines={category.productLines} />
              </div>
              <section className="bg-navy p-8 text-white">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow">Catalogue</p>
                <h2 className="mt-3 text-3xl font-black">Need a {category.name} catalogue?</h2>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CatalogueButton href={category.catalogueUrl} context={`${category.slug}-cta`} />
                  <WhatsAppButton message={`Please share catalogues for ${category.name}.`} context={`${category.slug}-catalogue`} />
                </div>
              </section>
            </div>
            <EnquiryForm
              type="category"
              relatedCategory={category.slug}
              sourcePage={`/products/${category.slug}`}
              defaultMessage={`I am interested in ${category.name}. Please share availability and catalogue details.`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function NotFoundCategory() {
  return (
    <section className="bg-offWhite py-20">
      <div className="mx-auto max-w-4xl px-6">
        <EmptyState title="Category not found" body="This product category is not available." />
      </div>
    </section>
  );
}

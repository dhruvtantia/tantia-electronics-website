import { Link, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import Breadcrumb from "../components/common/Breadcrumb";
import EmptyState from "../components/common/EmptyState";
import SectionHeader from "../components/common/SectionHeader";
import CategoryCard from "../components/products/CategoryCard";
import EnquiryForm from "../components/forms/EnquiryForm";
import BrandDetailHero from "../components/brands/BrandDetailHero";
import BrandOverview from "../components/brands/BrandOverview";
import BrandCatalogueCTA from "../components/brands/BrandCatalogueCTA";
import { getBrandBySlug } from "../data/seedBrands";
import { categories } from "../data/seedCategories";
import { SITE } from "../config/site";

export default function BrandDetail() {
  const { brandSlug } = useParams();
  const brand = getBrandBySlug(brandSlug);
  if (!brand) return <NotFoundBrand />;
  const relatedCategories = categories.filter((category) => brand.categories.includes(category.slug));

  return (
    <>
      <SEO title={`${brand.name} Distributor ${SITE.businessName}`} description={brand.shortDescription} />
      <BrandDetailHero brand={brand} />
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Brands", to: "/brands" }, { label: brand.name }]} />
          <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
            <div className="space-y-12">
              <BrandOverview brand={brand} />
              <div>
                <SectionHeader eyebrow="Product Lines" title={`Explore ${brand.name} categories.`} />
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedCategories.map((category) => <CategoryCard key={category.slug} category={category} />)}
                </div>
              </div>
              <BrandCatalogueCTA brand={brand} />
              <Link to="/brands" className="inline-block font-bold text-brandRed">← Back to all brands</Link>
            </div>
            <EnquiryForm
              type="brand"
              relatedBrand={brand.slug}
              sourcePage={`/brands/${brand.slug}`}
              defaultMessage={`I am interested in ${brand.name} products. Please share availability and catalogue details.`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function NotFoundBrand() {
  return (
    <section className="bg-offWhite py-20">
      <div className="mx-auto max-w-4xl px-6">
        <EmptyState title="Brand not found" body="This brand page is not available." />
      </div>
    </section>
  );
}

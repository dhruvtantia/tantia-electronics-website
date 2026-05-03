import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import HomeHero from "../components/home/HomeHero";
import StatsStrip from "../components/home/StatsStrip";
import BrandRibbon from "../components/home/BrandRibbon";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedBrands from "../components/home/FeaturedBrands";
import WhyChooseUs from "../components/home/WhyChooseUs";
import HomeCTA from "../components/home/HomeCTA";
import { SEO as SEO_CONFIG } from "../config/seo";
import { brands } from "../data/seedBrands";
import { categories } from "../data/seedCategories";

export default function Home() {
  return (
    <>
      <SEO {...SEO_CONFIG.home} />
      <HomeHero />
      <StatsStrip />
      <BrandRibbon brands={brands} />
      <section className="bg-white py-20 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <SectionHeader eyebrow="What We Supply" title="Eight categories. One trusted source." />
          <CategoryGrid categories={categories} />
        </div>
      </section>
      <section className="bg-white py-20 pt-0 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <SectionHeader eyebrow="Featured Brands" title="Brands we proudly distribute." />
          <FeaturedBrands brands={brands} />
        </div>
      </section>
      <WhyChooseUs />
      <HomeCTA />
    </>
  );
}

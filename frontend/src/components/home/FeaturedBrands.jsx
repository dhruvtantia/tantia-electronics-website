import BrandGrid from "../brands/BrandGrid";
import Button from "../common/Button";

export default function FeaturedBrands({ brands }) {
  const featuredBrands = brands.filter((brand) => brand.featured).slice(0, 8);

  return (
    <>
      <BrandGrid brands={featuredBrands} />
      <div className="mt-10 flex justify-center">
        <Button to="/brands" className="rounded-md">View All Brands</Button>
      </div>
    </>
  );
}

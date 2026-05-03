import CategoryCard from "../products/CategoryCard";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => <CategoryCard key={category.slug} category={category} />)}
    </div>
  );
}

import { ArrowRight, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader";

export default function BrandProductCategories({ brand, categories }) {
  return (
    <section>
      <SectionHeader eyebrow="Product Categories" title={`${brand.name} product range.`} />
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/products/${category.slug}`}
            className="group flex h-full gap-4 border border-border bg-offWhite p-5 transition hover:-translate-y-1 hover:border-brandRed hover:bg-white hover:shadow-card"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-brandRed">
              <Layers3 size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg font-black text-navy">{category.name}</span>
              <span className="mt-2 block text-sm leading-6 text-mutedText">{category.shortDescription}</span>
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-brandRed">
                View Category <ArrowRight size={15} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

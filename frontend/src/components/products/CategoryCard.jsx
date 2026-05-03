import { Cable, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/products/${category.slug}`} className="group block h-full border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
      <div className="flex h-12 w-12 items-center justify-center bg-offWhite text-brandRed"><Cable /></div>
      <h3 className="mt-5 text-2xl font-black text-navy">{category.name}</h3>
      <p className="mt-3 leading-7 text-mutedText">{category.shortDescription}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-brandRed">View Category <ArrowRight size={16} /></span>
    </Link>
  );
}

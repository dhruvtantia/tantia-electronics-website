import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-8 text-sm font-semibold text-mutedText" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label}>
          {item.to ? <Link className="hover:text-brandRed" to={item.to}>{item.label}</Link> : <span className="text-navy">{item.label}</span>}
          {index < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}

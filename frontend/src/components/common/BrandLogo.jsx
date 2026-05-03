export default function BrandLogo({ brand, size = "md" }) {
  const sizes = {
    sm: "h-14 w-28 p-2",
    md: "h-16 w-32 p-3",
    lg: "h-24 w-44 p-4",
  };

  return (
    <div className={`${sizes[size] || sizes.md} flex shrink-0 items-center justify-center border border-border bg-white text-center text-lg font-black text-navy`}>
      {brand.logoUrl ? (
        <img src={brand.logoUrl} alt={`${brand.name} logo`} className="max-h-full max-w-full object-contain" />
      ) : (
        brand.abbreviation
      )}
    </div>
  );
}

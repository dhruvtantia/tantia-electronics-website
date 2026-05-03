import SectionLabel from "../common/SectionLabel";

export default function BrandOverview({ brand }) {
  return (
    <div>
      <SectionLabel>Brand Overview</SectionLabel>
      <h2 className="mt-3 text-3xl font-black text-navy">About {brand.name}</h2>
      <p className="mt-4 text-lg leading-8 text-mutedText">{brand.longDescription}</p>
    </div>
  );
}

import StatCard from "../common/StatCard";

export default function StatsStrip() {
  const stats = [["55+", "Years"], ["9", "Trusted Brands"], ["8", "Categories"], ["Pan-India", "Supply Reach"]];
  return (
    <section className="bg-white py-8">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 md:grid-cols-4 md:px-10 lg:px-16">
        {stats.map(([value, label]) => <StatCard key={label} value={value} label={label} />)}
      </div>
    </section>
  );
}

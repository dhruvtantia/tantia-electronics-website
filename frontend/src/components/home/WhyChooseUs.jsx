import SectionHeader from "../common/SectionHeader";

const values = ["55+ Years of Experience", "Quality Products", "Strong Dealer Network", "Catalogue Availability", "B2B Supply Focus", "Delhi-Based Legacy"];

export default function WhyChooseUs() {
  return (
    <section className="bg-offWhite py-20 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Why Choose Tantia Electronics"
          title="Built on five and a half decades of trade trust."
          body="From small electrical contractors to large panel-builders and OEMs, buyers across Delhi and India rely on us for quality products, reliable supply and clear communication."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => <div key={value} className="border border-border bg-white p-6 text-xl font-black text-navy transition hover:-translate-y-1 hover:shadow-card">{value}</div>)}
        </div>
      </div>
    </section>
  );
}

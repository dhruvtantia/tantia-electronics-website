import { ASSETS } from "../../config/assets";
import Button from "../common/Button";
import WhatsAppButton from "../common/WhatsAppButton";

export default function HomeHero() {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-navy hero-entrance">
      <div className="absolute inset-0 -z-20">
        {ASSETS.heroSlides.map((image, index) => (
          <div
            key={image}
            className={`${ASSETS.heroSlides.length > 1 ? "hero-slide" : ""} absolute inset-0 bg-cover bg-center`}
            style={{ backgroundImage: `url(${image})`, animationDelay: `${index * 5}s` }}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/82 to-white/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(245,158,11,0.22),transparent_28%),linear-gradient(120deg,rgba(16,24,40,0.18),transparent_55%)]" />

      <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 md:px-10 lg:px-16">
        <div className="hero-entrance-stagger max-w-4xl rounded-lg border border-white/70 bg-white/72 p-7 shadow-card backdrop-blur-md md:p-10">
          <p className="inline-block rounded-full bg-orange/15 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-redDark">Established 1969 • Delhi</p>
          <h1 className="mt-6 text-5xl font-black leading-tight text-navy md:text-7xl">
            <span className="text-orange">55+ Years</span> of Trusted Electronic Components & Electrical Goods Distribution.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-mutedText">
            Tantia Electronics Co. supplies wires, switches, fuses, circuit breakers, precision components, electronic goods, connectors, and industrial electrical products across Delhi and major Indian cities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton context="home-hero" className="rounded-md" />
            <Button to="/contact" variant="secondary" className="rounded-md border-slate-300 bg-white/90">Request Quote</Button>
            <Button to="/brands" variant="dark" className="rounded-md">View Brands</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PageHero({ eyebrow, title, body }) {
  return (
    <section className="bg-offWhite py-16 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.22em] text-brandRed">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-black text-navy md:text-6xl">{title}</h1>
        {body ? <p className="mt-5 max-w-3xl text-lg leading-8 text-mutedText">{body}</p> : null}
      </div>
    </section>
  );
}

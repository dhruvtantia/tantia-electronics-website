import SectionLabel from "./SectionLabel";

export default function SectionHeader({ eyebrow, title, body, light = false }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && <SectionLabel light={light}>{eyebrow}</SectionLabel>}
      <h2 className={`mt-3 text-3xl font-black tracking-normal md:text-5xl ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {body && <p className={`mt-4 text-lg leading-8 ${light ? "text-slate-300" : "text-mutedText"}`}>{body}</p>}
    </div>
  );
}

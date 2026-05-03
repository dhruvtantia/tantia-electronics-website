export default function SectionLabel({ children, light = false }) {
  return (
    <p className={`text-xs font-black uppercase tracking-[0.22em] ${light ? "text-yellow" : "text-brandRed"}`}>
      {children}
    </p>
  );
}

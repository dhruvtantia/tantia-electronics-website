export default function StatCard({ value, label, dark = false }) {
  return (
    <div className={`border p-6 ${dark ? "border-white/10 bg-white/5" : "border-border bg-white"}`}>
      <p className={`text-3xl font-black ${dark ? "text-white" : "text-navy"}`}>{value}</p>
      <p className={`mt-2 text-sm font-semibold uppercase tracking-wide ${dark ? "text-slate-300" : "text-mutedText"}`}>{label}</p>
    </div>
  );
}

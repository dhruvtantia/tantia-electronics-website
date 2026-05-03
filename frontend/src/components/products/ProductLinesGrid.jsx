import { Check } from "lucide-react";

export default function ProductLinesGrid({ lines }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {lines.map((line) => (
        <div key={line} className="flex items-center gap-3 border border-border bg-white p-4">
          <Check className="text-brandRed" size={18} />
          <span className="font-semibold text-navy">{line}</span>
        </div>
      ))}
    </div>
  );
}

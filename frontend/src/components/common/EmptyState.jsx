export default function EmptyState({ title = "Nothing found", body = "The requested content is not available yet." }) {
  return (
    <div className="border border-border bg-white p-10 text-center">
      <h1 className="text-3xl font-black text-navy">{title}</h1>
      <p className="mt-3 text-mutedText">{body}</p>
    </div>
  );
}

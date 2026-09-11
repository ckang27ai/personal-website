// Small uppercase label used above headings and as section titles.
export function Eyebrow({
  as: Tag = "span",
  children,
}: {
  as?: "span" | "h2";
  children: React.ReactNode;
}) {
  return (
    <Tag className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </Tag>
  );
}

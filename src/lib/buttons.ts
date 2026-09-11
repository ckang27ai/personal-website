// Class names for the site's rounded buttons, shared by links and <button>s.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

export const primaryButton = `${base} bg-primary text-primary-foreground hover:bg-primary/90`;
export const outlineButton = `${base} border border-border text-foreground hover:bg-secondary`;

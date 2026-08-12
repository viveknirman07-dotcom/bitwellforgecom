import { useEffect, useMemo, useRef, useState } from "react";

export interface CurrencyOption {
  code: string;
  name: string;
}

interface Props {
  value: string;
  options: CurrencyOption[];
  onChange: (code: string) => void;
  label?: string;
}

/**
 * Searchable currency picker. Deliberately plain: a label, a field and a list,
 * matching the rest of the BitwellForge interface language.
 */
const CurrencySelect = ({ value, options, onChange, label = "Currency" }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.code === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) => o.code.toLowerCase().includes(q) || o.name.toLowerCase().includes(q),
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const field =
    "w-full bg-transparent border border-border text-foreground text-sm px-4 py-3 min-h-[48px] transition-colors focus:outline-none focus:border-foreground/50";

  return (
    <div ref={wrapRef} className="relative w-full max-w-[320px]">
      <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">{label}</p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={options.length === 0}
        onClick={() => {
          setQuery("");
          setOpen((o) => !o);
        }}
        className={`${field} text-left flex items-center justify-between gap-4 disabled:opacity-50`}
      >
        <span>{selected ? `${selected.code} — ${selected.name}` : value}</span>
        <span aria-hidden className="text-muted-foreground text-[11px]">
          {open ? "\u2013" : "+"}
        </span>
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-full border border-border bg-background shadow-lg">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search currency"
            aria-label="Search currency"
            className="w-full bg-transparent border-0 border-b border-border text-foreground text-sm px-4 py-3 min-h-[48px] focus:outline-none"
          />
          <ul role="listbox" className="max-h-[260px] overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-4 text-sm text-muted-foreground">No matching currency</li>
            )}
            {filtered.map((o) => (
              <li key={o.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.code === value}
                  onClick={() => {
                    onChange(o.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 min-h-[44px] text-sm transition-colors hover:bg-foreground/5 ${
                    o.code === value ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {o.code} — {o.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;

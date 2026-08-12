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
 * Searchable currency picker. Deliberately plain: text, a field and a list,
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

  return (
    <div ref={wrapRef} className="relative w-full max-w-[320px]">
      <p className="text-[11px] tracking-[0.2em] uppercase portal-muted mb-2">{label}</p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={options.length === 0}
        onClick={() => {
          setQuery("");
          setOpen((o) => !o);
        }}
        className="portal-input w-full text-left flex items-center justify-between gap-4 min-h-[48px] disabled:opacity-50"
      >
        <span className="text-sm">
          {selected ? `${selected.code} — ${selected.name}` : value}
        </span>
        <span aria-hidden className="portal-muted text-[11px]">{open ? "\u2013" : "+"}</span>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full border portal-line bg-[hsl(var(--portal-bg,0_0%_4%))] backdrop-blur-md">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search currency"
            aria-label="Search currency"
            className="portal-input w-full border-0 border-b portal-line min-h-[48px]"
          />
          <ul role="listbox" className="max-h-[260px] overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-4 py-4 text-sm portal-muted">No matching currency</li>
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
                  className={`w-full text-left px-4 py-3 min-h-[44px] text-sm transition-colors hover:bg-white/5 ${
                    o.code === value ? "portal-gold" : "portal-muted"
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

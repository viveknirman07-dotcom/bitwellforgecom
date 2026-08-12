const KEY = "bwf_currency";

export const DEFAULT_CURRENCY = "USD";

/** The customer's chosen billing currency. Presentation only — the server always reprices. */
export const getCurrency = (): string => {
  try {
    const v = localStorage.getItem(KEY);
    return v && /^[A-Z]{3}$/.test(v) ? v : DEFAULT_CURRENCY;
  } catch {
    return DEFAULT_CURRENCY;
  }
};

export const setCurrency = (code: string) => {
  try {
    localStorage.setItem(KEY, code.toUpperCase());
  } catch {
    /* non-fatal */
  }
};

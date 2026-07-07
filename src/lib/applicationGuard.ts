// Anti-spam application throttling using multiple identifiers.
// Client-side only: browser fingerprint (canvas + UA + screen), localStorage, cookie.

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 48 * 60 * 60 * 1000; // 48h
const BLOCK_MS = 13 * 24 * 60 * 60 * 1000; // 13 days
const LS_KEY = "bwf_app_attempts_v1";
const CK_KEY = "bwf_app_attempts_v1";

type Store = Record<string, { attempts: number[]; blockedUntil?: number }>;

function fingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 40;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = "#f60";
      ctx.fillRect(0, 0, 100, 20);
      ctx.fillStyle = "#069";
      ctx.fillText("bwf-fp", 2, 2);
      ctx.fillStyle = "rgba(102,204,0,0.7)";
      ctx.fillText("bwf-fp", 4, 4);
    }
    const data = canvas.toDataURL();
    const raw = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      data,
    ].join("|");
    let h = 0;
    for (let i = 0; i < raw.length; i++) {
      h = (h << 5) - h + raw.charCodeAt(i);
      h |= 0;
    }
    return "fp_" + Math.abs(h).toString(36);
  } catch {
    return "fp_unknown";
  }
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days = 20) {
  const exp = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

function readStore(): Store {
  try {
    const ls = localStorage.getItem(LS_KEY);
    const ck = readCookie(CK_KEY);
    const source = ls || ck;
    if (!source) return {};
    return JSON.parse(source) as Store;
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  const s = JSON.stringify(store);
  try {
    localStorage.setItem(LS_KEY, s);
  } catch {
    /* ignore */
  }
  writeCookie(CK_KEY, s);
}

function keyFor(jobId: string) {
  return `${fingerprint()}::${jobId}`;
}

export type Status = { blocked: boolean; blockedUntil?: number; attempts: number };

export function getStatus(jobId: string): Status {
  const store = readStore();
  const rec = store[keyFor(jobId)];
  if (!rec) return { blocked: false, attempts: 0 };
  const now = Date.now();
  if (rec.blockedUntil && rec.blockedUntil > now) {
    return { blocked: true, blockedUntil: rec.blockedUntil, attempts: rec.attempts.length };
  }
  const fresh = rec.attempts.filter((t) => now - t < WINDOW_MS);
  return { blocked: false, attempts: fresh.length };
}

export function recordAttempt(jobId: string): Status {
  const store = readStore();
  const k = keyFor(jobId);
  const now = Date.now();
  const rec = store[k] || { attempts: [] };
  if (rec.blockedUntil && rec.blockedUntil > now) {
    return { blocked: true, blockedUntil: rec.blockedUntil, attempts: rec.attempts.length };
  }
  rec.attempts = rec.attempts.filter((t) => now - t < WINDOW_MS);
  rec.attempts.push(now);
  if (rec.attempts.length >= MAX_ATTEMPTS) {
    rec.blockedUntil = now + BLOCK_MS;
  }
  store[k] = rec;
  writeStore(store);
  return {
    blocked: !!(rec.blockedUntil && rec.blockedUntil > now),
    blockedUntil: rec.blockedUntil,
    attempts: rec.attempts.length,
  };
}

export function formatUntil(ts?: number): string {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

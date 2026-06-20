/**
 * Lightweight sliding-window rate limiter.
 *
 * In-memory (per server instance) by default — good for single-node / dev.
 * For multi-region production, swap `store` for Upstash Redis (see README):
 * the public API (rateLimit / clientIp) stays identical.
 */
interface Entry {
  hits: number[];
}

const store = new Map<string, Entry>();

// Periodic cleanup so the map can't grow unbounded.
let lastSweep = Date.now();
function sweep(windowMs: number) {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, v] of store) {
    v.hits = v.hits.filter((t) => now - t < windowMs);
    if (v.hits.length === 0) store.delete(k);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * @param key    unique bucket (e.g. `signup:1.2.3.4`)
 * @param limit  max requests per window
 * @param windowMs window length in ms
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  sweep(windowMs);
  const now = Date.now();
  const entry = store.get(key) ?? { hits: [] };
  entry.hits = entry.hits.filter((t) => now - t < windowMs);

  if (entry.hits.length >= limit) {
    const oldest = entry.hits[0];
    store.set(key, entry);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000),
    };
  }

  entry.hits.push(now);
  store.set(key, entry);
  return { ok: true, remaining: limit - entry.hits.length, retryAfterSeconds: 0 };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

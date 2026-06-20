"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SearchResult } from "@/lib/search/engine";

/**
 * Debounced, keyboard-navigable search (Trie + fuzzy backend).
 * Arrow keys move the selection; Enter follows it.
 */
export function CalculatorSearch() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    const id = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results ?? []);
      setActive(0);
      setOpen(true);
    }, 150);
    return () => clearTimeout(id);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function onKey(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % results.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a - 1 + results.length) % results.length); }
    else if (e.key === "Enter") { window.location.href = results[active].url; }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={onKey}
        onFocus={() => results.length && setOpen(true)}
        placeholder="Search calculators & trackers…"
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
        aria-label="Search"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.map((r, i) => (
            <li key={r.url}>
              <Link
                href={r.url}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm ${i === active ? "bg-blue-50" : ""}`}
              >
                <span>{r.title}</span>
                <span className="text-xs uppercase text-gray-400">{r.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

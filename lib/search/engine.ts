import { Trie } from "./trie";
import { similarity } from "./fuzzy";
import { CATALOG, type CatalogItem } from "./catalog";

/**
 * Search engine combining:
 *   1. Trie prefix match  (fast autocomplete)
 *   2. Damerau-Levenshtein fuzzy match (typo tolerance)
 *   3. Field + category weighting (relevance ranking)
 *
 * The index is built once at module load (catalog is static).
 */
export interface SearchResult extends CatalogItem {
  score: number;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/[\s-]+/).filter(Boolean);
}

// Build the inverted index + trie once.
const trie = new Trie();
const docTokens: string[][] = [];

CATALOG.forEach((item, id) => {
  const tokens = Array.from(new Set([...tokenize(item.title), ...item.keywords.map((k) => k.toLowerCase())]));
  docTokens[id] = tokens;
  tokens.forEach((t) => trie.insert(t, id));
});

export function search(query: string, limit = 8): SearchResult[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const scores = new Map<number, number>();

  for (const q of qTokens) {
    // 1. exact prefix hits via trie
    for (const id of trie.searchPrefix(q)) {
      scores.set(id, (scores.get(id) ?? 0) + 2);
    }
    // 2. fuzzy fallback against each doc token
    docTokens.forEach((tokens, id) => {
      let best = 0;
      for (const t of tokens) {
        if (t.startsWith(q)) { best = Math.max(best, 1); continue; }
        const sim = similarity(q, t);
        if (sim >= 0.7) best = Math.max(best, sim);
      }
      if (best > 0) scores.set(id, (scores.get(id) ?? 0) + best);
    });
  }

  const results: SearchResult[] = [];
  for (const [id, raw] of scores) {
    const item = CATALOG[id];
    // 3. boost service products and title matches
    const categoryBoost = item.category === "service" ? 1.25 : 1;
    const titleBoost = tokenize(item.title).some((t) => qTokens.includes(t)) ? 1.5 : 1;
    results.push({ ...item, score: raw * categoryBoost * titleBoost });
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

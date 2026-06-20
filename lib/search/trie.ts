/**
 * Compressed prefix Trie for instant autocomplete over the calculator catalog.
 * O(L) insert and O(L) prefix lookup where L = token length — far faster than
 * scanning every entry on each keystroke as the catalog grows.
 */
export class TrieNode {
  children = new Map<string, TrieNode>();
  ids = new Set<number>(); // doc ids whose tokens pass through this node
}

export class Trie {
  root = new TrieNode();

  insert(token: string, id: number) {
    let node = this.root;
    for (const ch of token) {
      let next = node.children.get(ch);
      if (!next) {
        next = new TrieNode();
        node.children.set(ch, next);
      }
      node = next;
      node.ids.add(id);
    }
  }

  /** Returns doc ids whose token starts with the given prefix. */
  searchPrefix(prefix: string): Set<number> {
    let node = this.root;
    for (const ch of prefix) {
      const next = node.children.get(ch);
      if (!next) return new Set();
      node = next;
    }
    return node.ids;
  }
}

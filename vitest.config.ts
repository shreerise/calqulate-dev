import { defineConfig } from "vitest/config";

/**
 * Vitest config scoped to the pure, framework-free domain core. These tests have
 * no DOM/Next/Supabase dependencies, so they run fast in a plain node environment.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/__tests__/**/*.test.ts"],
  },
});

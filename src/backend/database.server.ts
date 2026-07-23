import Database from "../lib/supabase-compat";

export type AppDatabase = {
  prepare(query: string): {
    all(...params: unknown[]): unknown[];
    get(...params: unknown[]): unknown;
    run(...params: unknown[]): { lastInsertRowid: number; changes: number };
  };
  exec(sql: string): void;
  pragma(sql: string): void;
  transaction<T>(operation: () => T): () => T;
};

const globalDatabase = globalThis as typeof globalThis & { servioApiDb?: AppDatabase };

export function getApiDatabase() {
  if (!globalDatabase.servioApiDb) {
    const db = new Database();
    // The shim's prepare returns { all, get, run } compatible with AppDatabase.
    globalDatabase.servioApiDb = db as unknown as AppDatabase;
  }
  return globalDatabase.servioApiDb;
}

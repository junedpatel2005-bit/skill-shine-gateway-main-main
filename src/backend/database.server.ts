import path from "node:path";
import { DatabaseSync } from "node:sqlite";

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

type QueryStatement = ReturnType<AppDatabase["prepare"]>;

function resolveDatabasePath() {
  return path.resolve(process.cwd(), "prisma", "app.db");
}

class SqliteQueryStatement implements QueryStatement {
  constructor(private readonly db: DatabaseSync, private readonly query: string) {}

  all(...params: unknown[]) {
    return this.db.prepare(this.query).all(...(params as any));
  }

  get(...params: unknown[]) {
    return this.db.prepare(this.query).get(...(params as any)) ?? undefined;
  }

  run(...params: unknown[]) {
    const statement = this.db.prepare(this.query);
    const result = statement.run(...(params as any)) as { lastInsertRowid?: number | bigint; changes?: number };
    return {
      lastInsertRowid: Number(result.lastInsertRowid ?? 0),
      changes: Number(result.changes ?? 0),
    };
  }
}

class SqliteDatabase implements AppDatabase {
  private readonly db: DatabaseSync;

  constructor(databasePath = resolveDatabasePath()) {
    this.db = new DatabaseSync(databasePath);
    this.db.prepare("PRAGMA foreign_keys = ON").run();
  }

  prepare(query: string) {
    return new SqliteQueryStatement(this.db, query);
  }

  exec(sql: string) {
    this.db.exec(sql);
  }

  pragma(sql: string) {
    this.db.exec(sql);
  }

  transaction<T>(operation: () => T) {
    return () => operation();
  }
}

const globalDatabase = globalThis as typeof globalThis & { servioApiDb?: AppDatabase };

export function getApiDatabase() {
  if (!globalDatabase.servioApiDb) {
    globalDatabase.servioApiDb = new SqliteDatabase();
  }
  return globalDatabase.servioApiDb;
}

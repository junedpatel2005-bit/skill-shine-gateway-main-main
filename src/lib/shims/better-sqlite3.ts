type BetterSqlite3RunResult = { changes: number; lastInsertRowid: number };

type BetterSqlite3Statement = {
  all: (...args: unknown[]) => unknown[];
  get: (...args: unknown[]) => unknown;
  run: (...args: unknown[]) => BetterSqlite3RunResult;
};

class DatabaseShim {
  constructor(_filePath?: string) {
    this._filePath = _filePath;
  }

  private _filePath?: string;

  prepare(_query: string): BetterSqlite3Statement {
    return {
      all: (..._args: unknown[]) => [],
      get: (..._args: unknown[]) => null,
      run: (..._args: unknown[]) => ({ changes: 0, lastInsertRowid: 0 }),
    };
  }

  exec(_sql: string) {
    return this;
  }

  pragma(_sql: string) {
    return [] as any[];
  }

  transaction<T extends (...args: any[]) => unknown>(operation: T): T {
    return operation;
  }

  close() {
    return undefined;
  }
}

export default DatabaseShim;
export { DatabaseShim };

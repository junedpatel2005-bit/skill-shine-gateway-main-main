class DatabaseShim {
  constructor(_filePath?: string) {
    this._filePath = _filePath;
  }

  private _filePath?: string;

  prepare(_query: string) {
    return {
      all: () => [],
      get: () => null,
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
    };
  }

  exec(_sql: string) {
    return this;
  }

  pragma(_sql: string) {
    return [] as any[];
  }

  transaction<T extends Function>(operation: T): T {
    return operation;
  }

  close() {
    return undefined;
  }
}

export default DatabaseShim;
export { DatabaseShim };

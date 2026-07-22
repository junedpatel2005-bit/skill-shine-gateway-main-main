export class Database {
  public exec(_sql: string) {
    return this;
  }

  public pragma(_sql: string) {
    return this;
  }

  public prepare(_sql: string) {
    return {
      all: () => [],
      get: () => undefined,
      run: () => ({ lastInsertRowid: 0, changes: 0 }),
    };
  }

  public transaction<T>(operation: () => T) {
    return () => operation();
  }
}

export default Database;

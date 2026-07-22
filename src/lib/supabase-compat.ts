export class Database {
  public exec(_sql: string) {
    return this;
  }

  public pragma(_sql: string) {
    return this;
  }

  public prepare(_sql: string) {
    throw new Error(
      "SQLite database is disabled. This code is still using SQLite. Migrate this query to Supabase."
    );
  }

  public transaction<T>(_operation: () => T) {
    throw new Error(
      "SQLite transactions are disabled. Use Supabase operations instead."
    );
  }
}

export default Database;
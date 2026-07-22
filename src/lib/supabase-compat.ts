export interface Statement {
  run(...args: any[]): any;
  all(...args: any[]): any[];
  get(...args: any[]): any;
}

export class Database {
  constructor(..._args: any[]) {}

  public exec(_sql: string): this {
    return this;
  }

  public pragma(_sql: string): any[] {
    return [];
  }

  public prepare(_sql: string): Statement {
    return {
      run: (..._args: any[]): any => {
        throw new Error(
          "SQLite database is disabled. This code is still using SQLite. Migrate this query to Supabase."
        );
      },
      all: (..._args: any[]): any[] => {
        throw new Error(
          "SQLite database is disabled. This code is still using SQLite. Migrate this query to Supabase."
        );
      },
      get: (..._args: any[]): any => {
        throw new Error(
          "SQLite database is disabled. This code is still using SQLite. Migrate this query to Supabase."
        );
      },
    };
  }

  public transaction<T extends (...args: any[]) => any>(operation: T): T {
    return operation;
  }
}

export default Database;

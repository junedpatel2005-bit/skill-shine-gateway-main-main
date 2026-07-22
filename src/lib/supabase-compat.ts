import DatabaseShim from "./shims/better-sqlite3";

export type Statement = {
  run: (...args: any[]) => any;
  all: (...args: any[]) => any[];
  get: (...args: any[]) => any;
};

export class Database extends DatabaseShim {}

export type BetterSqlite3Database = Database;
export default Database;

type Row = Record<string, unknown>;

type TableStore = Map<string, Row[]>;

function stripQuotes(value: string) {
  return value.replace(/^"|"$/g, "").replace(/^'|'$/g, "");
}

function parseTableName(sql: string) {
  const match = sql.match(/from\s+"([^"]+)"/i) || sql.match(/from\s+`([^`]+)`/i) || sql.match(/from\s+([A-Za-z0-9_]+)/i);
  return match ? stripQuotes(match[1]) : null;
}

function parseInsertTable(sql: string) {
  const match = sql.match(/insert\s+into\s+"([^"]+)"/i) || sql.match(/insert\s+into\s+`([^`]+)`/i) || sql.match(/insert\s+into\s+([A-Za-z0-9_]+)/i);
  return match ? stripQuotes(match[1]) : null;
}

function parseUpdateTable(sql: string) {
  const match = sql.match(/update\s+"([^"]+)"/i) || sql.match(/update\s+`([^`]+)`/i) || sql.match(/update\s+([A-Za-z0-9_]+)/i);
  return match ? stripQuotes(match[1]) : null;
}

function parseDeleteTable(sql: string) {
  const match = sql.match(/delete\s+from\s+"([^"]+)"/i) || sql.match(/delete\s+from\s+`([^`]+)`/i) || sql.match(/delete\s+from\s+([A-Za-z0-9_]+)/i);
  return match ? stripQuotes(match[1]) : null;
}

function parseColumnNames(sql: string) {
  const match = sql.match(/\(([^)]+)\)\s+values/i);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((value) => stripQuotes(value.trim()))
    .filter(Boolean);
}

function parseValues(sql: string) {
  const match = sql.match(/values\s*\((.*)\)/is);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function coerceValue(value: string) {
  const trimmed = value.trim();
  if (trimmed === "NULL") return null;
  if (trimmed === "CURRENT_TIMESTAMP") return new Date().toISOString();
  if (/^'(.*)'$/s.test(trimmed)) return trimmed.slice(1, -1);
  if (/^"(.*)"$/s.test(trimmed)) return trimmed.slice(1, -1);
  if (/^\d+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

export class Database {
  private tables: TableStore = new Map();
  private lastInsertId = 1;

  public exec(sql: string) {
    if (/create table/i.test(sql)) {
      const nameMatch = sql.match(/create\s+table\s+(?:if\s+not\s+exists\s+)?"([^"]+)"/i) || sql.match(/create\s+table\s+(?:if\s+not\s+exists\s+)?`([^`]+)`/i);
      if (nameMatch) {
        this.tables.set(nameMatch[1], []);
      }
      return this;
    }
    if (/create index/i.test(sql)) return this;
    if (/alter table/i.test(sql)) return this;
    if (/pragma/i.test(sql)) return this;
    return this;
  }

  public pragma(sql: string) {
    if (/table_info/i.test(sql)) {
      const tableName = sql.match(/table_info\("([^"]+)"\)/i)?.[1];
      return { all: () => (tableName ? [] : []) };
    }
    return { all: () => [] };
  }

  public prepare(sql: string) {
    return new Statement(this, sql);
  }

  public transaction<T>(fn: () => T) {
    return () => fn();
  }

  public close() {}

  public __getTables() {
    return this.tables;
  }

  public __setValue(table: string, rows: Row[]) {
    this.tables.set(table, rows);
  }

  public __nextId() {
    return this.lastInsertId++;
  }
}

class Statement {
  constructor(private db: Database, private sql: string) {}

  public all(...params: unknown[]) {
    if (/^select/i.test(this.sql)) {
      const tableName = parseTableName(this.sql);
      if (!tableName) return [];
      const rows = this.db.__getTables().get(tableName) ?? [];
      return rows.map((row) => ({ ...row }));
    }
    if (/^pragma/i.test(this.sql)) return [];
    return [];
  }

  public get(...params: unknown[]) {
    const rows = this.all(...params) as Row[];
    return rows[0] ?? undefined;
  }

  public run(...params: unknown[]) {
    const sql = this.sql.trim();
    if (/^insert\s+/i.test(sql)) {
      const tableName = parseInsertTable(sql);
      if (!tableName) return { lastInsertRowid: this.db.__nextId(), changes: 1 };
      const columns = parseColumnNames(sql);
      const values = parseValues(sql).map((value) => coerceValue(value));
      const row: Record<string, unknown> = {};
      columns.forEach((column, index) => {
        row[column] = values[index] ?? null;
      });
      if (!row.id) row.id = this.db.__nextId();
      const tableRows = this.db.__getTables().get(tableName) ?? [];
      tableRows.push(row);
      this.db.__getTables().set(tableName, tableRows);
      return { lastInsertRowid: Number(row.id), changes: 1 };
    }

    if (/^update\s+/i.test(sql)) {
      const tableName = parseUpdateTable(sql);
      if (!tableName) return { lastInsertRowid: 0, changes: 0 };
      const rows = this.db.__getTables().get(tableName) ?? [];
      const nextRows = rows.map((row) => ({ ...row }));
      this.db.__getTables().set(tableName, nextRows);
      return { lastInsertRowid: 0, changes: nextRows.length };
    }

    if (/^delete\s+/i.test(sql)) {
      const tableName = parseDeleteTable(sql);
      if (!tableName) return { lastInsertRowid: 0, changes: 0 };
      this.db.__getTables().set(tableName, []);
      return { lastInsertRowid: 0, changes: 0 };
    }

    return { lastInsertRowid: 0, changes: 0 };
  }
}

export default Database;

import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabaseSync("finances.db");

export function createTables() {
  database.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      note TEXT
    );
  `);
}

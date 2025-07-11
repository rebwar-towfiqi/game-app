// src/lib/gameDb.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function fetchGameCases() {
  const db = await open({
    filename: "./game_cases.db",
    driver: sqlite3.Database,
  });

  const cases = await db.all("SELECT id, title FROM game_cases");
  await db.close();
  return cases;
}

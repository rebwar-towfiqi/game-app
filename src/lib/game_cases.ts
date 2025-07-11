// src/lib/game_cases.ts

import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// تعریف نوع پرونده
export interface GameCase {
  id: number
  title: string
  summary: string
  full_text: string
}

// تابعی برای خواندن همه پرونده‌ها از دیتابیس
export async function fetchAllGameCases(): Promise<GameCase[]> {
  const db = await open({
    filename: 'game_cases.db',
    driver: sqlite3.Database
  })

  const cases = await db.all<GameCase[]>(
    'SELECT id, title, summary, full_text FROM game_cases'
  )

  await db.close()
  return cases
}

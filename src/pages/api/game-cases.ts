// src/pages/api/game-cases.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'game_cases.db'),
      driver: sqlite3.Database,
    });

    const cases = await db.all('SELECT id, title, summary, full_text FROM game_cases');
    res.status(200).json(cases);
  } catch (error) {
    console.error('❌ خطا در اتصال یا خواندن پایگاه داده:', error);
    res.status(500).json({ error: 'خطا در بازیابی اطلاعات.' });
  }
}

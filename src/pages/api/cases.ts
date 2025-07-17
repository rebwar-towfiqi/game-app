/* eslint-disable no-console */
// src/pages/api/cases.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const db = await open({
      filename: path.join(process.cwd(), 'src', 'data', 'game_cases.db'),
      driver: sqlite3.Database,
    });

    const cases = await db.all(
      'SELECT id, title, summary FROM famous_cases ORDER BY id DESC',
    );

    res.status(200).json(cases);
  } catch (err) {
    console.error('❌ خطا در خواندن پرونده‌ها:', err);
    res.status(500).json({ error: 'خطا در خواندن پرونده‌ها از دیتابیس.' });
  }
}

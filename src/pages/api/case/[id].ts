/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const DB_PATH = path.resolve(process.cwd(), 'src/data/game_cases.db');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'شناسه نامعتبر است.' });
  }

  try {
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database,
    });

    // استفاده از جدول واقعی شما: famous_cases
    const result = await db.get('SELECT * FROM famous_cases WHERE id = ?', id);

    if (!result) {
      return res
        .status(404)
        .json({ error: 'پرونده‌ای با این شناسه پیدا نشد.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ خطا در اتصال به دیتابیس:', error);
    res.status(500).json({ error: 'خطا در سرور یا اتصال به پایگاه داده.' });
  }
}

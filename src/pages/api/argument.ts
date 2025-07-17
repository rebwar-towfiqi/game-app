/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: 'src/data/game_cases.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS arguments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_id TEXT NOT NULL,
      side TEXT CHECK(side IN ('plaintiff', 'defendant')) NOT NULL,
      argument TEXT NOT NULL,
      votes INTEGER DEFAULT 0,
      telegram_id TEXT,
      player_name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

if (req.method === 'POST') {
  try {
    console.log('🔵 Request Body:', req.body);
    const { case_id, side, argument, telegram_id, player_name } = req.body;

    if (!case_id || !side || !argument || !telegram_id) {
      console.error('🔴 Missing Fields:', { case_id, side, argument, telegram_id });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existing = await db.get(
      'SELECT * FROM arguments WHERE case_id = ? AND telegram_id = ?',
      case_id,
      telegram_id
    );

    if (existing) {
      console.warn('⚠️ Duplicate submission:', existing);
      return res.status(409).json({ error: 'Duplicate submission detected for this user and case.' });
    }

    await db.run(
      'INSERT INTO arguments (case_id, side, argument, telegram_id, player_name) VALUES (?, ?, ?, ?, ?)',
      case_id,
      side,
      argument,
      telegram_id,
      player_name
    );

    console.log('✅ Argument inserted successfully.');
    return res.status(200).json({ message: 'Argument submitted successfully.' });
  } catch (err) {
    console.error('❌ Unexpected Error in POST /api/argument:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


  if (req.method === 'GET') {
    const { case_id } = req.query;

    if (!case_id || typeof case_id !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid case_id' });
    }

    const args = await db.all(
      'SELECT * FROM arguments WHERE case_id = ? ORDER BY created_at DESC',
      case_id
    );
    return res.status(200).json(args);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

console.log("📌 Table 'arguments' checked or created.");

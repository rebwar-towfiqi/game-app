/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { hearing_id, user_id, role, content } = req.body;

  if (!hearing_id || !user_id || !role || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const db = await open({
      filename: './src/data/game_cases.db',
      driver: sqlite3.Database
    });

    await db.run(
      `INSERT INTO arguments (hearing_id, user_id, role, content, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [hearing_id, user_id, role, content]
    );

    return res.status(200).json({ message: 'Argument submitted successfully' });
  } catch (error) {
    console.error('❌ Error saving argument:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

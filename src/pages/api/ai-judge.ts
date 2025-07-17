/* eslint-disable no-console */
// src/pages/api/ai-judge.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { case_id } = req.body;

  if (!case_id) {
    return res.status(400).json({ error: 'Missing case_id' });
  }

  const db = await open({ filename: 'src/data/game_cases.db', driver: sqlite3.Database });

  const [plaintiffArg] = await db.all(
    "SELECT argument FROM arguments WHERE case_id = ? AND side = 'plaintiff' ORDER BY created_at DESC LIMIT 1",
    case_id
  );
  const [defendantArg] = await db.all(
    "SELECT argument FROM arguments WHERE case_id = ? AND side = 'defendant' ORDER BY created_at DESC LIMIT 1",
    case_id
  );

  if (!plaintiffArg || !defendantArg) {
    return res.status(404).json({ error: 'Arguments not found for both sides.' });
  }

  const prompt = `
شما نقش یک قاضی حرفه‌ای را دارید. دو وکیل در مورد یک پرونده استدلال‌های زیر را مطرح کرده‌اند:

🔴 استدلال وکیل شاکی:
${plaintiffArg.argument}

🟢 استدلال وکیل متهم:
${defendantArg.argument}

بر اساس این دو استدلال، کدام طرف استدلال قوی‌تری ارائه داده است؟ لطفاً فقط یکی از گزینه‌های زیر را به‌صورت دقیق و بدون توضیح در خروجی بنویس:
- plaintiff
- defendant
`;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const decision = chat.choices[0].message.content?.trim().toLowerCase();

    if (decision !== 'plaintiff' && decision !== 'defendant') {
      return res.status(500).json({ error: 'Invalid AI decision' });
    }

    return res.status(200).json({ winner: decision });
  } catch (err) {
    console.error('❌ AI Judge Error:', err);
    return res.status(500).json({ error: 'AI judgment failed' });
  }
}

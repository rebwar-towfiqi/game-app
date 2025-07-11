import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// نوع پاسخ
type VoteResponse = {
  success: boolean;
  points?: number;
  message?: string;
};

const ROLE_POINTS: Record<string, number> = {
  judge: 15,
  prosecutor: 10,
  defense: 10,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VoteResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { caseId, role, vote } = req.body;

  if (!caseId || !role || !vote) {
    return res.status(400).json({ success: false, message: "Missing parameters" });
  }

  try {
    const db = await open({
      filename: "./game_cases.db",
      driver: sqlite3.Database,
    });

    // ایجاد جدول رأی‌ها در صورت نیاز
    await db.run(`
      CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id INTEGER,
        role TEXT,
        vote TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // درج رأی
    await db.run(
      `INSERT INTO votes (case_id, role, vote) VALUES (?, ?, ?)`,
      caseId,
      role,
      vote
    );

    // امتیاز نقش
    const points = ROLE_POINTS[role.toLowerCase()] || 5;

    res.status(200).json({ success: true, points });
  } catch (error) {
    console.error("Vote API Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

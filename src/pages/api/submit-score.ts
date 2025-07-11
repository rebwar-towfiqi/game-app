import type { NextApiRequest, NextApiResponse } from "next"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import fetch from "node-fetch"

const BOT_TOKEN = process.env.BOT_TOKEN

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { playerId, caseId, score } = req.body

  if (!playerId || !caseId || !score) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const db = await open({
      filename: "game_cases.db",
      driver: sqlite3.Database,
    })

    // ثبت امتیاز در دیتابیس
    await db.run(
      "INSERT INTO player_scores (player_id, case_id, score) VALUES (?, ?, ?)",
      [playerId, caseId, score]
    )

    // ارسال امتیاز به ربات تلگرام
    if (BOT_TOKEN) {
      const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
      const payload = {
        chat_id: playerId,
        text: `🎯 شما ${score} RLC در این پرونده به دست آوردید!`,
      }

      await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error("❌ Error in submit-score:", err)
    return res.status(500).json({ error: "Server error" })
  }
}

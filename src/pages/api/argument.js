// game-app/src/pages/api/argument.js
const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const router = express.Router();
const dbPath = path.resolve(__dirname, "../../data/game_cases.db");

router.post("/", (req, res) => {
  const { case_id, vote, argument } = req.body;

  if (!case_id || !argument) {
    return res.status(400).json({ success: false, message: "اطلاعات ناقص است." });
  }

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("❌ اتصال به دیتابیس:", err.message);
      return res.status(500).json({ success: false, message: "Database error" });
    }
  });

  const query = `
    INSERT INTO arguments (case_id, vote, argument, created_at)
    VALUES (?, ?, ?, datetime('now'))
  `;

  db.run(query, [case_id, vote || null, argument], function (err) {
    if (err) {
      console.error("❌ خطا در درج استدلال:", err.message);
      res.status(500).json({ success: false, message: "خطا در ذخیره اطلاعات" });
    } else {
      res.json({ success: true, message: "استدلال با موفقیت ذخیره شد" });
    }
    db.close();
  });
});

// 🔹 آمار رأی‌ها برای یک پرونده خاص
router.get("/stats/:id", (req, res) => {
  const caseId = req.params.id;

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error("❌ خطا در اتصال به دیتابیس:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
  });

  const sql = `
    SELECT vote, COUNT(*) as count
    FROM arguments
    WHERE case_id = ?
    GROUP BY vote
  `;

  db.all(sql, [caseId], (err, rows) => {
    if (err) {
      console.error("❌ خطا در اجرای کوئری:", err.message);
      return res.status(500).json({ error: "Query error" });
    }

    const result = { plaintiff: 0, defender: 0 };
    for (const row of rows) {
      if (row.vote === "plaintiff") result.plaintiff = row.count;
      if (row.vote === "defender") result.defender = row.count;
    }

    res.json(result);
  });

  db.close();
});


module.exports = router;

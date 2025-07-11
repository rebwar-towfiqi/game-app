console.log("✅ [GET] /api/case route hit!");


const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();
const dbPath = "C:/Users/project/game-app/src/data/game_cases.db";
const router = Router();

// 📌 API – دریافت همه پرونده‌ها
router.get("/", (_req, res) => {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error("❌ خطا در اتصال به دیتابیس:", err.message);
      return res.status(500).json({ error: "Database connection failed" });
    }
  });

  db.all("SELECT id, title, summary FROM famous_cases", [], (err, rows) => {
    if (err) {
      console.error("❌ خطا در دریافت اطلاعات:", err.message);
      return res.status(500).json({ error: "Query failed" });
    }

    // خروجی سازگار با فرانت‌اند
    const simplified = rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.summary || "شرحی ثبت نشده",
    }));
    res.json(simplified);
  });

  db.close();
});

// 📌 API – دریافت یک پرونده خاص
router.get("/:id", (req, res) => {
  const caseId = req.params.id;
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error("❌ خطا در اتصال به دیتابیس:", err.message);
      return res.status(500).json({ error: "Database connection failed" });
    }
  });

  db.get(
    "SELECT title, summary FROM famous_cases WHERE id = ?",
    [caseId],
    (err, row) => {
      if (err) {
        console.error("❌ خطا در دریافت اطلاعات:", err.message);
        return res.status(500).json({ error: "Query failed" });
      }
      res.json(
        row || {
          title: "یافت نشد",
          summary: "❌ پرونده‌ای با این شناسه وجود ندارد.",
        }
      );
    }
  );

  db.close();
});

// 👇 آخر فایل
module.exports = router;


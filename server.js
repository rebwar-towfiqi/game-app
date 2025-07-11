const express = require("express");
const path = require("path");
const caseRoutes = require("./src/pages/api/case");
const argRoutes = require("./src/pages/api/argument");
require("dotenv").config();

const app = express();

// 📦 پشتیبانی از فرم و JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔗 مسیرهای API – باید قبل از static تعریف شوند!
app.use("/api/case", caseRoutes);
app.use("/api/argument", argRoutes);

// 📁 ارائه فایل‌های استاتیک (React build)
app.use(express.static(path.join(__dirname, "build")));

// ⚠️ مسیر fallback برای React Router
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 سرور در حال اجرا روی http://localhost:${PORT}`);
});

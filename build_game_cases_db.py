# build_game_cases_db.py

import sqlite3

# مسیر ذخیره دیتابیس بازی
DB_PATH = "game_cases.db"

# اتصال و ایجاد دیتابیس
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# حذف جدول قبلی در صورت وجود برای پاکسازی
cursor.execute("DROP TABLE IF EXISTS game_cases")

# ایجاد جدول جدید پرونده‌ها
cursor.execute("""
CREATE TABLE game_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    full_text TEXT NOT NULL
)
""")

# نمونه پرونده‌ها
sample_cases = [
    {
        "title": "پرونده تخریب باغ ملی",
        "summary": "دعوا بر سر تخریب بخشی از باغ ملی جهت ساخت مجتمع تجاری",
        "full_text": "در این پرونده، شهرداری اقدام به تخریب بخشی از باغ ملی کرده است تا یک مجتمع تجاری ساخته شود. شهروندان شکایت کرده‌اند و دادگاه باید بررسی کند آیا این اقدام قانونی بوده است یا نه."
    },
    {
        "title": "پرونده سرقت ادبی",
        "summary": "ادعای نویسنده مبنی بر کپی شدن بخشی از رمانش در فیلم سینمایی",
        "full_text": "نویسنده‌ای مدعی شده بخشی از داستان رمان او بدون اجازه در فیلمنامه یک فیلم مشهور استفاده شده است. باید بررسی شود که آیا تطابق کافی برای اثبات سرقت وجود دارد یا نه."
    },
    {
        "title": "پرونده تصادف ساختگی",
        "summary": "ادعای بیمه بر ساختگی بودن تصادف توسط دو فرد برای دریافت خسارت",
        "full_text": "شرکت بیمه به دو نفر که در تصادف ادعایی شرکت داشتند مظنون شده و ادعا دارد تصادف ساختگی بوده و صرفاً برای دریافت خسارت انجام شده است."
    }
]

# درج پرونده‌ها در جدول
for case in sample_cases:
    cursor.execute("""
        INSERT INTO game_cases (title, summary, full_text)
        VALUES (?, ?, ?)
    """, (case["title"], case["summary"], case["full_text"]))

conn.commit()
conn.close()

print("✅ دیتابیس game_cases.db با موفقیت ایجاد شد.")

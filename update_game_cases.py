import sqlite3
import json

# اتصال به دیتابیس
conn = sqlite3.connect("game_cases.db")
cursor = conn.cursor()

# افزودن ستون جدید اگر وجود نداشته باشد
cursor.execute("PRAGMA table_info(game_cases)")
columns = [col[1] for col in cursor.fetchall()]
if "jury_options" not in columns:
    cursor.execute("ALTER TABLE game_cases ADD COLUMN jury_options TEXT")

# داده نمونه برای case شماره 1
options = [
    {"label": "موافق", "value": "yes"},
    {"label": "مخالف", "value": "no"},
    {"label": "امتناع", "value": "abstain"}
]

# تبدیل به JSON و ذخیره در ستون
cursor.execute(
    "UPDATE game_cases SET jury_options = ? WHERE id = 1",
    (json.dumps(options, ensure_ascii=False),)
)

# ذخیره و بستن
conn.commit()
conn.close()

print("گزینه‌های رأی‌گیری با موفقیت ذخیره شدند.")

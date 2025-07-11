// src/components/ArgumentView.tsx

import React, { useState, ChangeEvent } from "react";

type ArgumentViewProps = {
  role: "judge" | "defense" | "prosecution";
  onSubmit: (argument: string) => void;
};

export default function ArgumentView({ role, onSubmit }: ArgumentViewProps) {
  const [text, setText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const handleSubmit = (): void => {
    // شمارش کلمات برای اطمینان از حداقل ۱۰ کلمه
    const wordCount = text.trim().split(/\s+/).filter(w => w).length;
    if (wordCount < 10) {
      alert("لطفاً استدلال خود را حداقل در ۱۰ کلمه بنویسید.");
      return;
    }
    onSubmit(text);
  };

  const roleLabel = 
    role === "judge" ? "قاضی" :
    role === "defense" ? "وکیل متهم" :
    "وکیل شاکی";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        ✍️ ارائه استدلال – نقش شما: {roleLabel}
      </h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows={6}
        className="w-full border border-gray-400 rounded-lg p-3 text-gray-800"
        placeholder="استدلال خود را وارد کنید..."
      />
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          ارسال دفاعیه
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export interface JuryVotingProps {
  caseId: number;
  playerId: string;
}

export default function JuryVoting({ caseId, playerId }: JuryVotingProps) {
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [argumentText, setArgumentText] = useState<string>("");

  const handleVoteSubmit = async () => {
    if (!selectedVote || !argumentText) {
      alert("لطفاً رأی و استدلال خود را وارد کنید.");
      return;
    }

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          caseId,
          playerId,
          vote: selectedVote,
          argument: argumentText
        })
      });

      if (response.ok) {
        alert("✅ رأی شما با موفقیت ثبت شد.");
        setSelectedVote(null);
        setArgumentText("");
      } else {
        alert("❌ خطا در ثبت رأی. لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("❌ بروز خطا در ارتباط با سرور.");
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white space-y-4">
      <h2 className="text-lg font-bold text-center">👩‍⚖️ ثبت رأی شما در این پرونده</h2>

      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded-full border ${
            selectedVote === "guilty" ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setSelectedVote("guilty")}
        >
          مقصر
        </button>
        <button
          className={`px-4 py-2 rounded-full border ${
            selectedVote === "not_guilty" ? "bg-green-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => setSelectedVote("not_guilty")}
        >
          بی‌گناه
        </button>
      </div>

      <textarea
        className="w-full p-2 border rounded"
        rows={4}
        placeholder="✍️ لطفاً استدلال یا توضیح خود را بنویسید..."
        value={argumentText}
        onChange={(e) => setArgumentText(e.target.value)}
      />

      <div className="text-center">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleVoteSubmit}
        >
          ثبت رأی
        </button>
      </div>
    </div>
  );
}

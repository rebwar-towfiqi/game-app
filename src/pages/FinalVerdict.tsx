
import React from "react";
import { useLocation, useNavigate } from "react-router-dom"
export default function FinalVerdict() {
  const location = useLocation();
  const navigate = useNavigate();

  const { vote, argument, reward } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-gray-800 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
          رأی نهایی شما ثبت شد 🎉
        </h1>

        <div className="mt-6 space-y-4 text-right">
          <div>
            <span className="font-semibold">رأی شما:</span>{" "}
            <span className="text-lg text-purple-700">{vote === "guilty" ? "گناهکار" : "بی‌گناه"}</span>
          </div>

          <div>
            <span className="font-semibold">استدلال شما:</span>
            <p className="mt-2 bg-gray-100 p-3 rounded-md border">{argument || "بدون استدلال"}</p>
          </div>

          <div className="text-center text-lg mt-4 text-amber-600 font-bold">
            🎁 شما {reward || 5} RLC دریافت کردید
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition"
          >
            بازگشت به خانه
          </button>
        </div>
      </div>
    </div>
  );
}



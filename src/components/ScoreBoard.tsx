import React from "react";

export default function ScoreBoard() {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold mb-2">📊 داشبورد امتیاز و RLC</h2>
      <p className="mb-1">کل امتیازها: <strong>۰</strong></p>
      <p className="mb-1">RLC مجازی شما: <strong>۰ RLC</strong></p>
      <p className="text-sm text-gray-500 mt-2">تاریخچه بازی:</p>
      {/* در آینده می‌توان تاریخچه واقعی را اینجا نمایش داد */}
    </div>
  );
}

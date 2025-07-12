"use client";

import dynamic from "next/dynamic";
import React from "react";

// بارگذاری تنبل برای اجزای بازی
const HearingRoom = dynamic(() => import("../components/HearingRoom"), { ssr: false });

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🎮 بازی دادگاه عدالت</h1>
      <HearingRoom />
    </div>
  );
}

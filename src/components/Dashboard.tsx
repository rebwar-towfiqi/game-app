// src/components/Dashboard.tsx
import React from 'react';

interface GameHistoryEntry {
  date: string;
  points: number;
}

interface DashboardProps {
  totalPoints: number;
  userPoints: number;
  history?: GameHistoryEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({
  totalPoints,
  userPoints,
  history = [],
}) => {
  return (
    <div className='p-4 border rounded-2xl shadow mb-6 w-full max-w-md mx-auto bg-white'>
      <h2 className='text-lg font-bold mb-2 text-center'>
        📊 داشبورد بازی حقوقی
      </h2>
      <div className='flex justify-between mb-2 text-sm'>
        <span>🔹 کل امتیازهای همه کاربران:</span>
        <strong>{totalPoints}</strong>
      </div>
      <div className='flex justify-between mb-4 text-sm'>
        <span>🪙 امتیاز/RLC شما:</span>
        <strong>{userPoints}</strong>
      </div>
      <div className='mt-3'>
        <p className='font-semibold mb-1 text-sm'>📅 تاریخچه فعالیت شما:</p>
        {history.length === 0 ? (
          <p className='text-gray-500 text-sm text-center'>
            هیچ سابقه‌ای ثبت نشده است.
          </p>
        ) : (
          <ul className='list-disc list-inside text-sm text-right max-h-40 overflow-y-auto pr-2'>
            {history.map((entry, index) => (
              <li key={index}>
                {entry.date}: {entry.points} امتیاز
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

'use client';

import Link from 'next/link';
import React from 'react';

export default function GameHomePage() {
  return (
    <div className='min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center gap-8'>
      <div className='text-center'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4 text-blue-300'>
          🎮 بازی دادگاه عدالت
        </h1>
        <p className='text-lg md:text-xl text-gray-300'>
          به عنوان قاضی، شاکی یا متهم وارد پرونده‌های حقوقی شوید و رأی دهید!
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4'>
        <Link href='/game/role'>
          <button className='bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white text-lg font-bold'>
            🚪 ورود به بازی
          </button>
        </Link>
        <Link
          href='https://t.me/RebLCBot'
          target='_blank'
          rel='noopener noreferrer'
        >
          <button className='bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white text-lg font-bold'>
            🤖 ورود به ربات RebLawBot
          </button>
        </Link>
      </div>

      <p className='text-sm text-gray-400 mt-8'>
        نسخه آزمایشی – بازخوردهای شما باعث بهبود بازی خواهد شد.
      </p>
    </div>
  );
}

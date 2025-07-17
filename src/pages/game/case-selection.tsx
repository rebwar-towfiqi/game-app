/* eslint-disable no-console */
'use client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type CaseItem = {
  id: number;
  title: string;
  summary: string;
};

export default function CaseSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams?.get('role') ?? 'none';

  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<CaseItem[]>('/api/cases')
      .then((res) => {
        setCases(res.data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error('❌ خطا در دریافت پرونده‌ها:', err);
        setLoading(false);
      });
  }, []);

  const handleSelectCase = (caseId: number) => {
    router.push(`/game/hearing-room?case=${caseId}&role=${role}`);
  };

  if (loading) {
    return (
      <div className='p-6 text-center text-white'>
        ⏳ در حال بارگذاری پرونده‌ها...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-950 text-white p-6'>
      <h1 className='text-2xl font-bold text-center mb-6'>📂 انتخاب پرونده</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto'>
        {cases.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelectCase(item.id)}
            className='bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition'
          >
            <h2 className='text-xl font-semibold text-blue-400 mb-2'>
              {item.title}
            </h2>
            <p className='text-sm text-gray-300'>
              {item.summary.slice(0, 100)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

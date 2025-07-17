/* eslint-disable no-console */
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaBalanceScale } from 'react-icons/fa';

type Case = {
  id: number;
  title: string;
  summary: string;
};

export default function CaseSelection() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch('/api/case');
        const data: Case[] = await res.json();
        setCases(data);
      } catch (err) {
        if (err instanceof Error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('❌ خطا در دریافت لیست پرونده‌ها:', err.message);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-8'>
          🎯 انتخاب یک پرونده برای ورود به جلسه مناظره
        </h1>

        {loading ? (
          <p className='text-center'>⏳ در حال بارگذاری پرونده‌ها...</p>
        ) : (
          <div className='grid gap-6'>
            {cases.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className='bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all'
                onClick={() =>
                  router.push(`/game/hearing-room?caseId=${item.id}`)
                }
              >
                <div className='flex items-center gap-3 mb-4'>
                  <FaBalanceScale className='text-blue-600 text-xl' />
                  <h2 className='text-lg font-semibold text-gray-800 truncate'>
                    {item.title}
                  </h2>
                </div>
                <p className='text-gray-700 text-sm'>{item.summary}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

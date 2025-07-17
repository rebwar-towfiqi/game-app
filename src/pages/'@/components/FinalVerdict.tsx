// FinalVerdict.tsx
import axios from 'axios';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function FinalVerdict() {
  const [votes, setVotes] = useState<number[]>([0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const caseId = searchParams?.get('case');

  useEffect(() => {
    if (!caseId) return;
    axios
      .get(`/api/verdict/${caseId}`)
      .then((res) => {
        const { plaintiff, defendant, neutral } = res.data;
        setVotes([plaintiff, defendant, neutral]);
      })
      .catch(() => setError('❌ خطا در بارگذاری نتیجهٔ رأی‌گیری'))
      .finally(() => setLoading(false));
  }, [caseId]);

  if (loading) return <p>⏳ در حال بارگذاری نتیجه...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  const pieData = {
    labels: ['برائت', 'مجرم', 'ممتنع'],
    datasets: [
      {
        data: votes,
        backgroundColor: ['#10B981', '#EF4444', '#D1D5DB'],
      },
    ],
  };

  const barData = {
    labels: ['برائت', 'مجرم', 'ممتنع'],
    datasets: [
      {
        label: 'تعداد آرا',
        data: votes,
        backgroundColor: ['#10B981', '#EF4444', '#D1D5DB'],
      },
    ],
  };

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-xl font-bold'>نتیجه نهایی</h1>
      <div className='w-full md:w-1/2 mx-auto'>
        <Pie data={pieData} />
      </div>
      <div className='w-full md:w-3/4 mx-auto'>
        <Bar data={barData} />
      </div>
    </div>
  );
}

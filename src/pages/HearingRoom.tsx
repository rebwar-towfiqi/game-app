/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
'use client';

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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

type CaseData = {
  title: string;
  summary: string;
};

type VoteStats = {
  plaintiff: number;
  defendant: number;
  abstain: number;
};

export default function HearingRoom() {
  const router = useRouter();
  const { case: caseId, role, telegram_id, name } = router.query;

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [message, setMessage] = useState('');
  const [argument, setArgument] = useState('');
  const [votes, setVotes] = useState<VoteStats>({
    plaintiff: 0,
    defendant: 0,
    abstain: 0,
  });
  const [selectedVote, setSelectedVote] = useState<
    'plaintiff' | 'defendant' | 'abstain' | null
  >(null);

  useEffect(() => {
    if (caseId) {
      axios
        .get(`/api/case/${caseId}`)
        .then((res) => setCaseData(res.data))
        .catch(() => setMessage('❌ خطا در بارگذاری پرونده.'));

      axios
        .get(`/api/argument/stats/${caseId}`)
        .then((res) => setVotes(res.data))
        .catch(() => console.error('❌ خطا در بارگذاری آمار آرا'));
    }
  }, [caseId]);

const handleSubmitArgument = async () => {
  if (!selectedVote || !argument.trim()) {
    alert('لطفاً هم رأی و هم استدلال را وارد کنید.');
    return;
  }

  try {
    await axios.post('/api/argument', {
      case_id: caseId,
      side: role,
      argument,
      vote: selectedVote, // این فیلد فعلاً در API استفاده نمی‌شود ولی می‌ماند برای آینده
      telegram_id,
      player_name: name,
    });

    alert('✅ رأی و استدلال شما با موفقیت ثبت شد.');
    setArgument('');
    setSelectedVote(null);

    const res = await axios.get(`/api/argument/stats/${caseId}`);
    setVotes(res.data);
  } catch (err) {
    alert('⚠️ خطا در ثبت استدلال. لطفاً دوباره تلاش کنید.');
    console.error(err);
  }
};


  const chartData = {
    labels: ['مجرم', 'برائت', 'ممتنع'],
    datasets: [
      {
        data: [votes.plaintiff, votes.defendant, votes.abstain],
        backgroundColor: ['#ef4444', '#22c55e', '#d1d5db'],
      },
    ],
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>🧾 پرونده انتخابی</h2>
      {message && <p className='text-red-500'>{message}</p>}

      {caseData && (
        <>
          <h3 className='text-xl font-semibold mb-2'>{caseData.title}</h3>
          <p className='mb-2'>{caseData.summary.slice(0, 300)}...</p>
          <a
            href={`https://t.me/RebLCBot?start=${caseId}`}
            className='text-blue-600 underline'
          >
            👁 مشاهدهٔ کامل در ربات رسمی
          </a>

          <div className='mt-6 space-y-4'>
            <h4 className='text-lg font-bold'>✊ رأی شما چیست؟</h4>
            <div className='flex gap-2'>
              <Button
                onClick={() => setSelectedVote('defendant')}
                variant={selectedVote === 'defendant' ? 'default' : 'outline'}
              >
                🟢 برائت
              </Button>
              <Button
                onClick={() => setSelectedVote('plaintiff')}
                variant={selectedVote === 'plaintiff' ? 'default' : 'outline'}
              >
                🔴 مجرم
              </Button>
              <Button
                onClick={() => setSelectedVote('abstain')}
                variant={selectedVote === 'abstain' ? 'default' : 'outline'}
              >
                ⚖ ممتنع
              </Button>
            </div>
          </div>

          <div className='mt-6'>
            <h4 className='text-lg font-bold mb-2'>📊 نمودار آرا</h4>
            <div className='w-48 h-48 mx-auto'>
              <Pie data={chartData} />
            </div>
          </div>

          <div className='mt-6'>
            <h4 className='text-lg font-bold mb-2'>📝 استدلال شما:</h4>
            <Textarea
              placeholder='استدلال خود را وارد کنید...'
              value={argument}
              onChange={(e) => setArgument(e.target.value)}
              className='min-h-[100px]'
            />
            <Button onClick={handleSubmitArgument} className='mt-2'>
              📤 ارسال استدلال
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

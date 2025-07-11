// src/pages/HearingRoom.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function HearingRoom() {
  const [caseData, setCaseData] = useState<any | null>(null);
  const [stats, setStats] = useState({ plaintiff: 0, defender: 0 });
  const [vote, setVote] = useState<string>("");
  const [argument, setArgument] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const caseId = new URLSearchParams(window.location.search).get("caseId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [caseRes, statRes] = await Promise.all([
          axios.get(`/api/case/${caseId}`),
          axios.get(`/api/argument/stats/${caseId}`),
        ]);
        setCaseData(caseRes.data);
        setStats(statRes.data);
      } catch (error) {
        console.error("❌ خطا در دریافت اطلاعات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [caseId]);

  const handleSubmit = async () => {
    if (!vote || !argument) {
      alert("لطفاً رأی و استدلال خود را وارد کنید.");
      return;
    }
    try {
      await axios.post("/api/argument", {
        case_id: caseId,
        vote,
        argument,
      });
      setSubmitted(true);
      const res = await axios.get(`/api/argument/stats/${caseId}`);
      setStats(res.data);
    } catch (err) {
      console.error("❌ خطا در ارسال استدلال:", err);
      alert("⚠️ خطا در ارسال استدلال. دوباره تلاش کنید.");
    }
  };

  if (loading) return <div className="p-6 text-center">⏳ در حال بارگذاری...</div>;
  if (!caseData) return <div className="p-6 text-center">❌ پرونده‌ای یافت نشد.</div>;

  const chartData = {
    labels: ["گناهکار", "بی‌گناه"],
    datasets: [
      {
        data: [stats.plaintiff, stats.defender],
        backgroundColor: ["#dc2626", "#16a34a"],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["شاکی", "متهم"],
    datasets: [
      {
        label: "تعداد آرا",
        data: [stats.plaintiff, stats.defender],
        backgroundColor: ["#f87171", "#4ade80"],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-6 flex flex-col items-center gap-6">
      <div className="bg-black/70 p-6 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-200 mb-2">{caseData.title}</h2>
        <p className="text-md leading-relaxed mb-4">
          {caseData.summary.slice(0, 300)}...
        </p>
        <a
  href={`https://t.me/RebLCBot?start=${caseId}`}
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm font-bold"
  target="_blank"
  rel="noopener noreferrer"
>
  🌐 مشاهده متن کامل پرونده در ربات
</a>

      </div>

      <div className="bg-white text-black p-4 rounded-md w-full max-w-2xl">
        <h3 className="text-center text-lg font-semibold mb-2">📊 نتایج رأی کاربران</h3>
        <Pie data={chartData} />
      </div>

      <div className="bg-white text-black p-4 rounded-md w-full max-w-2xl">
        <h3 className="text-center text-lg font-semibold mb-2">📈 نمودار مقایسه‌ای آرا</h3>
        <Bar data={barData} options={barOptions} />
      </div>

      {!submitted && (
        <div className="bg-black/60 p-6 rounded-lg w-full max-w-3xl">
          <h3 className="text-pink-300 text-lg mb-4 font-bold">🧠 رأی شما و استدلال</h3>
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                vote === "plaintiff" ? "bg-red-700" : "bg-gray-700"
              }`}
              onClick={() => setVote("plaintiff")}
            >
              گناهکار
            </button>
            <button
              className={`px-4 py-2 rounded ${
                vote === "defender" ? "bg-green-700" : "bg-gray-700"
              }`}
              onClick={() => setVote("defender")}
            >
              بی‌گناه
            </button>
          </div>
          <textarea
            value={argument}
            onChange={(e) => setArgument(e.target.value)}
            placeholder="📝 استدلال خود را بنویسید..."
            className="w-full h-32 p-3 rounded bg-white text-black"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded"
          >
            📬 ارسال
          </button>
        </div>
      )}

      {submitted && (
        <div className="text-green-400 font-bold text-lg mt-4">✅ رأی شما ثبت شد</div>
      )}
    </div>
  );
}

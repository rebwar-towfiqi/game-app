type EvidenceViewProps = {
  role: string;
  onNext: () => void;
};

const evidenceData: Record<string, string[]> = {
  judge: [
    "📝 خلاصه کیفرخواست",
    "📄 گزارش ضابطین دادگستری",
    "📚 سوابق کیفری متهم",
  ],
  defense: [
    "📄 اظهارات متهم",
    "📷 مدارک دفاعی (تصاویر، اسناد)",
    "📞 تماس‌های اضطراری شب حادثه",
  ],
  prosecutor: [
    "🔍 گزارش کارآگاه پرونده",
    "🧪 نتیجه آزمایش پزشکی قانونی",
    "🗣️ شهادت شهود",
  ],
};

export default function EvidenceView({ role, onNext }: EvidenceViewProps) {
  const items = evidenceData[role] || [];

  return (
      <div className="space-y-5">
      <h2 className="text-xl font-semibold text-center">📂 مدارک پرونده شما</h2>
      <ul className="list-disc px-6 space-y-1 text-gray-700">
        {items.map((doc, i) => (
          <li key={i}>{doc}</li>
        ))}
      </ul>
      <div className="text-center space-y-2">
        <a
          href="https://t.me/RebLawBot"
          target="_blank"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          مشاهده کامل پرونده در RebLawBot
        </a>
        <br />
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
          onClick={onNext}
        >
          ادامه به مرحله استدلال
        </button>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';

const locales = [
  { code: 'fa', label: 'فارسی' },
  { code: 'en', label: 'English' },
  { code: 'ku', label: 'کوردی' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, asPath } = router;

  return (
    <div className='flex items-center gap-2'>
      {locales.map((lng) => (
        <Link
          key={lng.code}
          href={asPath}
          locale={lng.code}
          className={`rounded px-3 py-1 text-sm font-medium transition
            ${
              locale === lng.code
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
        >
          {lng.label}
        </Link>
      ))}
    </div>
  );
}

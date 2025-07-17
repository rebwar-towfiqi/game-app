import Link from 'next/link';
import { useRouter } from 'next/router';

import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { href: '/', label: 'خانه' },
  { href: '/about', label: 'درباره ما' },
  { href: '/pricing', label: 'پلن‌های اشتراک' },
  { href: '/contact', label: 'تماس با ما' },
];

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className='mb-8 w-full bg-white shadow'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-3 md:flex-row'>
        <div className='text-xl font-extrabold text-blue-700'>
          <Link href='/'>RebLawBot</Link>
        </div>
        <ul className='flex gap-6 text-base font-medium'>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                locale={router.locale}
                className={`transition hover:text-blue-700 ${
                  router.pathname === item.href
                    ? 'text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* دکمه تغییر زبان */}
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

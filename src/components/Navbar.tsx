import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { href: '/', label: 'خانه' },
  { href: '/about', label: 'درباره ما' },
  { href: '/pricing', label: 'پلن‌های اشتراک' },
  { href: '/contact', label: 'تماس با ما' },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='mb-8 w-full bg-white shadow'>
      <div className='container mx-auto flex items-center justify-between px-4 py-3'>
        {/* Logo & Title */}
        <Link
          href='/'
          className='flex items-center gap-2 text-xl font-extrabold text-blue-700'
        >
          <Image
            src='/logo.png'
            alt='RebLawBot Logo'
            width={36}
            height={36}
            className='rounded-full'
          />
          <span>RebLawBot</span>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden items-center gap-8 md:flex'>
          <ul className='flex gap-6 text-base font-medium'>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
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
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className='flex h-10 w-10 flex-col items-center justify-center md:hidden'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='منو'
        >
          <span
            className={`mb-1 block h-0.5 w-6 rounded bg-blue-700 transition-all ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`mb-1 block h-0.5 w-6 rounded bg-blue-700 transition-all ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded bg-blue-700 transition-all ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='flex flex-col gap-4 border-b bg-white px-8 pb-4 shadow md:hidden'>
          <ul className='flex flex-col gap-4'>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded py-2 text-base font-medium ${
                    router.pathname === item.href
                      ? 'text-blue-700'
                      : 'text-gray-700'
                  } transition hover:text-blue-700`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Language Switcher for mobile */}
          <div className='mt-4'>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}

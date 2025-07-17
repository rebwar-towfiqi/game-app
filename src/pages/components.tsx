import { useTheme } from 'next-themes';
import * as React from 'react';

import Button from '@/components/buttons/Button';

export default function ComponentsPage() {
  const { theme, setTheme } = useTheme();
  const mode = theme === 'dark' ? 'dark' : 'light';

  const toggleMode = () => {
    setTheme(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <main>
      <section className='bg-white py-8 text-black dark:bg-gray-900 dark:text-white'>
        <div className='layout'>
          <h1 className='text-4xl font-bold'>🎨 کامپوننت‌های سفارشی</h1>
          <p className='mt-2 text-lg'>
            در این صفحه می‌توانید تمام دکمه‌ها و اجزای طراحی‌شده را مشاهده و آزمایش کنید.
          </p>

          <div className='mt-8 flex flex-wrap gap-2'>
            <Button
              onClick={toggleMode}
              variant={mode === 'dark' ? 'light' : 'dark'} href=""            >
              تغییر تم به {mode === 'dark' ? 'روشن' : 'تاریک'}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

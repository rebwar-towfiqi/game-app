import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>درباره ما | RebLawBot</title>
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gray-50'>
        <div className='mt-20 max-w-lg rounded-2xl bg-white p-8 text-center shadow'>
          <h1 className='mb-4 text-2xl font-bold text-blue-700'>
            درباره RebLawBot
          </h1>
          <p className='mb-2 text-gray-700'>
            RebLawBot یک پروژه حقوقی مبتنی بر هوش مصنوعی و بلاکچین است که با هدف
            دسترسی آسان و عادلانه به دانش حقوقی برای همه راه‌اندازی شده است.
          </p>
          <p className='text-sm text-gray-500'>
            توسعه و پشتیبانی توسط ریبوار توفیقی – وکیل دادگستری
          </p>
        </div>
      </main>
    </>
  );
}
